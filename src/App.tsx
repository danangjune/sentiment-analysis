import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TwitterDataDashboard from './components/TwitterDataDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Twitter Sentiment Dashboard</h1>
            <p className="text-gray-600">Analysis of tweets from the past week</p>
          </div>

          <TwitterDataDashboard />
        </main>
      </div>
    </div>
  );
}

export default App;