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
let inMemoryCatalog = {
  products: null,
  categories: null,
  updatedAt: null
};

app.get('/api/catalog', async (req, res) => {
  try {
    const rows = await queryDb("SELECT setting_value FROM settings WHERE setting_key = 'master_catalog_json'");
    if (rows && rows.length > 0 && rows[0].setting_value) {
      const parsed = JSON.parse(rows[0].setting_value);
      if (parsed && Array.isArray(parsed.products) && Array.isArray(parsed.categories)) {
        inMemoryCatalog.products = parsed.products;
        inMemoryCatalog.categories = parsed.categories;
        inMemoryCatalog.updatedAt = parsed.updatedAt || new Date().toISOString();
        return res.json({
          success: true,
          products: parsed.products,
          categories: parsed.categories,
          updatedAt: inMemoryCatalog.updatedAt
        });
      }
    }
  } catch (err) {
    console.warn('DB catalog fetch note:', err.message);
  }

  res.json({
    success: true,
    products: inMemoryCatalog.products || PRODUCTS,
    categories: inMemoryCatalog.categories || CATEGORIES,
    updatedAt: inMemoryCatalog.updatedAt || new Date().toISOString()
  });
});

app.post('/api/catalog', async (req, res) => {
  const { products, categories } = req.body || {};
  if (Array.isArray(products) && Array.isArray(categories)) {
    const updatedAt = new Date().toISOString();
    inMemoryCatalog.products = products;
    inMemoryCatalog.categories = categories;
    inMemoryCatalog.updatedAt = updatedAt;

    try {
      const catalogJson = JSON.stringify({ products, categories, updatedAt });
      await queryDb(
        "INSERT INTO settings (setting_key, setting_value) VALUES ('master_catalog_json', ?) ON DUPLICATE KEY UPDATE setting_value = ?",
        [catalogJson, catalogJson]
      );
    } catch (err) {
      console.warn('DB catalog save note:', err.message);
    }

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

// Only listen on port if run directly locally
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`\n🚀 HAJI NUTS & SPICES Backend running on http://localhost:${PORT}`);
    console.log(`🔌 Database Engine: TiDB / MySQL Compatible`);
    await initializeDatabase();
  });
}

export default app;
