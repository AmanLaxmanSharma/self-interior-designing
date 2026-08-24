import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('karoli_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await apiClient.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.data);
          }
        } catch (err) {
          console.warn('Token validation failed or offline mode');
          // Check saved local user
          const saved = localStorage.getItem('karoli_user');
          if (saved) {
            setUser(JSON.parse(saved));
          }
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('karoli_token', token);
        localStorage.setItem('karoli_user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        return { success: true, user };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Login failed. Check your credentials.'
      };
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const res = await apiClient.post('/auth/register', { name, email, phone, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('karoli_token', token);
        localStorage.setItem('karoli_user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        return { success: true, user };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Registration failed.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('karoli_token');
    localStorage.removeItem('karoli_user');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'ADMIN'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
