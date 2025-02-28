import React from 'react';
import { TopTweet } from '../types';
import { MessageCircle, Heart, Repeat, Quote } from 'lucide-react';

interface TopTweetCardProps {
  tweet: TopTweet;
}

const TopTweetCard: React.FC<TopTweetCardProps> = ({ tweet }) => {
  const getSentimentColor = () => {
    switch (tweet.sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-bold">{tweet.username.charAt(1).toUpperCase()}</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{tweet.username}</p>
          <p className="text-sm text-gray-500">{formatDate(tweet.date)}</p>
        </div>
        <div className="ml-auto">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor()}`}>
            {tweet.sentiment}
          </span>
        </div>
      </div>
      <p className="text-gray-800 mb-3">{tweet.text}</p>
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4" />
          <span>{Math.floor(tweet.engagement * 0.6)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Repeat className="w-4 h-4" />
          <span>{Math.floor(tweet.engagement * 0.25)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{Math.floor(tweet.engagement * 0.1)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Quote className="w-4 h-4" />
          <span>{Math.floor(tweet.engagement * 0.05)}</span>
        </div>
      </div>
    </div>
  );
};

export default TopTweetCard;