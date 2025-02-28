import React from 'react';
import { BarChart3, Bell, Search, Menu, Twitter } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-md hover:bg-gray-100 lg:hidden">
            <Menu className="w-6 h-6 text-gray-500" />
          </button>
          <div className="flex items-center space-x-2">
            <Twitter className="w-7 h-7 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-900">TweetSentiment</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 flex-1 max-w-md mx-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search for tweets, hashtags..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500 flex-1"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1 relative">
            <Bell className="w-6 h-6 text-gray-500" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700 hidden md:inline-block">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;