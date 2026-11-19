import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { TrendingUp, Leaf, Users } from 'lucide-react';

const monthlyImpactData = [
  { month: 'Jun', meals: 650, co2Saved: 320 },
  { month: 'Jul', meals: 820, co2Saved: 410 },
  { month: 'Aug', meals: 1100, co2Saved: 550 },
  { month: 'Sep', meals: 1450, co2Saved: 725 },
  { month: 'Oct', meals: 2100, co2Saved: 1050 },
  { month: 'Nov', meals: 2840, co2Saved: 1420 }
];

export const ImpactAnalytics = () => {
  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <Badge variant="sage">Social & Ecological Metrics</Badge>
          <h1 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            Redistribution Impact & Sustainability Analytics
          </h1>
          <p style={{ color: 'var(--color-charcoal-muted)', maxWidth: '640px' }}>
            Auditable metrics tracking meals diverted from landfills, greenhouse gas reductions, and community nutrition milestones.
          </p>
        </div>

        {/* Top KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-forest)', marginBottom: 'var(--space-2)' }}>
              <TrendingUp size={20} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase' }}>Meals Saved</span>
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-forest)' }}>4,280+</div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-subtle)' }}>+32% from previous month</p>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-green)', marginBottom: 'var(--space-2)' }}>
              <Leaf size={20} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase' }}>GHG Emissions Prevented</span>
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-green)' }}>2.14 Tons</div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-subtle)' }}>CO2 equivalent diverted</p>
          </Card>

          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-forest)', marginBottom: 'var(--space-2)' }}>
              <Users size={20} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase' }}>Beneficiary Shelters</span>
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-forest)' }}>18 NGOs</div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-subtle)' }}>Active distribution partners</p>
          </Card>
        </div>

        {/* Recharts Visualizations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
          <Card padding="lg">
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Monthly Meals Recovered</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E3D8" />
                  <XAxis dataKey="month" stroke="#7A8680" />
                  <YAxis stroke="#7A8680" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E3D8',
                      borderRadius: '8px',
                      fontFamily: 'Inter'
                    }}
                  />
                  <Bar dataKey="meals" fill="#173D32" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card padding="lg">
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Carbon Offset Trajectory (kg CO2)</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E3D8" />
                  <XAxis dataKey="month" stroke="#7A8680" />
                  <YAxis stroke="#7A8680" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E5E3D8',
                      borderRadius: '8px',
                      fontFamily: 'Inter'
                    }}
                  />
                  <Area type="monotone" dataKey="co2Saved" stroke="#315B49" fill="#B7C9B2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
