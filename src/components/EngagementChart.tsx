import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EngagementData } from '../types';

interface EngagementChartProps {
  data: EngagementData[];
}

const EngagementChart: React.FC<EngagementChartProps> = ({ data }) => {
  // Format dates to be more readable
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{
            top: 20,
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
          <Bar dataKey="favorites" fill="#3b82f6" name="Favorites" />
          <Bar dataKey="retweets" fill="#8b5cf6" name="Retweets" />
          <Bar dataKey="replies" fill="#10b981" name="Replies" />
          <Bar dataKey="quotes" fill="#f59e0b" name="Quotes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;