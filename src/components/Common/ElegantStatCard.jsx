import React from 'react';

/**
 * Compact, elegant stat card.
 * Props:
 *  - title: string
 *  - value: number|string
 *  - icon: React component (lucide icon)
 *  - gradient: tailwind gradient classes e.g. "from-primary-400 to-primary-600"
 */
const ElegantStatCard = ({
  title,
  value,
  icon: Icon,
  colorStart,
  colorEnd,
}) => {
  return (
    <div
      className="p-4 rounded-xl shadow-md text-white flex items-center gap-3"
      style={{
        background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
      }}
    >
      <div className="p-2.5 bg-white/20 rounded-lg flex items-center justify-center">
        <Icon size={22} />
      </div>

      <div className="leading-tight">
        <h3 className="text-lg font-medium opacity-90">{title}</h3>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default ElegantStatCard;
