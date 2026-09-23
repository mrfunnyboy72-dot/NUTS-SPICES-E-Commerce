import { apiFetch } from './index.js';

export const getCategories = () => apiFetch('/categories');

export const getCategoryById = (id) => apiFetch(`/categories/${id}`);

export const createCategory = (categoryData) => apiFetch('/categories', {
  method: 'POST',
  body: JSON.stringify(categoryData)
});

export const updateCategory = (id, categoryData) => apiFetch(`/categories/${id}`, {
  method: 'PUT',
  body: JSON.stringify(categoryData)
});

export const deleteCategory = (id) => apiFetch(`/categories/${id}`, {
  method: 'DELETE'
});
