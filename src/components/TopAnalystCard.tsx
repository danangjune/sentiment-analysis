import React from 'react';
import { TopAnalyst } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TopAnalystCardProps {
  analyst: TopAnalyst;
}

const TopAnalystCard: React.FC<TopAnalystCardProps> = ({ analyst }) => {
  const getSentimentIcon = () => {
    switch (analyst.sentiment) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'neutral':
        return <Minus className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getSentimentColor = () => {
    switch (analyst.sentiment) {
      case 'bullish':
        return 'bg-green-100 text-green-800';
      case 'bearish':
        return 'bg-red-100 text-red-800';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <img
        src={analyst.avatar}
        alt={analyst.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{analyst.name}</h3>
        <p className="text-sm text-gray-500">{analyst.company}</p>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-700">Accuracy:</span>
          <span className="text-sm font-bold text-blue-600">{analyst.accuracy}%</span>
        </div>
        <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getSentimentColor()}`}>
          {getSentimentIcon()}
          <span className="ml-1 capitalize">{analyst.sentiment}</span>
        </div>
      </div>
    </div>
  );
};

export default TopAnalystCard;