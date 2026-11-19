import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/localStorageService';
import { USER_ROLES } from '../services/storageKeys';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = storageService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = (user) => {
    storageService.setCurrentUser(user);
    setCurrentUser(user);
  };

  const logout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
  };

  // Quick switch role utility (ideal for testing between Donor and NGO views)
  const switchUser = (userId) => {
    const user = storageService.getUserById(userId);
    if (user) {
      login(user);
    }
  };

  const register = (userData) => {
    const newUser = storageService.registerUser(userData);
    setCurrentUser(newUser);
    return newUser;
  };

  const isDonor = currentUser?.role === USER_ROLES.DONOR;
  const isNGO = currentUser?.role === USER_ROLES.NGO;

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
    switchUser,
    isDonor,
    isNGO,
    availableUsers: storageService.getUsers()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
