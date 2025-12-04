import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTheme } from '@/context/ThemeContext.jsx';

const BarChartComponent = ({ data = [], title = 'Bar Chart', colors = [] }) => {
  const { darkMode } = useTheme();
  // Generate unique gradient IDs
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  if (!data || data.length === 0) {
    return (
      <div className={`rounded-lg shadow p-6 transition-colors ${
        darkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-700'
        }`}>{title}</h3>
        <p className={`text-center py-8 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>No data available</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg shadow p-6 transition-colors ${
      darkMode
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        darkMode ? 'text-white' : 'text-gray-700'
      }`}>{title}</h3>
      
      {/* Gradient Definitions */}
      <svg width="0" height="0">
        <defs>
          {colors.map((color, i) => {
            // Helper function to darken color
            const darkenColor = (hex) => {
              const num = parseInt(hex.replace('#', ''), 16);
              const r = Math.max(0, (num >> 16) - 40);
              const g = Math.max(0, ((num >> 8) & 0x00FF) - 40);
              const b = Math.max(0, (num & 0x0000FF) - 40);
              return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
            };
            return (
              <linearGradient id={`bar-grad-${uniqueId}-${i}`} key={i} x1="0" x2="1">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={darkenColor(color)} />
              </linearGradient>
            );
          })}
        </defs>
      </svg>
      
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 40,
            left: 100,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4b5563' : '#e5e7eb'} />
          <XAxis 
            type="number"
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            dataKey="name"
            type="category"
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '13px', fontWeight: '500' }}
            width={95}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#374151' : '#fff',
              border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              color: darkMode ? '#e5e7eb' : '#374151',
            }}
            labelStyle={{ color: darkMode ? '#e5e7eb' : '#374151' }}
            formatter={(value) => [`${value}`, 'Count']}
            cursor={{ fill: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)' }}
          />
          <Bar 
            dataKey="value" 
            fill="#3b82f6" 
            radius={[0, 12, 12, 0]}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#bar-grad-${uniqueId}-${index % colors.length})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
