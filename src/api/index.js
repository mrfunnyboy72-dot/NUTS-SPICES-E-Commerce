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

// Export sub-module API functions
export const fetchAdminStatsApi = () => apiFetch('/admin/dashboard/stats');
export * from './authApi.js';
export * from './productApi.js';
export * from './categoryApi.js';
export * from './orderApi.js';
