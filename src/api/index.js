const API_BASE_URL = (typeof window !== 'undefined' && window.location && window.location.origin)
  ? `${window.location.origin}/api`
  : 'http://localhost:5000/api';

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('nuts_spices_auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`API Connection note for ${endpoint}:`, error.message);
    return { success: false, message: 'Backend service offline or unreachable.' };
  }
};

// API Functions
export const registerUserApi = (userData) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
export const loginUserApi = (credentials) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
export const createOrderApi = (orderPayload) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(orderPayload) });
export const fetchOrdersApi = () => apiFetch('/orders');
export const updateOrderStatusApi = (orderId, status) => apiFetch(`/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
export const fetchAdminStatsApi = () => apiFetch('/admin/dashboard/stats');
export const createProductApi = (prodData) => apiFetch('/products', { method: 'POST', body: JSON.stringify(prodData) });
export const updateProductApi = (prodId, prodData) => apiFetch(`/products/${prodId}`, { method: 'PUT', body: JSON.stringify(prodData) });
export const deleteProductApi = (prodId) => apiFetch(`/products/${prodId}`, { method: 'DELETE' });
