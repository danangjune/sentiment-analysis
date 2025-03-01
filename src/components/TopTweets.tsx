import React from 'react';
import { Tweet } from '../types';
import { MessageSquare, Repeat, Heart, Quote } from 'lucide-react';

interface TopTweetsProps {
  tweets: Tweet[];
}

const TopTweets: React.FC<TopTweetsProps> = ({ tweets }) => {
  return (
    <div className="h-full overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Top Engaging Tweets</h3>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <a key={tweet.conversation_id_str} href={tweet.tweet_url} target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:bg-gray-50 transition relative">
              {/* Ikon Twitter di pojok kanan atas */}
              <div className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-blue-500 hover:text-blue-600 transition"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.46.38a9.06 9.06 0 0 1-2.87 1.1A4.52 4.52 0 0 0 16.1.14a4.48 4.48 0 0 0-4.46 5.5 12.94 12.94 0 0 1-9.39-4.76 4.48 4.48 0 0 0 1.39 6A4.52 4.52 0 0 1 .88 6.6v.05a4.48 4.48 0 0 0 3.56 4.39 4.5 4.5 0 0 1-2 .08 4.48 4.48 0 0 0 4.19 3.11 9 9 0 0 1-5.6 1.93A8.94 8.94 0 0 1 0 17.88 12.79 12.79 0 0 0 7 20c8.33 0 12.88-6.88 12.88-12.88 0-.2 0-.4-.01-.6A9.2 9.2 0 0 0 23 3z" />
                </svg>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {tweet.image_url ? (
                    <img src={tweet.image_url} alt={tweet.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-sm font-semibold">{tweet.username.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">{tweet.username}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(tweet.created_at).toLocaleDateString()} · {tweet.location || 'Unknown location'}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">{tweet.full_text}</p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center">
                  <MessageSquare size={16} className="mr-1" />
                  <span>{tweet.reply_count}</span>
                </div>
                <div className="flex items-center">
                  <Repeat size={16} className="mr-1" />
                  <span>{tweet.retweet_count}</span>
                </div>
                <div className="flex items-center">
                  <Heart size={16} className="mr-1" />
                  <span>{tweet.favorite_count}</span>
                </div>
                <div className="flex items-center">
                  <Quote size={16} className="mr-1" />
                  <span>{tweet.quote_count}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopTweets;