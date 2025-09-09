import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom gradient colors for slices
const COLORS = [
  "url(#grad1)",
  "url(#grad2)",
  "url(#grad3)",
  "url(#grad4)",
  "url(#grad5)",
  "url(#grad6)",
];

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white shadow-lg p-3 rounded-lg border border-gray-200 text-gray-800">
        <p className="font-semibold">{name}</p>
        <p className="text-green-600 font-bold">Rs {value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function ExpensePieChart({ data }) {
  return (
    <div className="w-full h-96 p-4 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
      {data && data.length > 0 ? (
        <ResponsiveContainer>
          <PieChart>
            {/* Define gradients */}
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF6384" />
                <stop offset="100%" stopColor="#FF8AA0" />
              </linearGradient>
              <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#36A2EB" />
                <stop offset="100%" stopColor="#6FBFFF" />
              </linearGradient>
              <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFCE56" />
                <stop offset="100%" stopColor="#FFD97F" />
              </linearGradient>
              <linearGradient id="grad4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4BC0C0" />
                <stop offset="100%" stopColor="#6DE1E1" />
              </linearGradient>
              <linearGradient id="grad5" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9966FF" />
                <stop offset="100%" stopColor="#B794FF" />
              </linearGradient>
              <linearGradient id="grad6" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF9F40" />
                <stop offset="100%" stopColor="#FFB466" />
              </linearGradient>
            </defs>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70} // donut hole
              outerRadius={120}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
              startAngle={90}
              endAngle={450} // clockwise animation
              isAnimationActive={true}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 mt-32 font-semibold">
          No data available
        </p>
      )}
    </div>
  );
}
