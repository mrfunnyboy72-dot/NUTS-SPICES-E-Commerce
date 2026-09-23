import { apiFetch } from './index.js';

export const getProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/products${query ? `?${query}` : ''}`);
};

export const getProductById = (id) => apiFetch(`/products/${id}`);

export const createProduct = (productData) => apiFetch('/products', {
  method: 'POST',
  body: JSON.stringify(productData)
});

export const updateProduct = (id, productData) => apiFetch(`/products/${id}`, {
  method: 'PUT',
  body: JSON.stringify(productData)
});

export const deleteProduct = (id) => apiFetch(`/products/${id}`, {
  method: 'DELETE'
});
