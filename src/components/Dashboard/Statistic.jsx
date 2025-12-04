import React, { useMemo } from 'react';
import { Users, CheckCircle, Percent, TrendingUp } from 'lucide-react';
import ElegantStatCard from '../Common/ElegantStatCard';

const Statistic = ({ customers = [], totalCount = 0 }) => {
  // Use totalCount if provided (from API/pagination), otherwise use customer array length
  const totalLeads = totalCount > 0 ? totalCount : customers.length;

  const acceptedLeads = useMemo(() => {
    return customers.filter((c) => {
      const s = (c.decisionStatus || '').toLowerCase();
      return s === 'approve' || s === 'approved';
    }).length;
  }, [customers]);

  const connectedLeads = useMemo(() => {
    return customers.filter((c) => {
      const s = (c.callStatus || '').toLowerCase();
      return s === 'connected';
    }).length;
  }, [customers]);

  const conversionRate = useMemo(() => {
    if (connectedLeads === 0) return 0;
    return Math.round((acceptedLeads / connectedLeads) * 100);
  }, [acceptedLeads, connectedLeads]);

  const avgScore = useMemo(() => {
    if (!customers.length) return 0;
    const scores = customers
      .map((c) => parseFloat(c.score))
      .filter((v) => !isNaN(v));
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [customers]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
      {/* Total Leads - soft blue */}
      <ElegantStatCard
        title="Total Leads"
        value={totalLeads}
        icon={Users}
        colorStart="#4ea4ff" // blue 400-ish
        colorEnd="#1f6feb" // blue 600-ish
      />

      <ElegantStatCard
        title="Approved"
        value={acceptedLeads}
        icon={CheckCircle}
        colorStart="#2dd4bf" // teal 400
        colorEnd="#0d9488" // teal 600
      />

      <ElegantStatCard
        title="Conversion Rate"
        value={`${conversionRate}%`}
        icon={Percent}
        colorStart="#ec4899" // pink 500
        colorEnd="#be185d" // pink 700
      />

      <ElegantStatCard
        title="Avg Score"
        value={`${avgScore}%`}
        icon={TrendingUp}
        colorStart="#a855f7" // purple 500
        colorEnd="#4338ca" // indigo 700
      />
    </div>
  );
};

export default Statistic;
