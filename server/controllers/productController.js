import { queryDb, memoryStore } from '../config/db.js';
import { CATEGORIES, PRODUCTS } from '../../src/data/products.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    let products = await queryDb('SELECT * FROM products');

    if (!products || products.length === 0) {
      products = memoryStore.products.length > 0 ? memoryStore.products : PRODUCTS;
    }

    let filtered = products;

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category || p.category_id === category);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      products: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbProds = await queryDb('SELECT * FROM products WHERE id = ?', [id]);
    
    let product = dbProds && dbProds.length > 0 ? dbProds[0] : null;
    if (!product) {
      product = PRODUCTS.find(p => p.id === id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving product.' });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    let categories = await queryDb('SELECT * FROM categories');
    if (!categories || categories.length === 0) {
      categories = CATEGORIES;
    }
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories.' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, categoryName, badge, price, image, description, origin, shelfLife, stock } = req.body;
    
    const newId = `prod_${Date.now()}`;
    const weightsJson = JSON.stringify([{ label: 'Standard', price: Number(price) || 290 }]);

    await queryDb(
      `INSERT INTO products (id, name, category_id, category_name, badge, image, weights_json, description, origin, shelf_life, stock)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [newId, name, category, categoryName || category, badge || 'Fresh', image, weightsJson, description, origin || 'India', shelfLife || '6 Months', Number(stock) || 100]
    );

    const createdProduct = {
      id: newId,
      name,
      category,
      categoryName: categoryName || category,
      badge: badge || 'Fresh',
      image,
      weights: [{ label: 'Standard', price: Number(price) || 290 }],
      description,
      origin: origin || 'India',
      shelfLife: shelfLife || '6 Months',
      stock: Number(stock) || 100
    };

    memoryStore.products.unshift(createdProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product: createdProduct
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create product.' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, badge } = req.body;

    await queryDb('UPDATE products SET name = ?, stock = ?, badge = ? WHERE id = ?', [name, stock, badge, id]);

    const item = memoryStore.products.find(p => p.id === id);
    if (item) {
      if (name) item.name = name;
      if (stock !== undefined) item.stock = stock;
      if (badge) item.badge = badge;
    }

    res.json({
      success: true,
      message: 'Product updated successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await queryDb('DELETE FROM products WHERE id = ?', [id]);
    memoryStore.products = memoryStore.products.filter(p => p.id !== id);

    res.json({
      success: true,
      message: 'Product deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
};
