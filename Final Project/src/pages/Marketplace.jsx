import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock } from 'lucide-react';
import { useDonations } from '../contexts/DonationContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { getExpiryStatus } from '../utils/formatters';
import { calculateDistanceKm, formatDistance } from '../utils/distance';
import { DEFAULT_COORDINATES } from '../utils/constants';

export const Marketplace = () => {
  const { donations } = useDonations();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const userCoords = currentUser?.coordinates || DEFAULT_COORDINATES;

  const filteredDonations = donations.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.donorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.foodType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <Badge variant="sage">Live Surplus Feed</Badge>
          <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            Surplus Food Marketplace
          </h1>
          <p style={{ maxWidth: '640px', color: 'var(--color-charcoal-muted)' }}>
            Real-time surplus listings from verified food businesses with calculated travel proximity and expiry-aware safety timers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
          backgroundColor: 'var(--color-white)',
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            flex: 1,
            minWidth: '240px',
            backgroundColor: 'var(--color-ivory)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}>
            <Search size={18} color="var(--color-charcoal-subtle)" />
            <input
              type="text"
              placeholder="Search dishes, donors, or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: 'var(--text-sm)'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {['ALL', 'Cooked Meals', 'Bakery & Bread', 'Fresh Produce'].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Listing Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {filteredDonations.map((item) => {
            const expiry = getExpiryStatus(item.expiryTime);
            const dist = calculateDistanceKm(
              userCoords.latitude,
              userCoords.longitude,
              item.coordinates?.latitude,
              item.coordinates?.longitude
            );

            return (
              <Card key={item.id} hoverable padding="none" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <Badge variant={expiry.isUrgent ? 'danger' : 'warning'}>
                      <Clock size={12} /> {expiry.text}
                    </Badge>
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                    <Badge variant="sage">{item.foodType}</Badge>
                  </div>
                </div>

                <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', lineHeight: 1.3 }}>{item.title}</h3>
                  </div>

                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-charcoal-muted)',
                    marginBottom: 'var(--space-4)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.description}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: 'var(--space-4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-subtle)' }}>
                      <span>Available Quantity</span>
                      <strong style={{ color: 'var(--color-forest)', fontSize: 'var(--text-sm)' }}>
                        {item.availableQuantity} / {item.totalQuantity} {item.unit}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-muted)' }}>
                      <MapPin size={14} color="var(--color-green)" />
                      <span>{item.donorName} • {formatDistance(dist)}</span>
                    </div>

                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <Link to={`/donations/${item.id}`} style={{ width: '100%', display: 'block' }}>
                        <Button variant="secondary" size="sm" style={{ width: '100%' }}>
                          Inspect & Request Listing
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
