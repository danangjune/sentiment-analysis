import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockRecommendation } from '../types';

interface StockRecommendationChartProps {
  data: StockRecommendation[];
}

const StockRecommendationChart: React.FC<StockRecommendationChartProps> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }}
          />
          <Legend />
          <Bar dataKey="buy" stackId="a" fill="#22c55e" name="Buy" />
          <Bar dataKey="hold" stackId="a" fill="#facc15" name="Hold" />
          <Bar dataKey="sell" stackId="a" fill="#ef4444" name="Sell" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockRecommendationChart;