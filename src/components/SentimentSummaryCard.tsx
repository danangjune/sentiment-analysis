import React from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

interface SentimentSummaryCardProps {
  title: string;
  value: string;
  change: number;
  icon: 'up' | 'down' | 'neutral';
  color: string;
}

const SentimentSummaryCard: React.FC<SentimentSummaryCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'up':
        return <TrendingUp className={`w-5 h-5 ${color}`} />;
      case 'down':
        return <TrendingDown className={`w-5 h-5 ${color}`} />;
      case 'neutral':
        return <BarChart2 className={`w-5 h-5 ${color}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {getIcon()}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
          {change >= 0 ? '+' : ''}{change}%
          <span className="text-gray-500 ml-1">vs last period</span>
        </p>
      </div>
    </div>
  );
};

export default SentimentSummaryCard;