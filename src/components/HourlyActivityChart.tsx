import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HourlyActivity } from '../types';

interface HourlyActivityChartProps {
  data: HourlyActivity[];
}

const HourlyActivityChart: React.FC<HourlyActivityChartProps> = ({ data }) => {
  // Format hours to be more readable
  const formattedData = data.map(item => ({
    ...item,
    formattedHour: `${item.hour}:00`
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
          <XAxis 
            dataKey="formattedHour" 
            stroke="#6b7280"
            tickFormatter={(value) => value.split(':')[0]}
          />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }}
            formatter={(value, name) => [value, 'Tweet Count']}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.6}
            name="Tweet Count"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyActivityChart;