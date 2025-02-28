import React from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Users, 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  LogOut,
  Hash,
  MessageSquare,
  Globe,
  Calendar
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <LineChart className="w-5 h-5" />, label: 'Trends' },
    { icon: <Hash className="w-5 h-5" />, label: 'Hashtags' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Tweets' },
    { icon: <Globe className="w-5 h-5" />, label: 'Locations' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Timeline' },
  ];

  const bottomMenuItems = [
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Help' },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout' },
  ];

  return (
    <aside className="hidden lg:flex flex-col bg-white border-r border-gray-200 w-64 h-screen sticky top-0">
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center p-2 text-base font-normal rounded-lg ${
                  item.active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className={`${item.active ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span className="ml-3">{item.label}</span>
                {item.active && (
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full ml-auto"></span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {bottomMenuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <span className="text-gray-500">{item.icon}</span>
                <span className="ml-3">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;