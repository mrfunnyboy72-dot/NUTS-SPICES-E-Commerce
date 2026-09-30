import { queryDb, memoryStore } from '../config/db.js';
import { CATEGORIES, PRODUCTS } from '../../src/data/products.js';
import { syncServerCatalog, inMemoryCatalog } from '../index.js';

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
    const { id, name, category, categoryName, badge, price, image, weights, description, origin, shelfLife, stock, status } = req.body;
    
    const newId = id || req.body.id || `prod_${Date.now()}`;
    const parsedWeights = Array.isArray(weights) && weights.length > 0
      ? weights
      : [{ label: 'Standard', price: Number(price) || 290, originalPrice: Math.round((Number(price) || 290) * 1.2) }];
    const weightsJson = JSON.stringify(parsedWeights);
    const prodStatus = status || 'Active';

    await queryDb(
      `INSERT INTO products (id, name, category_id, category_name, badge, image, weights_json, description, origin, shelf_life, stock, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = ?, category_id = ?, category_name = ?, badge = ?, image = ?, weights_json = ?, description = ?, origin = ?, shelf_life = ?, stock = ?, status = ?`,
      [
        newId, name, category, categoryName || category, badge || 'Fresh', image, weightsJson, description || '', origin || 'India', shelfLife || '6 Months', Number(stock) || 100, prodStatus,
        name, category, categoryName || category, badge || 'Fresh', image, weightsJson, description || '', origin || 'India', shelfLife || '6 Months', Number(stock) || 100, prodStatus
      ]
    );

    const createdProduct = {
      id: newId,
      name,
      category,
      categoryName: categoryName || category,
      badge: badge || 'Fresh',
      image,
      price: parsedWeights[0].price,
      weights: parsedWeights,
      description: description || '',
      origin: origin || 'India',
      shelfLife: shelfLife || '6 Months',
      stock: Number(stock) || 100,
      status: prodStatus,
      active: prodStatus === 'Active'
    };

    const curProds = inMemoryCatalog.products || PRODUCTS;
    const existingIdx = curProds.findIndex(p => p.id === newId);
    let updatedProds = [];
    if (existingIdx >= 0) {
      updatedProds = curProds.map((p, i) => i === existingIdx ? { ...p, ...createdProduct } : p);
    } else {
      updatedProds = [createdProduct, ...curProds];
    }
    await syncServerCatalog(updatedProds, inMemoryCatalog.categories);

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
    const { name, category, categoryName, badge, price, image, description, origin, shelfLife, stock, status, active, weights } = req.body;

    const weightsJson = weights ? JSON.stringify(weights) : (price ? JSON.stringify([{ label: 'Standard', price: Number(price) }]) : null);
    const activeVal = status ? status : ((active === true || active === 'true' || active === 'Active') ? 'Active' : 'Inactive');

    await queryDb(
      `UPDATE products SET 
        name = COALESCE(?, name), 
        category_id = COALESCE(?, category_id), 
        category_name = COALESCE(?, category_name), 
        badge = COALESCE(?, badge), 
        image = COALESCE(?, image), 
        weights_json = COALESCE(?, weights_json), 
        description = COALESCE(?, description), 
        origin = COALESCE(?, origin), 
        shelf_life = COALESCE(?, shelf_life), 
        stock = COALESCE(?, stock), 
        status = COALESCE(?, status) 
       WHERE id = ?`,
      [name, category, categoryName, badge, image, weightsJson, description, origin, shelfLife, stock, activeVal, id]
    );

    const curProds = inMemoryCatalog.products || PRODUCTS;
    const updatedProds = curProds.map(p => {
      if (p.id === id) {
        const newStatus = activeVal || p.status;
        return {
          ...p,
          ...(name && { name }),
          ...(category && { category }),
          ...(categoryName && { categoryName }),
          ...(badge && { badge }),
          ...(image && { image }),
          ...(description && { description }),
          ...(origin && { origin }),
          ...(shelfLife && { shelfLife }),
          ...(stock !== undefined && { stock: Number(stock) }),
          ...(weights && { weights, price: weights[0] ? weights[0].price : p.price }),
          status: newStatus,
          active: newStatus === 'Active'
        };
      }
      return p;
    });
    await syncServerCatalog(updatedProds, inMemoryCatalog.categories);

    res.json({
      success: true,
      message: 'Product updated successfully!'
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product in database.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await queryDb('DELETE FROM products WHERE id = ?', [id]);
    
    const curProds = inMemoryCatalog.products || PRODUCTS;
    const updatedProds = curProds.filter(p => p.id !== id);
    await syncServerCatalog(updatedProds, inMemoryCatalog.categories);

    res.json({
      success: true,
      message: 'Product deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
};
