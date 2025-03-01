export interface Tweet {
  conversation_id_str: string;
  created_at: string;
  favorite_full_text: string;
  favorite_count: number;
  user_id_str: string;
  username: string;
  image_url?: string;
  in_reply_to_screen_name?: string;
  lang: string;
  location?: string;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  tweet_url: string;
  sentiment?: 'positive' | 'negative' | 'neutral'; // Optional as it might be calculated by backend
}

export interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
}

export interface TimeSeriesData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface DashboardData {
  tweets: Tweet[];
  sentimentBreakdown: SentimentData;
  timeSeriesData: TimeSeriesData[];
  topTweets: Tweet[];
  totalTweets: number;
  totalEngagement: number;
  averageEngagement: number;
}

// You might want to add these interfaces for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface FileUploadResponse {
  fileId: string;
  status: 'processing' | 'completed' | 'failed';
  message?: string;
}