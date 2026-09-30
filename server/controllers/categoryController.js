import { queryDb } from '../config/db.js';
import { CATEGORIES } from '../../src/data/products.js';
import { syncServerCatalog, inMemoryCatalog } from '../index.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await queryDb('SELECT * FROM categories');
    if (!categories || categories.length === 0) {
      return res.json({ success: true, categories: CATEGORIES });
    }
    res.json({ success: true, count: categories.length, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories.' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await queryDb('SELECT * FROM categories WHERE id = ?', [id]);
    const category = categories && categories.length > 0 ? categories[0] : CATEGORIES.find(c => c.id === id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving category.' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, image, description, iconLucideName } = req.body;
    const id = req.body.id || name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');

    await queryDb(
      'INSERT INTO categories (id, name, image, description) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = ?, image = ?, description = ?',
      [id, name, image, description || '', name, image, description || '']
    );

    const newCategory = { id, name, image, description: description || '', iconLucideName: iconLucideName || 'Sparkles', icon: '🌰' };
    
    // Refresh server catalog memory
    const curCats = inMemoryCatalog.categories || CATEGORIES;
    const existingIdx = curCats.findIndex(c => c.id === id);
    let updatedCats = [];
    if (existingIdx >= 0) {
      updatedCats = curCats.map((c, i) => i === existingIdx ? { ...c, ...newCategory } : c);
    } else {
      updatedCats = [...curCats, newCategory];
    }
    await syncServerCatalog(inMemoryCatalog.products, updatedCats);

    res.status(201).json({ success: true, message: 'Category created successfully!', category: newCategory });
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create category.' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, iconLucideName } = req.body;

    await queryDb(
      'UPDATE categories SET name = ?, image = ?, description = ? WHERE id = ?',
      [name, image, description, id]
    );

    const curCats = inMemoryCatalog.categories || CATEGORIES;
    const updatedCats = curCats.map(c => c.id === id ? { ...c, ...(name && { name }), ...(image && { image }), ...(description && { description }), ...(iconLucideName && { iconLucideName }) } : c);
    await syncServerCatalog(inMemoryCatalog.products, updatedCats);

    res.json({ success: true, message: 'Category updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category.' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await queryDb('DELETE FROM categories WHERE id = ?', [id]);

    const curCats = inMemoryCatalog.categories || CATEGORIES;
    const updatedCats = curCats.filter(c => c.id !== id);
    await syncServerCatalog(inMemoryCatalog.products, updatedCats);

    res.json({ success: true, message: 'Category deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category.' });
  }
};
