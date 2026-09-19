import { queryDb, memoryStore } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const orders = await queryDb('SELECT * FROM orders');
    const products = await queryDb('SELECT * FROM products');
    const users = await queryDb('SELECT * FROM users WHERE role = ?', ['customer']);

    const allOrders = (orders && orders.length > 0) ? orders : memoryStore.orders;
    const allProducts = (products && products.length > 0) ? products : memoryStore.products;
    const allCustomers = (users && users.length > 0) ? users : memoryStore.users.filter(u => u.role === 'customer');

    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((sum, o) => sum + (Number(o.total_amount || o.totalAmount) || 0), 0);
    const pendingOrders = allOrders.filter(o => o.status === 'pending').length;
    const deliveredOrders = allOrders.filter(o => o.status === 'delivered').length;

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
        productCount: allProducts.length,
        customerCount: allCustomers.length
      },
      recentOrders: allOrders.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve admin stats.' });
  }
};
