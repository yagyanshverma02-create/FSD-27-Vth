import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <p>Loading session...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // If user has the other role, route them to their corresponding dashboard
    return <Navigate to={currentUser.role === 'donor' ? '/donor/dashboard' : '/ngo/dashboard'} replace />;
  }

  return children;
};
