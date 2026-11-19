import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Shield } from 'lucide-react';
import './Footer.css';

const CURRENT_YEAR = 2026;

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__grid">
          {/* Brand Col */}
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <HeartHandshake size={22} color="#F7F6F0" />
              </div>
              <span className="footer__logo-text">MealBridge</span>
            </div>
            <p className="footer__desc">
              An advanced food recovery architecture connecting corporate caterers, restaurants, and grocers with frontline humanitarian NGOs to end preventable hunger.
            </p>
            <div className="footer__trust-badge">
              <Shield size={16} />
              <span>Verified Safe Chain Redistribution</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Platform</h4>
            <ul className="footer__links">
              <li><Link to="/marketplace">Surplus Food Marketplace</Link></li>
              <li><Link to="/safety-guidelines">Food Safety Guidelines</Link></li>
              <li><Link to="/impact">Live Impact & Analytics</Link></li>
              <li><Link to="/auth">Sign In / Role Access</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div className="footer__col">
            <h4 className="footer__heading">Portals</h4>
            <ul className="footer__links">
              <li><Link to="/donor/dashboard">Donor Console (List Surplus)</Link></li>
              <li><Link to="/ngo/dashboard">NGO Portal (Request & Coordinate)</Link></li>
              <li><a href="#how-it-works">Safe Quantity Reservation</a></li>
              <li><a href="#compliance">FSSAI / Sanitation Compliance</a></li>
            </ul>
          </div>

          {/* Academic / Architecture Notes */}
          <div className="footer__col">
            <h4 className="footer__heading">B.Tech FSD Stack</h4>
            <div className="footer__tech-tags">
              <span className="footer__tech-tag">React 19</span>
              <span className="footer__tech-tag">Vite</span>
              <span className="footer__tech-tag">Context API</span>
              <span className="footer__tech-tag">Recharts</span>
              <span className="footer__tech-tag">LocalStorage Engine</span>
              <span className="footer__tech-tag">Haversine Distance</span>
            </div>
            <p className="footer__tech-note">
              Pure client-side zero-backend state machine with deterministic schema migrations and safe quantity reservation locking.
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {CURRENT_YEAR} MealBridge. Built for social impact and food security.</p>
          <div className="footer__bottom-links">
            <span>Clean Code Architecture</span>
            <span>•</span>
            <span>Zero Food Waste Mission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
