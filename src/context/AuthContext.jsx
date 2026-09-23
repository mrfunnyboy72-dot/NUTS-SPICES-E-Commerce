import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, getCurrentUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nuts_spices_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('nuts_spices_auth_token') || null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('nuts_spices_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed?.role === 'admin';
      }
    } catch {}
    return false;
  });

  const loginUser = async (credentials) => {
    const res = await loginApi(credentials);
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      setIsAdmin(res.user?.role === 'admin');
      localStorage.setItem('nuts_spices_auth_token', res.token);
      localStorage.setItem('nuts_spices_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const registerUser = async (userData) => {
    const res = await registerApi(userData);
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      setIsAdmin(res.user?.role === 'admin');
      localStorage.setItem('nuts_spices_auth_token', res.token);
      localStorage.setItem('nuts_spices_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('nuts_spices_auth_token');
    localStorage.removeItem('nuts_spices_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
