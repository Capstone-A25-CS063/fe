import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext.jsx';

const CustomPieChart = ({ title, data, colors }) => {
  const { darkMode } = useTheme();
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  return (
    <div className={`p-6 rounded-2xl shadow-sm border transition flex flex-col justify-between h-full ${
      darkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
    }`}>
      {/* Header */}
      <div className="mb-5">
        <h3 className={`text-lg font-bold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>{title}</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2"></div>
      </div>

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
              <linearGradient id={`grad-${uniqueId}-${i}`} key={i} x1="0" x2="1">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={darkenColor(color)} />
              </linearGradient>
            );
          })}
        </defs>
      </svg>

      {/* Pie Chart */}
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              cornerRadius={8}
              startAngle={-45}
              endAngle={315}
              labelLine={false}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
              label={({ value, cx, cy, midAngle, outerRadius }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 12;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#374151"
                    fontSize={12}
                    fontWeight="700"
                    stroke="white"
                    strokeWidth={2}
                    paintOrder="stroke"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {value}
                  </text>
                );
              }}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={`url(#grad-${uniqueId}-${i % colors.length})`}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#374151' : '#fff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: darkMode ? '#e5e7eb' : '#374151',
              }}
              formatter={(value, name) => [`${value}`, name]} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4 justify-items-start">
        {data.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors[i % colors.length] }}
            ></span>
            <span className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-800'
            }`}>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
