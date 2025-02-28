import React, { useState } from 'react';
import CSVProcessor from './CSVProcessor';
import { TweetData, DailySentimentData, EngagementData, LanguageDistribution, HourlyActivity } from '../types';

interface DataProcessorProps {
  onDataLoaded: (data: {
    tweets: TweetData[];
    dailySentiment: DailySentimentData[];
    engagement: EngagementData[];
    languages: LanguageDistribution[];
    hourlyActivity: HourlyActivity[];
  }) => void;
}

const DataProcessor: React.FC<DataProcessorProps> = ({ onDataLoaded }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);

  const handleDataProcessed = (data: {
    tweets: TweetData[];
    dailySentiment: DailySentimentData[];
    engagement: EngagementData[];
    languages: LanguageDistribution[];
    hourlyActivity: HourlyActivity[];
  }) => {
    setIsProcessing(false);
    setProcessingComplete(true);
    onDataLoaded(data);
  };

  return (
    <div className="mb-6">
      <CSVProcessor onDataProcessed={handleDataProcessed} />
      
      {processingComplete && (
        <div className="bg-green-100 p-4 rounded-lg text-green-800 mb-6">
          <p className="font-medium">Data processing complete!</p>
          <p className="text-sm mt-1">Your Twitter data has been processed and the dashboard has been updated.</p>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Processing Instructions</h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            This dashboard is designed to analyze Twitter data from a CSV file. The CSV should contain the following columns:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>conversation_id</li>
            <li>created_at (timestamp)</li>
            <li>favorite_count</li>
            <li>full_text</li>
            <li>id_str</li>
            <li>image_url</li>
            <li>in_reply_to</li>
            <li>lang</li>
            <li>location</li>
            <li>quote_count</li>
            <li>reply_count</li>
            <li>retweet_count</li>
            <li>tweet_url</li>
            <li>user_id_str</li>
            <li>username</li>
          </ul>
          
          <p className="mt-4">
            The dashboard will automatically:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Process the CSV data</li>
            <li>Perform basic sentiment analysis on tweet text</li>
            <li>Aggregate data by date for trend analysis</li>
            <li>Calculate engagement metrics</li>
            <li>Analyze language distribution</li>
            <li>Track hourly tweet activity</li>
          </ol>
          
          <p className="mt-4">
            For best results, provide data from the past week with timestamps in ISO format.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataProcessor;