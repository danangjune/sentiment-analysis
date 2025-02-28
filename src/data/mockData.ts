import { 
  SentimentData, 
  StockRecommendation, 
  AnalystRating, 
  TopAnalyst, 
  SectorSentiment, 
  PriceTarget,
  DailySentimentData,
  EngagementData,
  TopTweet,
  LanguageDistribution,
  HourlyActivity
} from '../types';

export const sentimentTrendData: SentimentData[] = [
  { date: 'Jan', positive: 65, neutral: 25, negative: 10 },
  { date: 'Feb', positive: 60, neutral: 30, negative: 10 },
  { date: 'Mar', positive: 70, neutral: 20, negative: 10 },
  { date: 'Apr', positive: 55, neutral: 30, negative: 15 },
  { date: 'May', positive: 50, neutral: 35, negative: 15 },
  { date: 'Jun', positive: 45, neutral: 35, negative: 20 },
  { date: 'Jul', positive: 55, neutral: 30, negative: 15 },
  { date: 'Aug', positive: 70, neutral: 20, negative: 10 },
  { date: 'Sep', positive: 75, neutral: 15, negative: 10 },
  { date: 'Oct', positive: 80, neutral: 15, negative: 5 },
  { date: 'Nov', positive: 85, neutral: 10, negative: 5 },
  { date: 'Dec', positive: 75, neutral: 15, negative: 10 },
];

export const stockRecommendations: StockRecommendation[] = [
  { name: 'AAPL', buy: 75, hold: 20, sell: 5 },
  { name: 'MSFT', buy: 80, hold: 15, sell: 5 },
  { name: 'GOOGL', buy: 70, hold: 25, sell: 5 },
  { name: 'AMZN', buy: 65, hold: 30, sell: 5 },
  { name: 'META', buy: 60, hold: 30, sell: 10 },
  { name: 'TSLA', buy: 50, hold: 30, sell: 20 },
];

export const analystRatingData: AnalystRating[] = [
  { name: 'Strong Buy', value: 45, color: '#22c55e' },
  { name: 'Buy', value: 30, color: '#84cc16' },
  { name: 'Hold', value: 15, color: '#facc15' },
  { name: 'Sell', value: 7, color: '#f97316' },
  { name: 'Strong Sell', value: 3, color: '#ef4444' },
];

export const topAnalysts: TopAnalyst[] = [
  { 
    name: 'Sarah Johnson', 
    company: 'Morgan Stanley', 
    accuracy: 92, 
    sentiment: 'bullish',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    name: 'Michael Chen', 
    company: 'Goldman Sachs', 
    accuracy: 89, 
    sentiment: 'bullish',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    name: 'David Williams', 
    company: 'JP Morgan', 
    accuracy: 87, 
    sentiment: 'neutral',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    name: 'Emily Rodriguez', 
    company: 'Bank of America', 
    accuracy: 85, 
    sentiment: 'bearish',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
];

export const sectorSentimentData: SectorSentiment[] = [
  { name: 'Technology', value: 75, color: '#3b82f6' },
  { name: 'Healthcare', value: 65, color: '#06b6d4' },
  { name: 'Finance', value: 60, color: '#6366f1' },
  { name: 'Consumer', value: 55, color: '#8b5cf6' },
  { name: 'Energy', value: 40, color: '#ec4899' },
  { name: 'Utilities', value: 45, color: '#f43f5e' },
];

export const priceTargetData: PriceTarget[] = [
  { date: 'Jan', target: 150, actual: 145 },
  { date: 'Feb', target: 155, actual: 152 },
  { date: 'Mar', target: 160, actual: 158 },
  { date: 'Apr', target: 165, actual: 160 },
  { date: 'May', target: 170, actual: 165 },
  { date: 'Jun', target: 175, actual: 172 },
  { date: 'Jul', target: 180, actual: 178 },
  { date: 'Aug', target: 185, actual: 182 },
  { date: 'Sep', target: 190, actual: 188 },
  { date: 'Oct', target: 195, actual: 192 },
  { date: 'Nov', target: 200, actual: 198 },
  { date: 'Dec', target: 205, actual: 200 },
];

// New Twitter data for the past week
export const dailySentimentData: DailySentimentData[] = [
  { date: '2025-06-01', positive: 245, negative: 78, neutral: 132, total: 455 },
  { date: '2025-06-02', positive: 312, negative: 92, neutral: 156, total: 560 },
  { date: '2025-06-03', positive: 278, negative: 105, neutral: 142, total: 525 },
  { date: '2025-06-04', positive: 356, negative: 87, neutral: 178, total: 621 },
  { date: '2025-06-05', positive: 289, negative: 112, neutral: 145, total: 546 },
  { date: '2025-06-06', positive: 342, negative: 95, neutral: 163, total: 600 },
  { date: '2025-06-07', positive: 387, negative: 76, neutral: 187, total: 650 },
];

export const engagementData: EngagementData[] = [
  { date: '2025-06-01', favorites: 1245, retweets: 432, replies: 287, quotes: 156 },
  { date: '2025-06-02', favorites: 1567, retweets: 523, replies: 342, quotes: 187 },
  { date: '2025-06-03', favorites: 1342, retweets: 478, replies: 312, quotes: 165 },
  { date: '2025-06-04', favorites: 1876, retweets: 645, replies: 423, quotes: 234 },
  { date: '2025-06-05', favorites: 1543, retweets: 512, replies: 356, quotes: 178 },
  { date: '2025-06-06', favorites: 1687, retweets: 587, replies: 389, quotes: 203 },
  { date: '2025-06-07', favorites: 2134, retweets: 723, replies: 456, quotes: 267 },
];

export const topTweets: TopTweet[] = [
  {
    id: '1401234567890123456',
    text: 'Just announced our new product line that will revolutionize the industry! #innovation #technology',
    username: '@techcompany',
    engagement: 3456,
    sentiment: 'positive',
    date: '2025-06-07'
  },
  {
    id: '1401234567890123457',
    text: 'We are excited to partner with @othercompany to bring new solutions to our customers. Stay tuned for more details!',
    username: '@marketleader',
    engagement: 2987,
    sentiment: 'positive',
    date: '2025-06-06'
  },
  {
    id: '1401234567890123458',
    text: 'Our quarterly results are in and we have exceeded expectations. Thanks to our amazing team and loyal customers!',
    username: '@financialcorp',
    engagement: 2654,
    sentiment: 'positive',
    date: '2025-06-05'
  },
  {
    id: '1401234567890123459',
    text: 'We apologize for the service disruption earlier today. Our team has resolved the issue and everything is back to normal.',
    username: '@serviceprovider',
    engagement: 1876,
    sentiment: 'negative',
    date: '2025-06-04'
  },
  {
    id: '1401234567890123460',
    text: 'Interesting market developments today. What are your thoughts on the recent regulatory changes?',
    username: '@industryanalyst',
    engagement: 1543,
    sentiment: 'neutral',
    date: '2025-06-03'
  }
];

export const languageDistribution: LanguageDistribution[] = [
  { language: 'English (en)', count: 2345, percentage: 62.5 },
  { language: 'Spanish (es)', count: 567, percentage: 15.1 },
  { language: 'Japanese (ja)', count: 234, percentage: 6.2 },
  { language: 'Portuguese (pt)', count: 198, percentage: 5.3 },
  { language: 'French (fr)', count: 156, percentage: 4.2 },
  { language: 'German (de)', count: 123, percentage: 3.3 },
  { language: 'Others', count: 134, percentage: 3.4 }
];

export const hourlyActivity: HourlyActivity[] = [
  { hour: 0, count: 87 },
  { hour: 1, count: 65 },
  { hour: 2, count: 43 },
  { hour: 3, count: 32 },
  { hour: 4, count: 28 },
  { hour: 5, count: 35 },
  { hour: 6, count: 56 },
  { hour: 7, count: 98 },
  { hour: 8, count: 156 },
  { hour: 9, count: 234 },
  { hour: 10, count: 287 },
  { hour: 11, count: 312 },
  { hour: 12, count: 345 },
  { hour: 13, count: 367 },
  { hour: 14, count: 389 },
  { hour: 15, count: 412 },
  { hour: 16, count: 378 },
  { hour: 17, count: 345 },
  { hour: 18, count: 312 },
  { hour: 19, count: 287 },
  { hour: 20, count: 256 },
  { hour: 21, count: 198 },
  { hour: 22, count: 156 },
  { hour: 23, count: 123 }
];