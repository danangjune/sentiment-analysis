import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PriceTarget } from '../types';

interface PriceTargetChartProps {
  data: PriceTarget[];
}

const PriceTargetChart: React.FC<PriceTargetChartProps> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
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
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Target Price"
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#8b5cf6" 
            strokeWidth={2} 
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Actual Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTargetChart;