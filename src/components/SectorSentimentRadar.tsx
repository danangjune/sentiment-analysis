import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { SectorSentiment } from '../types';

interface SectorSentimentRadarProps {
  data: SectorSentiment[];
}

const SectorSentimentRadar: React.FC<SectorSentimentRadarProps> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="name" stroke="#6b7280" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b7280" />
          <Radar
            name="Sector Sentiment"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectorSentimentRadar;