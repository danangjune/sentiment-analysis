import React, { useState } from 'react';
import DataProcessor from './DataProcessor';
import DailySentimentChart from './DailySentimentChart';
import EngagementChart from './EngagementChart';
import LanguageDistributionChart from './LanguageDistributionChart';
import HourlyActivityChart from './HourlyActivityChart';
import TopTweetCard from './TopTweetCard';
import SentimentSummaryCard from './SentimentSummaryCard';
import { 
  TweetData, 
  DailySentimentData, 
  EngagementData, 
  LanguageDistribution, 
  HourlyActivity,
  TopTweet
} from '../types';
import { 
  dailySentimentData as mockDailySentimentData,
  engagementData as mockEngagementData,
  languageDistribution as mockLanguageDistribution,
  hourlyActivity as mockHourlyActivity,
  topTweets as mockTopTweets
} from '../data/mockData';

const TwitterDataDashboard: React.FC = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [dailySentimentData, setDailySentimentData] = useState<DailySentimentData[]>(mockDailySentimentData);
  const [engagementData, setEngagementData] = useState<EngagementData[]>(mockEngagementData);
  const [languageDistribution, setLanguageDistribution] = useState<LanguageDistribution[]>(mockLanguageDistribution);
  const [hourlyActivity, setHourlyActivity] = useState<HourlyActivity[]>(mockHourlyActivity);
  const [topTweets, setTopTweets] = useState<TopTweet[]>(mockTopTweets);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleDataLoaded = (data: {
    tweets: TweetData[];
    dailySentiment: DailySentimentData[];
    engagement: EngagementData[];
    languages: LanguageDistribution[];
    hourlyActivity: HourlyActivity[];
  }) => {
    setTweets(data.tweets);
    setDailySentimentData(data.dailySentiment);
    setEngagementData(data.engagement);
    setLanguageDistribution(data.languages);
    setHourlyActivity(data.hourlyActivity);
    
    // Find top tweets based on engagement
    const sortedTweets = [...data.tweets].sort((a, b) => {
      const engagementA = a.favorite_count + a.retweet_count + a.reply_count + a.quote_count;
      const engagementB = b.favorite_count + b.retweet_count + b.reply_count + b.quote_count;
      return engagementB - engagementA;
    });
    
    const newTopTweets: TopTweet[] = sortedTweets.slice(0, 5).map(tweet => ({
      id: tweet.id_str,
      text: tweet.full_text,
      username: tweet.username,
      engagement: tweet.favorite_count + tweet.retweet_count + tweet.reply_count + tweet.quote_count,
      sentiment: tweet.sentiment,
      date: tweet.date
    }));
    
    setTopTweets(newTopTweets);
    setDataLoaded(true);
  };

  // Calculate total tweets
  const totalTweets = dailySentimentData.reduce((sum, day) => sum + day.total, 0);
  
  // Calculate average sentiment
  const totalPositive = dailySentimentData.reduce((sum, day) => sum + day.positive, 0);
  const positivePercentage = Math.round((totalPositive / totalTweets) * 100);
  
  // Calculate engagement metrics
  const totalEngagement = engagementData.reduce((sum, day) => 
    sum + day.favorites + day.retweets + day.replies + day.quotes, 0);
  
  // Calculate day-over-day changes
  const lastDayIndex = dailySentimentData.length - 1;
  const previousDayIndex = lastDayIndex - 1;
  
  const sentimentChange = previousDayIndex >= 0 
    ? ((dailySentimentData[lastDayIndex].positive / dailySentimentData[lastDayIndex].total) - 
       (dailySentimentData[previousDayIndex].positive / dailySentimentData[previousDayIndex].total)) * 100
    : 0;
  
  const volumeChange = previousDayIndex >= 0
    ? ((dailySentimentData[lastDayIndex].total - dailySentimentData[previousDayIndex].total) / 
        dailySentimentData[previousDayIndex].total) * 100
    : 0;
  
  const engagementChange = previousDayIndex >= 0
    ? (((engagementData[lastDayIndex].favorites + engagementData[lastDayIndex].retweets + 
         engagementData[lastDayIndex].replies + engagementData[lastDayIndex].quotes) - 
        (engagementData[previousDayIndex].favorites + engagementData[previousDayIndex].retweets + 
         engagementData[previousDayIndex].replies + engagementData[previousDayIndex].quotes)) / 
       (engagementData[previousDayIndex].favorites + engagementData[previousDayIndex].retweets + 
        engagementData[previousDayIndex].replies + engagementData[previousDayIndex].quotes)) * 100
    : 0;

  return (
    <div>
      <DataProcessor onDataLoaded={handleDataLoaded} />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SentimentSummaryCard 
          title="Positive Sentiment" 
          value={`${positivePercentage}%`} 
          change={parseFloat(sentimentChange.toFixed(1))} 
          icon={sentimentChange >= 0 ? "up" : "down"} 
          color="text-green-500" 
        />
        <SentimentSummaryCard 
          title="Total Tweets" 
          value={totalTweets.toLocaleString()} 
          change={parseFloat(volumeChange.toFixed(1))} 
          icon={volumeChange >= 0 ? "up" : "down"} 
          color="text-blue-500" 
        />
        <SentimentSummaryCard 
          title="Total Engagement" 
          value={totalEngagement.toLocaleString()} 
          change={parseFloat(engagementChange.toFixed(1))} 
          icon={engagementChange >= 0 ? "up" : "down"} 
          color="text-purple-500" 
        />
        <SentimentSummaryCard 
          title="Languages" 
          value={languageDistribution.length.toString()} 
          change={0} 
          icon="neutral" 
          color="text-indigo-500" 
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Sentiment Trend</h2>
          <div className="h-80">
            <DailySentimentChart data={dailySentimentData} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Engagement Metrics</h2>
          <div className="h-80">
            <EngagementChart data={engagementData} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Language Distribution</h2>
          <div className="flex justify-center h-72">
            <LanguageDistributionChart data={languageDistribution} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Hourly Tweet Activity</h2>
          <div className="h-72">
            <HourlyActivityChart data={hourlyActivity} />
          </div>
        </div>
      </div>

      {/* Top Tweets */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Tweets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTweets.map((tweet, index) => (
            <TopTweetCard key={index} tweet={tweet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwitterDataDashboard;