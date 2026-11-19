import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDonations } from '../contexts/DonationContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { DonationFormModal } from '../components/donor/DonationFormModal';
import { REQUEST_STATUS } from '../services/storageKeys';
import {
  PlusCircle,
  Package,
  Clock,
  MapPin,
  Check,
  X,
  Phone,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { getExpiryStatus, formatDateTime } from '../utils/formatters';
import { toast } from 'react-toastify';
import './DonorDashboard.css';

export const DonorDashboard = () => {
  const { currentUser } = useAuth();
  const {
    donations,
    requests,
    addDonation,
    updateDonation,
    removeDonation,
    updateRequestStatus
  } = useDonations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);

  // Filter listings and requests for this donor
  const myDonations = donations.filter((d) => d.donorId === currentUser?.id);
  const myRequests = requests.filter((r) => r.donorId === currentUser?.id);

  const pendingRequests = myRequests.filter((r) => r.status === REQUEST_STATUS.PENDING);

  // Total portions provided across all listings
  const totalPortions = myDonations.reduce((sum, d) => sum + (Number(d.totalQuantity) || 0), 0);
  const reservedPortions = myDonations.reduce((sum, d) => sum + (Number(d.reservedQuantity) || 0), 0);

  const handleOpenCreateModal = () => {
    setEditingDonation(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (donation) => {
    setEditingDonation(donation);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (payload) => {
    if (editingDonation) {
      updateDonation(editingDonation.id, payload);
      toast.success(`Updated "${payload.title}" successfully!`);
    } else {
      addDonation(payload);
      toast.success(`Published "${payload.title}" to the live marketplace!`);
    }
  };

  const handleWithdraw = (donation) => {
    if (window.confirm(`Are you sure you want to withdraw "${donation.title}"?`)) {
      removeDonation(donation.id);
      toast.info(`Listing "${donation.title}" has been withdrawn.`);
    }
  };

  const handleApproveRequest = (request) => {
    try {
      updateRequestStatus(request.id, REQUEST_STATUS.APPROVED);
      toast.success(`Approved request from ${request.ngoName} for ${request.requestedQuantity} ${request.unit}!`);
    } catch (err) {
      toast.error(err.message || 'Failed to approve request');
    }
  };

  const handleRejectRequest = (request) => {
    if (window.confirm(`Decline pickup request from ${request.ngoName}? The reserved inventory will be restored.`)) {
      try {
        updateRequestStatus(request.id, REQUEST_STATUS.REJECTED);
        toast.info(`Declined request from ${request.ngoName}. Inventory returned to active pool.`);
      } catch (err) {
        toast.error(err.message || 'Failed to decline request');
      }
    }
  };

  return (
    <div className="section donor-dashboard">
      <div className="container">
        {/* Top Header */}
        <div className="dashboard-header">
          <div>
            <Badge variant="sage">Donor Management Portal</Badge>
            <h1 className="dashboard-title">{currentUser?.name || 'Donor Console'}</h1>
            <p className="dashboard-subtitle">
              Publish surplus food batches, approve frontline NGO pickups, and track your zero-waste community impact.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={PlusCircle}
            onClick={handleOpenCreateModal}
          >
            List New Surplus Food
          </Button>
        </div>

        {/* Metrics Row */}
        <div className="metrics-summary-grid">
          <Card padding="md" className="metric-box">
            <span className="metric-box__label">Active Listings</span>
            <div className="metric-box__value">{myDonations.length}</div>
            <span className="metric-box__sub">Surplus offerings published</span>
          </Card>

          <Card padding="md" className="metric-box">
            <span className="metric-box__label">Pending NGO Requests</span>
            <div className="metric-box__value" style={{ color: pendingRequests.length > 0 ? 'var(--color-status-pending)' : 'var(--color-forest)' }}>
              {pendingRequests.length}
            </div>
            <span className="metric-box__sub">Awaiting your approval</span>
          </Card>

          <Card padding="md" className="metric-box">
            <span className="metric-box__label">Total Meals Shared</span>
            <div className="metric-box__value">{totalPortions}</div>
            <span className="metric-box__sub">Portions diverted from waste</span>
          </Card>

          <Card padding="md" className="metric-box">
            <span className="metric-box__label">Reserved for Pickup</span>
            <div className="metric-box__value" style={{ color: 'var(--color-green)' }}>
              {reservedPortions}
            </div>
            <span className="metric-box__sub">Portions in transit or approved</span>
          </Card>
        </div>

        {/* Incoming Requests Section */}
        <div className="dashboard-section">
          <div className="section-title-wrap">
            <h2>Incoming NGO Pickup Requests</h2>
            <Badge variant={pendingRequests.length > 0 ? 'warning' : 'default'}>
              {pendingRequests.length} Pending
            </Badge>
          </div>

          {myRequests.length === 0 ? (
            <Card padding="lg" className="empty-state-card">
              <Package size={36} color="var(--color-charcoal-subtle)" />
              <p>No NGO collection requests yet. When local shelters claim your surplus, they will appear here for your approval.</p>
            </Card>
          ) : (
            <div className="requests-grid">
              {myRequests.map((req) => {
                const isPending = req.status === REQUEST_STATUS.PENDING;
                const isApproved = req.status === REQUEST_STATUS.APPROVED;

                return (
                  <Card key={req.id} padding="md" className="request-card">
                    <div className="request-card__header">
                      <div>
                        <div className="request-card__tags">
                          <Badge
                            variant={
                              isApproved ? 'success' : isPending ? 'warning' : req.status === 'completed' ? 'info' : 'danger'
                            }
                          >
                            {req.status.toUpperCase()}
                          </Badge>
                          <span className="request-card__time">{formatDateTime(req.createdAt)}</span>
                        </div>
                        <h3 className="request-card__title">{req.donationTitle}</h3>
                      </div>
                      <div className="request-card__qty-pill">
                        <strong>{req.requestedQuantity}</strong> {req.unit}
                      </div>
                    </div>

                    <div className="request-card__details">
                      <div className="request-detail-item">
                        <strong>NGO Organization:</strong> {req.ngoName}
                      </div>
                      {req.ngoPhone && (
                        <div className="request-detail-item">
                          <Phone size={14} /> <span>{req.ngoPhone}</span>
                        </div>
                      )}
                      <div className="request-detail-item">
                        <Calendar size={14} /> <span>Pickup Window: {req.collectionWindow}</span>
                      </div>
                      {req.notes && (
                        <div className="request-notes">
                          <em>"{req.notes}"</em>
                        </div>
                      )}
                    </div>

                    {isPending && (
                      <div className="request-actions">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Check}
                          onClick={() => handleApproveRequest(req)}
                        >
                          Approve Request
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={X}
                          onClick={() => handleRejectRequest(req)}
                        >
                          Decline
                        </Button>
                      </div>
                    )}

                    {isApproved && (
                      <div className="approved-banner">
                        <CheckCircle2 size={16} color="var(--color-status-approved)" />
                        <span>Approved — Awaiting NGO collection within scheduled window.</span>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Listings Section */}
        <div className="dashboard-section">
          <div className="section-title-wrap">
            <h2>Your Surplus Food Listings</h2>
            <Button
              variant="outline"
              size="sm"
              icon={PlusCircle}
              onClick={handleOpenCreateModal}
            >
              List Another Item
            </Button>
          </div>

          {myDonations.length === 0 ? (
            <Card padding="lg" className="empty-state-card">
              <Package size={40} color="var(--color-charcoal-subtle)" />
              <h3 style={{ marginTop: 'var(--space-2)' }}>No active surplus listings</h3>
              <p>You haven't listed any surplus food batches yet. Turn your surplus into meals today.</p>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button variant="primary" icon={PlusCircle} onClick={handleOpenCreateModal}>
                  List Surplus Food Now
                </Button>
              </div>
            </Card>
          ) : (
            <div className="listings-grid">
              {myDonations.map((item) => {
                const expiry = getExpiryStatus(item.expiryTime);

                return (
                  <Card key={item.id} padding="none" className="donor-listing-card">
                    <div className="donor-listing-card__media">
                      <img src={item.imageUrl} alt={item.title} />
                      <div className="donor-listing-card__badges">
                        <Badge variant="sage">{item.foodType}</Badge>
                        <Badge variant={expiry.isUrgent ? 'danger' : 'warning'}>
                          <Clock size={12} /> {expiry.text}
                        </Badge>
                      </div>
                    </div>

                    <div className="donor-listing-card__content">
                      <h3 className="donor-listing-card__title">{item.title}</h3>
                      <p className="donor-listing-card__desc">{item.description}</p>

                      <div className="donor-listing-card__stats">
                        <div className="stat-col">
                          <span className="stat-col__label">Available</span>
                          <span className="stat-col__val stat-col__val--highlight">
                            {item.availableQuantity} {item.unit}
                          </span>
                        </div>
                        <div className="stat-col">
                          <span className="stat-col__label">Reserved</span>
                          <span className="stat-col__val">
                            {item.reservedQuantity} {item.unit}
                          </span>
                        </div>
                        <div className="stat-col">
                          <span className="stat-col__label">Total</span>
                          <span className="stat-col__val">
                            {item.totalQuantity} {item.unit}
                          </span>
                        </div>
                      </div>

                      <div className="donor-listing-card__footer">
                        <div className="donor-listing-card__address">
                          <MapPin size={13} color="var(--color-green)" />
                          <span>{item.pickupAddress}</span>
                        </div>
                        <div className="donor-listing-card__actions">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEditModal(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleWithdraw(item)}
                          >
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* The List / Edit Surplus Modal */}
      <DonationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingDonation}
        onSubmit={handleFormSubmit}
        currentDonor={currentUser}
      />
    </div>
  );
};
