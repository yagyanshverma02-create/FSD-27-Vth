import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HeartHandshake, Bell, Menu, X, ArrowRightLeft, ShieldCheck, BarChart3, Store, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import './Navbar.css';

export const Navbar = () => {
  const { currentUser, isDonor, switchUser, availableUsers } = useAuth();
  const { unreadCount } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSwitch = (userId) => {
    switchUser(userId);
    setRoleSwitcherOpen(false);
  };

  const dashboardRoute = isDonor ? '/donor/dashboard' : '/ngo/dashboard';

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Brand */}
        <Link to="/" className="navbar__brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="navbar__logo-icon">
            <HeartHandshake size={24} color="#F7F6F0" />
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-title">MealBridge</span>
            <span className="navbar__brand-tag">Surplus Food Exchange</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar__nav">
          <NavLink to="/marketplace" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            <Store size={18} />
            <span>Marketplace</span>
          </NavLink>
          <NavLink to="/safety-guidelines" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            <ShieldCheck size={18} />
            <span>Food Safety</span>
          </NavLink>
          <NavLink to="/impact" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            <BarChart3 size={18} />
            <span>Impact</span>
          </NavLink>
        </nav>

        {/* User / Action Area */}
        <div className="navbar__actions">
          {currentUser ? (
            <>
              {/* Quick Role Switcher */}
              <div className="navbar__role-switcher-wrapper">
                <button
                  type="button"
                  className="navbar__role-pill"
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  title="Switch between pre-seeded test accounts"
                >
                  <ArrowRightLeft size={14} />
                  <span className="navbar__role-name">{currentUser.name}</span>
                  <Badge variant={isDonor ? 'sage' : 'info'} size="sm">
                    {isDonor ? 'Donor' : 'NGO'}
                  </Badge>
                </button>

                {roleSwitcherOpen && (
                  <div className="navbar__role-dropdown">
                    <div className="navbar__role-dropdown-header">Switch Role Profile:</div>
                    {availableUsers.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        className={`navbar__role-option ${user.id === currentUser.id ? 'navbar__role-option--active' : ''}`}
                        onClick={() => handleRoleSwitch(user.id)}
                      >
                        <div className="navbar__role-option-info">
                          <span className="navbar__role-option-name">{user.name}</span>
                          <span className="navbar__role-option-sub">{user.role.toUpperCase()}</span>
                        </div>
                        {user.id === currentUser.id && <span className="navbar__role-check">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification icon */}
              <Link to={dashboardRoute} className="navbar__notif-btn" title="View Notifications in Dashboard">
                <Bell size={20} />
                {unreadCount > 0 && <span className="navbar__notif-badge">{unreadCount}</span>}
              </Link>

              {/* Dashboard CTA */}
              <Button
                variant="primary"
                size="sm"
                icon={LayoutDashboard}
                onClick={() => navigate(dashboardRoute)}
              >
                {isDonor ? 'Donor Console' : 'NGO Portal'}
              </Button>
            </>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu">
          <NavLink
            to="/marketplace"
            className="navbar__mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Store size={18} />
            <span>Food Marketplace</span>
          </NavLink>
          <NavLink
            to="/safety-guidelines"
            className="navbar__mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <ShieldCheck size={18} />
            <span>Food Safety Guidelines</span>
          </NavLink>
          <NavLink
            to="/impact"
            className="navbar__mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BarChart3 size={18} />
            <span>Impact Analytics</span>
          </NavLink>
          {currentUser && (
            <NavLink
              to={dashboardRoute}
              className="navbar__mobile-link navbar__mobile-link--accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LayoutDashboard size={18} />
              <span>{isDonor ? 'Donor Dashboard' : 'NGO Dashboard'}</span>
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};
