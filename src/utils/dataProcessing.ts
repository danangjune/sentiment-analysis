import { Tweet, SentimentData, TimeSeriesData, DashboardData } from '../types';
import { format, parseISO } from 'date-fns';

// Simple sentiment analysis based on keywords
// In a real app, you would use a proper NLP service
export function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const positiveWords = ['good', 'great', 'awesome', 'excellent', 'love', 'happy', 'thanks', 'thank', 'best', 'amazing'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'disappointed', 'poor', 'worst', 'horrible'];
  
  const lowerText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
}

export function processTweets(tweets: Tweet[]): DashboardData {
  // Calculate sentiment for each tweet
  const tweetsWithSentiment = tweets.map(tweet => ({
    ...tweet,
    sentiment: analyzeSentiment(tweet.favorite_full_text)
  }));
  
  // Calculate sentiment breakdown
  const sentimentBreakdown: SentimentData = {
    positive: 0,
    negative: 0,
    neutral: 0
  };
  
  tweetsWithSentiment.forEach(tweet => {
    sentimentBreakdown[tweet.sentiment]++;
  });
  
  // Calculate time series data
  const timeSeriesMap = new Map<string, { positive: number, negative: number, neutral: number }>();
  
  tweetsWithSentiment.forEach(tweet => {
    try {
      const date = format(parseISO(tweet.created_at), 'yyyy-MM-dd');
      
      if (!timeSeriesMap.has(date)) {
        timeSeriesMap.set(date, { positive: 0, negative: 0, neutral: 0 });
      }
      
      const dateData = timeSeriesMap.get(date)!;
      dateData[tweet.sentiment]++;
    } catch (error) {
      console.error('Error parsing date:', tweet.created_at);
    }
  });
  
  const timeSeriesData: TimeSeriesData[] = Array.from(timeSeriesMap.entries())
    .map(([date, data]) => ({
      date,
      ...data
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
  
  // Get top tweets by engagement (sum of retweets, quotes, replies, favorites)
  const topTweets = [...tweetsWithSentiment]
    .sort((a, b) => {
      const engagementA = a.retweet_count + a.quote_count + a.reply_count + a.favorite_count;
      const engagementB = b.retweet_count + b.quote_count + b.reply_count + b.favorite_count;
      return engagementB - engagementA;
    })
    .slice(0, 5);
  
  // Calculate total engagement
  const totalEngagement = tweetsWithSentiment.reduce(
    (sum, tweet) => sum + tweet.retweet_count + tweet.quote_count + tweet.reply_count + tweet.favorite_count, 
    0
  );
  
  return {
    tweets: tweetsWithSentiment,
    sentimentBreakdown,
    timeSeriesData,
    topTweets,
    totalTweets: tweets.length,
    totalEngagement,
    averageEngagement: tweets.length > 0 ? totalEngagement / tweets.length : 0
  };
}