import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/localStorageService';

const DonationContext = createContext(null);

export const DonationProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setDonations(storageService.getDonations());
    setRequests(storageService.getRequests());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addDonation = (donationData) => {
    const newDonation = storageService.createDonation(donationData);
    refreshData();
    return newDonation;
  };

  const updateDonation = (id, updates) => {
    const updated = storageService.updateDonation(id, updates);
    refreshData();
    return updated;
  };

  const removeDonation = (id) => {
    const success = storageService.deleteDonation(id);
    refreshData();
    return success;
  };

  const submitRequest = (requestData) => {
    const newRequest = storageService.createRequest(requestData);
    refreshData();
    return newRequest;
  };

  const updateRequestStatus = (requestId, status) => {
    const updated = storageService.updateRequestStatus(requestId, status);
    refreshData();
    return updated;
  };

  const resetAllData = () => {
    storageService.resetToSeed();
    refreshData();
  };

  const value = {
    donations,
    requests,
    loading,
    refreshData,
    addDonation,
    updateDonation,
    removeDonation,
    submitRequest,
    updateRequestStatus,
    resetAllData
  };

  return <DonationContext.Provider value={value}>{children}</DonationContext.Provider>;
};

export const useDonations = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
};
