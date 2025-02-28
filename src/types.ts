export interface SentimentData {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface StockRecommendation {
  name: string;
  buy: number;
  hold: number;
  sell: number;
}

export interface AnalystRating {
  name: string;
  value: number;
  color: string;
}

export interface TopAnalyst {
  name: string;
  company: string;
  accuracy: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  avatar: string;
}

export interface SectorSentiment {
  name: string;
  value: number;
  color: string;
}

export interface PriceTarget {
  date: string;
  target: number;
  actual: number;
}

export interface TweetData {
  conversation_id: string;
  created_at: string;
  date: string;
  favorite_count: number;
  full_text: string;
  id_str: string;
  image_url: string;
  in_reply_to: string;
  lang: string;
  location: string;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  tweet_url: string;
  user_id_str: string;
  username: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface DailySentimentData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export interface EngagementData {
  date: string;
  favorites: number;
  retweets: number;
  replies: number;
  quotes: number;
}

export interface TopTweet {
  id: string;
  text: string;
  username: string;
  engagement: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
}

export interface LanguageDistribution {
  language: string;
  count: number;
  percentage: number;
}

export interface HourlyActivity {
  hour: number;
  count: number;
}