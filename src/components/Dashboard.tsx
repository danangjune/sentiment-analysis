import React, { useState, useEffect } from 'react';
import { DashboardData } from '../types';
import SentimentDonut from './SentimentDonut';
import TimeSeriesChart from './TimeSeriesChart';
import TopTweets from './TopTweets';
import StatCard from './StatCard';
import { MessageCircle, TrendingUp, BarChart3, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tanggalMulai, setTanggalMulai] = useState<string>("");
  const [tanggalAkhir, setTanggalAkhir] = useState<string>("");
  const handleAnalyze = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/crawl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: searchQuery,
          startDate: tanggalMulai,
          endDate: tanggalAkhir,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Gagal melakukan analisa data");
      }
  
      console.log("Analisis berhasil dimulai");
      window.location.reload(); // Reload setelah submit
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
  
        const response = await fetch('http://127.0.0.1:5000/api/sentiment/summary');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        let data = await response.json();
  
        // Pastikan tidak ada NaN dalam response API
        const cleanData = (obj: any) => {
          if (Array.isArray(obj)) {
            return obj.map(cleanData);
          } else if (typeof obj === 'object' && obj !== null) {
            return Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [key, cleanData(value)])
            );
          } else if (typeof obj === 'number' && isNaN(obj)) {
            return null; // Ganti NaN dengan null
          }
          return obj;
        };
  
        const sanitizedData = cleanData(data);
  
        console.log("Cleaned API Response:", sanitizedData); // Debugging response yang bersih
        setDashboardData(sanitizedData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);
  

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error || 'Failed to load dashboard data'}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { 
    sentimentBreakdown, 
    timeSeriesData, 
    topTweets, 
    totalTweets, 
    totalEngagement,
    averageEngagement 
  } = dashboardData;

  const positivePercentage = Math.round(
    (sentimentBreakdown.positive / totalTweets) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Twitter Data Dashboard</h1>
          <p className="text-gray-600">
            Analysis of {totalTweets} tweets with sentiment and engagement metrics
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input 
            type="text" 
            placeholder="Cari tweet..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <input 
            type="date"
            value={tanggalAkhir}
            onChange={(e) => setTanggalAkhir(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <button 
            onClick={handleAnalyze}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Mulai Analisa
          </button>
        </div>
      </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Tweets" 
            value={totalTweets} 
            icon={MessageCircle} 
            color="bg-blue-500" 
          />
          <StatCard 
            title="Positive Sentiment" 
            value={`${positivePercentage}%`} 
            icon={TrendingUp} 
            color="bg-green-500" 
          />
          <StatCard 
            title="Total Engagement" 
            value={totalEngagement.toLocaleString()} 
            icon={BarChart3} 
            color="bg-purple-500" 
          />
          <StatCard 
            title="Avg. Engagement" 
            value={averageEngagement.toFixed(1)} 
            icon={Users} 
            color="bg-orange-500" 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <SentimentDonut data={sentimentBreakdown} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TimeSeriesChart data={timeSeriesData} />
          </div>
        </div>

        {/* Top Tweets Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TopTweets tweets={topTweets} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;