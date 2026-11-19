import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { USER_ROLES } from '../services/storageKeys';
import { ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

export const Auth = () => {
  const { availableUsers, switchUser, register } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'custom'
  const [customRole, setCustomRole] = useState(USER_ROLES.DONOR);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  const handleSelectDemoUser = (user) => {
    switchUser(user.id);
    toast.success(`Logged in as ${user.name} (${user.role.toUpperCase()})`);
    navigate(user.role === USER_ROLES.DONOR ? '/donor/dashboard' : '/ngo/dashboard');
  };

  const handleCustomRegister = (e) => {
    e.preventDefault();
    if (!customName || !customEmail) {
      toast.error('Please enter name and email');
      return;
    }
    const newUser = register({
      name: customName,
      email: customEmail,
      role: customRole
    });
    toast.success(`Registered & logged in as ${newUser.name}`);
    navigate(customRole === USER_ROLES.DONOR ? '/donor/dashboard' : '/ngo/dashboard');
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '580px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <Badge variant="sage">Role-Based Access</Badge>
          <h1 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-3xl)' }}>
            Welcome to MealBridge
          </h1>
          <p style={{ color: 'var(--color-charcoal-muted)' }}>
            Choose a pre-configured profile to test the end-to-end food redistribution workflow, or register a new role.
          </p>
        </div>

        <Card padding="lg">
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              style={{
                flex: 1,
                padding: 'var(--space-3)',
                fontWeight: 600,
                color: activeTab === 'demo' ? 'var(--color-forest)' : 'var(--color-charcoal-muted)',
                borderBottom: activeTab === 'demo' ? '2px solid var(--color-forest)' : 'none'
              }}
            >
              Instant Demo Profiles
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              style={{
                flex: 1,
                padding: 'var(--space-3)',
                fontWeight: 600,
                color: activeTab === 'custom' ? 'var(--color-forest)' : 'var(--color-charcoal-muted)',
                borderBottom: activeTab === 'custom' ? '2px solid var(--color-forest)' : 'none'
              }}
            >
              Custom Registration
            </button>
          </div>

          {activeTab === 'demo' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-charcoal-subtle)', fontWeight: 700 }}>
                Select a test account:
              </div>
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelectDemoUser(user)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-4)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: 'var(--color-ivory-light)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-forest)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>{user.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-muted)' }}>{user.email}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Badge variant={user.role === USER_ROLES.DONOR ? 'sage' : 'info'}>
                      {user.role.toUpperCase()}
                    </Badge>
                    <ArrowRight size={16} color="var(--color-forest)" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleCustomRegister} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
                  ORGANIZATION ROLE
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Button
                    type="button"
                    size="sm"
                    variant={customRole === USER_ROLES.DONOR ? 'primary' : 'outline'}
                    onClick={() => setCustomRole(USER_ROLES.DONOR)}
                    style={{ flex: 1 }}
                  >
                    Food Donor
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={customRole === USER_ROLES.NGO ? 'primary' : 'outline'}
                    onClick={() => setCustomRole(USER_ROLES.NGO)}
                    style={{ flex: 1 }}
                  >
                    Frontline NGO
                  </Button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
                  ORGANIZATION NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Skyline Catering or Hope Kitchen"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="contact@example.org"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" style={{ marginTop: 'var(--space-2)' }}>
                Create Account & Enter Platform
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
