import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/localStorageService';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const refreshNotifications = useCallback(() => {
    if (currentUser?.id) {
      setNotifications(storageService.getNotifications(currentUser.id));
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  const markAsRead = (id) => {
    storageService.markNotificationAsRead(id);
    refreshNotifications();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    refreshNotifications,
    markAsRead
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
