import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DailySentimentData } from '../types';

interface DailySentimentChartProps {
  data: DailySentimentData[];
}

const DailySentimentChart: React.FC<DailySentimentChartProps> = ({ data }) => {
  // Format dates to be more readable
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
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
          <Area 
            type="monotone" 
            dataKey="positive" 
            stackId="1" 
            stroke="#22c55e" 
            fill="#22c55e" 
            fillOpacity={0.8}
            name="Positive"
          />
          <Area 
            type="monotone" 
            dataKey="neutral" 
            stackId="1" 
            stroke="#facc15" 
            fill="#facc15" 
            fillOpacity={0.8}
            name="Neutral"
          />
          <Area 
            type="monotone" 
            dataKey="negative" 
            stackId="1" 
            stroke="#ef4444" 
            fill="#ef4444" 
            fillOpacity={0.8}
            name="Negative"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySentimentChart;