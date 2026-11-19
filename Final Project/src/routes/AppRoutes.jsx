import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Home } from '../pages/Home';
import { Marketplace } from '../pages/Marketplace';
import { DonationDetails } from '../pages/DonationDetails';
import { DonorDashboard } from '../pages/DonorDashboard';
import { NgoDashboard } from '../pages/NgoDashboard';
import { SafetyGuidelines } from '../pages/SafetyGuidelines';
import { ImpactAnalytics } from '../pages/ImpactAnalytics';
import { Auth } from '../pages/Auth';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import { USER_ROLES } from '../services/storageKeys';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="donations/:id" element={<DonationDetails />} />
        <Route path="safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="impact" element={<ImpactAnalytics />} />
        <Route path="auth" element={<Auth />} />

        {/* Role-Protected Portals */}
        <Route
          path="donor/dashboard"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.DONOR}>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="ngo/dashboard"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.NGO}>
              <NgoDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
