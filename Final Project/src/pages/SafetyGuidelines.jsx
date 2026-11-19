import React from 'react';
import { Thermometer, Box, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { FOOD_SAFETY_CHECKLIST } from '../utils/constants';

export const SafetyGuidelines = () => {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
          <Badge variant="sage">Food Safety Protocol</Badge>
          <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            Surplus Food Quality & Safety Standards
          </h1>
          <p style={{ color: 'var(--color-charcoal-muted)' }}>
            Every meal redistributed via MealBridge adheres to strict hygienic guidelines to safeguard recipient health and dignify community outreach.
          </p>
        </div>

        <Card padding="lg" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <CheckCircle2 color="var(--color-forest)" size={22} />
            Mandatory Donor Checklist
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {FOOD_SAFETY_CHECKLIST.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)' }}>
                <span style={{ color: 'var(--color-forest)', fontWeight: 700 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <Thermometer color="var(--color-forest)" size={20} />
              <h4>Temperature Thresholds</h4>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal-muted)' }}>
              Cooked hot meals must remain strictly &gt; 60°C. Chilled dairy and prepared salads must stay below 4°C at all times during transit.
            </p>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <Box color="var(--color-forest)" size={20} />
              <h4>Sanitary Packaging</h4>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal-muted)' }}>
              Food must be packaged exclusively in clean, food-grade airtight containers or single-use tamper-evident packaging.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
