import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool = null;

export const getPool = () => {
  if (!pool) {
    const config = {
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nuts_spices_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };

    if (process.env.DB_SSL === 'true') {
      config.ssl = { rejectUnauthorized: false };
    }

    pool = mysql.createPool(config);
  }
  return pool;
};

// Fallback memory store when MySQL/TiDB server is not running locally
const memoryStore = {
  users: [],
  categories: [],
  products: [],
  orders: [],
  reviews: [],
  coupons: [],
  settings: {
    whatsapp_number: process.env.STORE_WHATSAPP_NUMBER || '919876543210',
    delivery_charge: '50'
  }
};

export const queryDb = async (sql, params = []) => {
  try {
    const dbPool = getPool();
    const [rows] = await dbPool.execute(sql, params);
    return rows;
  } catch (error) {
    console.warn('⚠️ TiDB/MySQL database connection note:', error.message);
    console.log('🔄 Executing in-memory fallback query processor...');
    return processMemoryQuery(sql, params);
  };
};

function processMemoryQuery(sql, params) {
  const queryLower = sql.trim().toLowerCase();

  // Handle SELECT Queries
  if (queryLower.startsWith('select')) {
    if (queryLower.includes('from users')) {
      if (params.length > 0) {
        return memoryStore.users.filter(u => 
          u.email === params[0] || u.phone === params[0] || u.id === params[0]
        );
      }
      return memoryStore.users;
    }

    if (queryLower.includes('from categories')) {
      return memoryStore.categories;
    }

    if (queryLower.includes('from products')) {
      if (queryLower.includes('where category') && params.length > 0) {
        return memoryStore.products.filter(p => p.category === params[0]);
      }
      if (queryLower.includes('where id') && params.length > 0) {
        return memoryStore.products.filter(p => p.id === params[0]);
      }
      return memoryStore.products;
    }

    if (queryLower.includes('from orders')) {
      if (queryLower.includes('where id') && params.length > 0) {
        return memoryStore.orders.filter(o => o.id === params[0] || o.orderId === params[0]);
      }
      return memoryStore.orders;
    }

    if (queryLower.includes('from settings')) {
      return Object.entries(memoryStore.settings).map(([key, value]) => ({ key, value }));
    }
  }

  // Handle INSERT Queries
  if (queryLower.startsWith('insert into')) {
    if (queryLower.includes('users')) {
      const newUser = { id: `usr_${Date.now()}`, name: params[0], phone: params[1], email: params[2], password: params[3], role: params[4] || 'customer', createdAt: new Date() };
      memoryStore.users.push(newUser);
      return { insertId: newUser.id, affectedRows: 1 };
    }
    if (queryLower.includes('orders')) {
      const newOrder = {
        id: params[0],
        orderId: params[0],
        customerName: params[1],
        phone: params[2],
        email: params[3],
        address: params[4],
        city: params[5],
        state: params[6],
        pincode: params[7],
        subtotal: params[8],
        deliveryCharge: params[9],
        totalAmount: params[10],
        status: params[11] || 'pending',
        itemsJson: params[12],
        notes: params[13],
        createdAt: new Date()
      };
      memoryStore.orders.unshift(newOrder);
      return { insertId: newOrder.id, affectedRows: 1 };
    }
  }

  // Handle UPDATE Queries
  if (queryLower.startsWith('update')) {
    if (queryLower.includes('orders') && queryLower.includes('set status')) {
      const [status, orderId] = params;
      const order = memoryStore.orders.find(o => o.id === orderId || o.orderId === orderId);
      if (order) order.status = status;
      return { affectedRows: order ? 1 : 0 };
    }
  }

  return [];
}

export { memoryStore };
