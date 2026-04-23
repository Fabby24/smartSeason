import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token is still valid
          const response = await api.get('/auth/me').catch(() => null);
          if (!response) {
            // Token invalid, logout
            logout(true);
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          logout(true);
        }
      }
      setLoading(false);
      setAuthInitialized(true);
    };
    
    initializeAuth();
  }, []);

  // Listen for storage events (when localStorage changes in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        // User logged out in another tab
        logout(true);
      }
      if (e.key === 'user' && e.newValue) {
        // User changed in another tab
        const newUser = JSON.parse(e.newValue);
        setUser(newUser);
        window.location.reload(); // Force reload to refresh all components
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('loginTimestamp', Date.now().toString());
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      toast.success(`Welcome back, ${user.full_name}!`);
      
      // Force a hard navigation to ensure clean component mount
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = (silent = false) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('loginTimestamp');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    
    if (!silent) {
      toast.success('Logged out successfully');
    }
    
    // Force a hard navigation to clear all component states
    window.location.href = '/login';
  };

  // Function to manually refresh user data
  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me');
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('userRole', updatedUser.role);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error refreshing user:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      authInitialized,
      refreshUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};