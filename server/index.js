import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { initializeDatabase } from './scripts/initDb.js';
import { queryDb } from './config/db.js';
import { CATEGORIES, PRODUCTS } from '../src/data/products.js';

dotenv.config();

// Initialize TiDB database schema & seeds on server startup
initializeDatabase().catch(err => console.warn('Database initialization note:', err.message));

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    store: 'HAJI NUTS & SPICES Gourmet Backend',
    database: 'TiDB / MySQL Compatible',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    store: 'HAJI NUTS & SPICES Gourmet Backend API',
    timestamp: new Date().toISOString()
  });
});

// In-Memory Master Catalog cache for fast real-time Edge/Vercel Sync
export let inMemoryCatalog = {
  products: null,
  categories: null,
  updatedAt: null
};

export const syncServerCatalog = async (products, categories) => {
  if (Array.isArray(products)) inMemoryCatalog.products = products;
  if (Array.isArray(categories)) inMemoryCatalog.categories = categories;
  inMemoryCatalog.updatedAt = new Date().toISOString();

  try {
    const catalogJson = JSON.stringify({
      products: inMemoryCatalog.products || PRODUCTS,
      categories: inMemoryCatalog.categories || CATEGORIES,
      updatedAt: inMemoryCatalog.updatedAt
    });
    await queryDb(
      "INSERT INTO settings (setting_key, setting_value) VALUES ('master_catalog_json', ?) ON DUPLICATE KEY UPDATE setting_value = ?",
      [catalogJson, catalogJson]
    );

    // Save to /tmp filesystem for Vercel Lambda container reuse
    try {
      const fs = await import('fs');
      fs.writeFileSync('/tmp/master_catalog.json', catalogJson);
    } catch {}
  } catch (err) {
    console.warn('DB catalog sync note:', err.message);
  }
};

app.get('/api/catalog', async (req, res) => {
  let products = inMemoryCatalog.products || PRODUCTS;
  let categories = inMemoryCatalog.categories || CATEGORIES;
  let updatedAt = inMemoryCatalog.updatedAt || new Date().toISOString();

  try {
    const rows = await queryDb("SELECT setting_value FROM settings WHERE setting_key = 'master_catalog_json'");
    if (rows && rows.length > 0 && rows[0].setting_value) {
      const parsed = JSON.parse(rows[0].setting_value);
      if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.categories)) {
        products = parsed.products;
        categories = parsed.categories;
        updatedAt = parsed.updatedAt || updatedAt;
      }
    } else {
      // Check /tmp file fallback on Vercel
      try {
        const fs = await import('fs');
        if (fs.existsSync('/tmp/master_catalog.json')) {
          const fileData = JSON.parse(fs.readFileSync('/tmp/master_catalog.json', 'utf8'));
          if (fileData && Array.isArray(fileData.products)) {
            products = fileData.products;
            categories = fileData.categories || categories;
            updatedAt = fileData.updatedAt || updatedAt;
          }
        }
      } catch {}
    }

    // Query TiDB categories table directly and merge all DB categories
    const dbCats = await queryDb("SELECT * FROM categories");
    if (dbCats && Array.isArray(dbCats) && dbCats.length > 0) {
      const categoryMap = new Map();
      // Put default/parsed categories in map first
      categories.forEach(c => categoryMap.set(c.id, c));
      // Override/Add from DB categories table while strictly preserving user's original images
      dbCats.forEach(dbC => {
        const existing = categoryMap.get(dbC.id);
        const resolvedImage = (dbC.image && !dbC.image.includes('photo-1596040033229'))
          ? dbC.image
          : (existing?.image || dbC.image);

        categoryMap.set(dbC.id, {
          id: dbC.id,
          name: dbC.name,
          image: resolvedImage,
          description: dbC.description || existing?.description || '',
          iconLucideName: dbC.iconLucideName || existing?.iconLucideName || 'Sparkles',
          icon: dbC.icon || existing?.icon || '🌰'
        });
      });
      categories = Array.from(categoryMap.values());
    }

    // Query TiDB products table directly and merge all DB products
    const dbProds = await queryDb("SELECT * FROM products");
    if (dbProds && Array.isArray(dbProds) && dbProds.length > 0) {
      const productMap = new Map();
      products.forEach(p => productMap.set(p.id, p));
      dbProds.forEach(dbP => {
        let weights = [];
        if (dbP.weights_json) {
          try { weights = typeof dbP.weights_json === 'string' ? JSON.parse(dbP.weights_json) : dbP.weights_json; } catch {}
        }
        if (!Array.isArray(weights) || weights.length === 0) {
          const baseP = Number(dbP.price) || 290;
          weights = [{ label: 'Standard', price: baseP, originalPrice: Math.round(baseP * 1.2) }];
        }
        const basePrice = weights[0] ? weights[0].price : (Number(dbP.price) || 290);
        const status = dbP.status || (dbP.active !== false ? 'Active' : 'Inactive');

        const existing = productMap.get(dbP.id);
        const resolvedImage = (dbP.image && !dbP.image.includes('photo-1508061252966'))
          ? dbP.image
          : (existing?.image || dbP.image);

        productMap.set(dbP.id, {
          id: dbP.id,
          name: dbP.name,
          category: dbP.category_id || dbP.category || existing?.category || 'nuts-dry-fruits',
          categoryName: dbP.category_name || dbP.categoryName || existing?.categoryName || 'General',
          badge: dbP.badge || existing?.badge || 'Fresh',
          image: resolvedImage,
          price: basePrice,
          weights: weights,
          description: dbP.description || existing?.description || '',
          origin: dbP.origin || existing?.origin || 'India',
          shelfLife: dbP.shelf_life || dbP.shelfLife || existing?.shelfLife || '6 Months',
          stock: Number(dbP.stock) || existing?.stock || 100,
          status: status,
          active: status === 'Active'
        });
      });
      products = Array.from(productMap.values());
    }
  } catch (err) {
    console.warn('DB catalog fetch note:', err.message);
  }

  inMemoryCatalog.products = products;
  inMemoryCatalog.categories = categories;
  inMemoryCatalog.updatedAt = updatedAt;

  res.json({
    success: true,
    products,
    categories,
    updatedAt
  });
});

app.post('/api/catalog', async (req, res) => {
  const { products, categories } = req.body || {};
  if (Array.isArray(products) && Array.isArray(categories)) {
    await syncServerCatalog(products, categories);
    return res.json({ success: true, message: 'Catalog updated across all devices successfully' });
  }
  return res.status(400).json({ success: false, message: 'Invalid payload' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Only listen on port if run directly as the main script (never when imported by api/index.js or Vercel)
const isServerDirectRun = Boolean(process.argv[1] && (process.argv[1].endsWith('server\\index.js') || process.argv[1].endsWith('server/index.js')));
if (isServerDirectRun) {
  app.listen(PORT, async () => {
    console.log(`\n🚀 HAJI NUTS & SPICES Backend running on http://localhost:${PORT}`);
    console.log(`🔌 Database Engine: TiDB / MySQL Compatible`);
    await initializeDatabase();
  });
}

export default app;
