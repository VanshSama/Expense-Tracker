import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: 150 }}>No chart data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 20 }}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4caf50" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#81c784" stopOpacity={0.8}/>
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f44336" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#e57373" stopOpacity={0.8}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} />
        <Legend verticalAlign="top" height={36} />

        <Line
          type="monotone"
          dataKey="income"
          stroke="url(#incomeGradient)"
          strokeWidth={3}
          dot={{ r: 5, fill: '#4caf50' }}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="url(#expenseGradient)"
          strokeWidth={3}
          dot={{ r: 5, fill: '#f44336' }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
