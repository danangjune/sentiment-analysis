import React, { useState } from 'react';
import { TweetData, DailySentimentData, EngagementData, LanguageDistribution, HourlyActivity } from '../types';

interface CSVProcessorProps {
  onDataProcessed: (data: {
    tweets: TweetData[];
    dailySentiment: DailySentimentData[];
    engagement: EngagementData[];
    languages: LanguageDistribution[];
    hourlyActivity: HourlyActivity[];
  }) => void;
}

const CSVProcessor: React.FC<CSVProcessorProps> = ({ onDataProcessed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processCSV = (file: File) => {
    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        // Map column indices
        const colIndices: Record<string, number> = {};
        headers.forEach((header, index) => {
          colIndices[header.trim()] = index;
        });
        
        // Process tweets
        const tweets: TweetData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',');
          if (values.length !== headers.length) continue;
          
          // Simple sentiment analysis based on text
          const text = values[colIndices['full_text']] || '';
          let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
          
          // Very basic sentiment analysis (would be replaced by actual NLP in production)
          const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'happy', 'thanks'];
          const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'angry', 'disappointed'];
          
          const lowerText = text.toLowerCase();
          const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
          const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
          
          if (positiveCount > negativeCount) sentiment = 'positive';
          else if (negativeCount > positiveCount) sentiment = 'negative';
          
          // Extract date from created_at
          const createdAt = values[colIndices['created_at']] || '';
          const date = createdAt ? new Date(createdAt).toISOString().split('T')[0] : '';
          
          tweets.push({
            conversation_id: values[colIndices['conversation_id']] || '',
            created_at: createdAt,
            date: date,
            favorite_count: parseInt(values[colIndices['favorite_count']] || '0'),
            full_text: text,
            id_str: values[colIndices['id_str']] || '',
            image_url: values[colIndices['image_url']] || '',
            in_reply_to: values[colIndices['in_reply_to']] || '',
            lang: values[colIndices['lang']] || '',
            location: values[colIndices['location']] || '',
            quote_count: parseInt(values[colIndices['quote_count']] || '0'),
            reply_count: parseInt(values[colIndices['reply_count']] || '0'),
            retweet_count: parseInt(values[colIndices['retweet_count']] || '0'),
            tweet_url: values[colIndices['tweet_url']] || '',
            user_id_str: values[colIndices['user_id_str']] || '',
            username: values[colIndices['username']] || '',
            sentiment: sentiment
          });
        }
        
        // Process daily sentiment
        const sentimentByDate: Record<string, { positive: number, negative: number, neutral: number, total: number }> = {};
        tweets.forEach(tweet => {
          if (!tweet.date) return;
          
          if (!sentimentByDate[tweet.date]) {
            sentimentByDate[tweet.date] = { positive: 0, negative: 0, neutral: 0, total: 0 };
          }
          
          sentimentByDate[tweet.date][tweet.sentiment]++;
          sentimentByDate[tweet.date].total++;
        });
        
        const dailySentiment: DailySentimentData[] = Object.keys(sentimentByDate).map(date => ({
          date,
          positive: sentimentByDate[date].positive,
          negative: sentimentByDate[date].negative,
          neutral: sentimentByDate[date].neutral,
          total: sentimentByDate[date].total
        })).sort((a, b) => a.date.localeCompare(b.date));
        
        // Process engagement
        const engagementByDate: Record<string, { favorites: number, retweets: number, replies: number, quotes: number }> = {};
        tweets.forEach(tweet => {
          if (!tweet.date) return;
          
          if (!engagementByDate[tweet.date]) {
            engagementByDate[tweet.date] = { favorites: 0, retweets: 0, replies: 0, quotes: 0 };
          }
          
          engagementByDate[tweet.date].favorites += tweet.favorite_count;
          engagementByDate[tweet.date].retweets += tweet.retweet_count;
          engagementByDate[tweet.date].replies += tweet.reply_count;
          engagementByDate[tweet.date].quotes += tweet.quote_count;
        });
        
        const engagement: EngagementData[] = Object.keys(engagementByDate).map(date => ({
          date,
          favorites: engagementByDate[date].favorites,
          retweets: engagementByDate[date].retweets,
          replies: engagementByDate[date].replies,
          quotes: engagementByDate[date].quotes
        })).sort((a, b) => a.date.localeCompare(b.date));
        
        // Process languages
        const languageCounts: Record<string, number> = {};
        tweets.forEach(tweet => {
          if (!tweet.lang) return;
          
          languageCounts[tweet.lang] = (languageCounts[tweet.lang] || 0) + 1;
        });
        
        const totalTweets = tweets.length;
        const languages: LanguageDistribution[] = Object.keys(languageCounts)
          .map(lang => ({
            language: lang,
            count: languageCounts[lang],
            percentage: (languageCounts[lang] / totalTweets) * 100
          }))
          .sort((a, b) => b.count - a.count);
        
        // Process hourly activity
        const hourlyActivityData: Record<number, number> = {};
        for (let i = 0; i < 24; i++) {
          hourlyActivityData[i] = 0;
        }
        
        tweets.forEach(tweet => {
          if (!tweet.created_at) return;
          
          const hour = new Date(tweet.created_at).getHours();
          hourlyActivityData[hour]++;
        });
        
        const hourlyActivity: HourlyActivity[] = Object.keys(hourlyActivityData).map(hour => ({
          hour: parseInt(hour),
          count: hourlyActivityData[parseInt(hour)]
        })).sort((a, b) => a.hour - b.hour);
        
        onDataProcessed({
          tweets,
          dailySentiment,
          engagement,
          languages,
          hourlyActivity
        });
        
        setIsLoading(false);
      } catch (err) {
        setError('Error processing CSV file. Please check the format and try again.');
        setIsLoading(false);
        console.error(err);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading the file. Please try again.');
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv') {
        setError('Please upload a CSV file.');
        return;
      }
      
      processCSV(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Twitter Data CSV</h2>
      
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">CSV file with Twitter data</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept=".csv" 
            onChange={handleFileUpload}
            disabled={isLoading}
          />
        </label>
      </div>
      
      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">Processing data...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default CSVProcessor;