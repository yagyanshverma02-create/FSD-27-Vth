import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

export const Home = () => {
  const { isDonor, isNGO } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Foundation Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge-wrap">
            <Badge variant="sage" size="md">
              <Sparkles size={14} /> Next-Gen Surplus Food Redistribution Platform
            </Badge>
          </div>

          <h1 className="hero-title">
            Where surplus abundance meets urgent nutritional need.
          </h1>

          <p className="hero-subtitle">
            MealBridge transforms food surplus into immediate community relief. Connect verified corporate donors and restaurants with frontline humanitarian NGOs in real time with safe quantity reservation and cold-chain transparency.
          </p>

          <div className="hero-cta-group">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              onClick={() => navigate('/marketplace')}
            >
              Explore Surplus Marketplace
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(isDonor ? '/donor/dashboard' : isNGO ? '/ngo/dashboard' : '/auth')}
            >
              {isDonor ? 'Donor Dashboard' : isNGO ? 'NGO Console' : 'Sign In / Register'}
            </Button>
          </div>

          {/* Quick Stats Highlights */}
          <div className="hero-metrics-grid">
            <Card padding="md" className="metric-card">
              <div className="metric-number">4,280+</div>
              <div className="metric-label">Meals Rescued to Date</div>
            </Card>
            <Card padding="md" className="metric-card">
              <div className="metric-number">100%</div>
              <div className="metric-label">Verified NGO Network</div>
            </Card>
            <Card padding="md" className="metric-card">
              <div className="metric-number">&lt; 45 min</div>
              <div className="metric-label">Avg. Claim Response Time</div>
            </Card>
            <Card padding="md" className="metric-card">
              <div className="metric-number">0.0 kg</div>
              <div className="metric-label">Acceptable Landfill Waste</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Foundation Teaser Section */}
      <section className="section overview-section">
        <div className="container">
          <div className="section-header">
            <Badge variant="default">Core Architecture</Badge>
            <h2>Engineered for seamless redistribution</h2>
            <p>Designed for immediate discovery, deterministic quantity reservation, and verifiable food safety.</p>
          </div>

          <div className="pillars-grid">
            <Card hoverable padding="lg" className="pillar-card">
              <div className="pillar-icon">
                <Clock size={24} color="#173D32" />
              </div>
              <h3>Expiry-Aware Listings</h3>
              <p>Dynamic countdown timers calculate consumption windows and flag urgent donations approaching strict safety thresholds.</p>
              <Link to="/marketplace" className="pillar-link">
                View Live Marketplace <ArrowUpRight size={16} />
              </Link>
            </Card>

            <Card hoverable padding="lg" className="pillar-card">
              <div className="pillar-icon">
                <MapPin size={24} color="#173D32" />
              </div>
              <h3>Proximity Geolocation</h3>
              <p>Haversine geodesic distance scoring prioritizes nearby NGOs to minimize transit time and preserve thermal integrity.</p>
              <Link to="/marketplace" className="pillar-link">
                Explore Distance Discovery <ArrowUpRight size={16} />
              </Link>
            </Card>

            <Card hoverable padding="lg" className="pillar-card">
              <div className="pillar-icon">
                <ShieldCheck size={24} color="#173D32" />
              </div>
              <h3>Certified Safety Protocol</h3>
              <p>Integrated food safety checklists, temperature logging guidelines, and sanitary container standards for every dispatch.</p>
              <Link to="/safety-guidelines" className="pillar-link">
                Review Guidelines <ArrowUpRight size={16} />
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
