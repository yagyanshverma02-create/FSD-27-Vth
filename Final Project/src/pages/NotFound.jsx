import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="section" style={{ textAlign: 'center', padding: 'var(--space-20) 0' }}>
      <div className="container">
        <h1 style={{ fontSize: 'var(--text-6xl)', color: 'var(--color-forest)', marginBottom: 'var(--space-2)' }}>404</h1>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Page Not Found</h2>
        <p style={{ maxWidth: '480px', margin: '0 auto var(--space-8) auto', color: 'var(--color-charcoal-muted)' }}>
          The page you are looking for doesn't exist or has been relocated within the MealBridge platform.
        </p>
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};
