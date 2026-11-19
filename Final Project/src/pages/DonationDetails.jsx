import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck, UserCheck } from 'lucide-react';
import { useDonations } from '../contexts/DonationContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { getExpiryStatus, formatDateTime } from '../utils/formatters';

export const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { donations } = useDonations();
  const { isNGO } = useAuth();

  const donation = donations.find((d) => d.id === id);

  if (!donation) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <h2>Donation Listing Not Found</h2>
          <p style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            The requested listing might have been completed or removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const expiry = getExpiryStatus(donation.expiryTime);

  return (
    <div className="section">
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--color-forest)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            marginBottom: 'var(--space-6)',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to Listings
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-8)'
        }}>
          <div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-4)', border: '1px solid var(--color-border)' }}>
              <img
                src={donation.imageUrl}
                alt={donation.title}
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
            </div>

            <Card padding="md">
              <h4 style={{ marginBottom: 'var(--space-3)' }}>Food Safety & Handling</h4>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <ShieldCheck size={18} color="var(--color-forest)" />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal-muted)' }}>
                  Storage protocol: {donation.storageCondition}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <UserCheck size={18} color="var(--color-forest)" />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal-muted)' }}>
                  Verified donor: {donation.donorName}
                </span>
              </div>
            </Card>
          </div>

          <div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <Badge variant="sage">{donation.foodType}</Badge>
              <Badge variant={expiry.isUrgent ? 'danger' : 'warning'}>
                <Clock size={12} /> {expiry.text}
              </Badge>
            </div>

            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
              {donation.title}
            </h1>

            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-charcoal-muted)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
              {donation.description}
            </p>

            <Card padding="md" style={{ marginBottom: 'var(--space-6)', backgroundColor: 'var(--color-ivory-light)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase' }}>
                    Available Stock
                  </div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-forest)' }}>
                    {donation.availableQuantity} {donation.unit}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase' }}>
                    Consume Before
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    {formatDateTime(donation.expiryTime)}
                  </div>
                </div>
              </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {isNGO ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/ngo/dashboard')}
                >
                  Reserve Quantity in NGO Portal
                </Button>
              ) : (
                <div style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-sage-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-forest)'
                }}>
                  You are logged in as a <strong>Donor</strong>. To place food requests and reserve inventory, switch to an NGO profile in the top-right navbar menu.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
