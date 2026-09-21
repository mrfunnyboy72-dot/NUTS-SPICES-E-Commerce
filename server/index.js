import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { initializeDatabase } from './scripts/initDb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    store: 'NUTS & SPICES Gourmet Backend',
    database: 'TiDB / MySQL Compatible',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start Express Server
app.listen(PORT, async () => {
  console.log(`\n🚀 NUTS & SPICES Backend running on http://localhost:${PORT}`);
  console.log(`🔌 Database Engine: TiDB / MySQL Compatible`);
  
  // Initialize DB tables & Seed Data
  await initializeDatabase();
});
