import { queryDb, memoryStore } from '../config/db.js';

const STORE_WHATSAPP_NUMBER = process.env.STORE_WHATSAPP_NUMBER || '919876543210';

export const createOrder = async (req, res) => {
  try {
    const { customer, items, notes } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.address || !customer.city || !customer.pincode) {
      return res.status(400).json({ success: false, message: 'Missing required customer details (name, phone, address, city, pincode).' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty. Add products before placing order.' });
    }

    const orderNumericId = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NS-${orderNumericId}`;

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    const deliveryCharge = subtotal > 1000 ? 0 : 50;
    const totalAmount = subtotal + deliveryCharge;
    const itemsJson = JSON.stringify(items);

    await queryDb(
      `INSERT INTO orders 
      (id, order_id, customer_name, phone, email, address, city, state, pincode, subtotal, delivery_charge, total_amount, status, items_json, notes) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        orderId,
        customer.name,
        customer.phone,
        customer.email || '',
        customer.address,
        customer.city,
        customer.state || 'Tamil Nadu',
        customer.pincode,
        subtotal,
        deliveryCharge,
        totalAmount,
        'pending',
        itemsJson,
        notes || ''
      ]
    );

    const orderRecord = {
      id: orderId,
      orderId,
      customerName: customer.name,
      phone: customer.phone,
      email: customer.email || '',
      address: customer.address,
      city: customer.city,
      state: customer.state || 'Tamil Nadu',
      pincode: customer.pincode,
      subtotal,
      deliveryCharge,
      totalAmount,
      status: 'pending',
      items,
      notes: notes || '',
      createdAt: new Date()
    };

    memoryStore.orders.unshift(orderRecord);

    // Format WhatsApp message
    let msg = `🛒 *NUTS & SPICES - NEW ORDER*\n`;
    msg += `🆔 *Order ID:* #${orderId}\n`;
    msg += `------------------------------------\n`;
    msg += `👤 *Customer:* ${customer.name}\n`;
    msg += `📞 *Phone:* ${customer.phone}\n`;
    msg += `📍 *Address:* ${customer.address}, ${customer.city} - ${customer.pincode}\n`;
    if (notes) {
      msg += `📝 *Notes:* ${notes}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `📦 *Items Ordered:*\n`;

    items.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      msg += `${index + 1}. ${item.name} (${item.weight}) x ${item.quantity} = ₹${lineTotal}\n`;
    });

    msg += `------------------------------------\n`;
    msg += `💰 *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    msg += `🚚 *Delivery:* ₹${deliveryCharge}\n`;
    msg += `💳 *Total Amount:* ₹${totalAmount.toLocaleString('en-IN')}\n`;
    msg += `------------------------------------\n`;
    msg += `Thank you! Please confirm order & delivery timeline.`;

    const whatsAppUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    res.status(201).json({
      success: true,
      message: 'Order saved in database successfully!',
      orderId,
      whatsAppUrl,
      order: orderRecord
    });
  } catch (error) {
    console.error('Order Creation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to save order in database.' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await queryDb('SELECT * FROM orders ORDER BY created_at DESC');
    const result = (orders && orders.length > 0) ? orders : memoryStore.orders;
    
    res.json({
      success: true,
      count: result.length,
      orders: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await queryDb('SELECT * FROM orders WHERE id = ? OR order_id = ?', [id, id]);
    
    let order = orders && orders.length > 0 ? orders[0] : memoryStore.orders.find(o => o.id === id || o.orderId === id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching order.' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Allowed: ' + allowedStatuses.join(', ') });
    }

    await queryDb('UPDATE orders SET status = ? WHERE id = ? OR order_id = ?', [status, id, id]);

    const memOrder = memoryStore.orders.find(o => o.id === id || o.orderId === id);
    if (memOrder) memOrder.status = status;

    res.json({
      success: true,
      message: `Order status updated to ${status}`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status.' });
  }
};
