import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDonations } from '../contexts/DonationContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Store, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NgoDashboard = () => {
  const { currentUser } = useAuth();
  const { requests } = useDonations();

  const myRequests = requests.filter((r) => r.ngoId === currentUser?.id);

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <div>
            <Badge variant="info">NGO Logistics Console</Badge>
            <h1 style={{ marginTop: 'var(--space-2)' }}>{currentUser?.name || 'NGO Dashboard'}</h1>
            <p style={{ color: 'var(--color-charcoal-muted)' }}>
              Track active food requests, coordinate thermal collection windows, and confirm distribution receipts.
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="primary" icon={Store}>
              Browse Food Marketplace
            </Button>
          </Link>
        </div>

        {/* Requests List */}
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Active Claim Requests & Pickups</h2>
          {myRequests.length === 0 ? (
            <Card padding="lg" style={{ textAlign: 'center' }}>
              <p>You haven't requested any food donations yet. Visit the Marketplace to discover surplus nearby.</p>
            </Card>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              {myRequests.map((req) => (
                <Card key={req.id} padding="md" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <Badge variant={req.status === 'approved' ? 'success' : 'warning'}>
                        {req.status.toUpperCase()}
                      </Badge>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-subtle)' }}>
                        Window: {req.collectionWindow}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'var(--text-lg)' }}>{req.donationTitle}</h3>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-muted)' }}>
                      Donor: {req.donorName} • Quantity: {req.requestedQuantity} {req.unit}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {req.status === 'approved' && (
                      <Button variant="primary" size="sm" icon={CheckCircle}>
                        Confirm Receipt
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
