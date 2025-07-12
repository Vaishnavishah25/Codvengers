import React from 'react';
import { Package, TrendingUp, Clock, Star, Gift, Award, Zap, Trophy } from 'lucide-react';
import { Item } from '../contexts/ItemContext';
import { useAuth } from '../contexts/AuthContext';

interface UserStatsProps {
  userItems: Item[];
}

const UserStats: React.FC<UserStatsProps> = ({ userItems }) => {
  const { user } = useAuth();
  const totalLikes = userItems.reduce((sum, item) => sum + (item.likes || 0), 0);
  const totalViews = userItems.reduce((sum, item) => sum + (item.views || 0), 0);
  const availableItems = userItems.filter(item => item.status === 'available').length;
  const swappedItems = userItems.filter(item => item.status === 'swapped').length;

  const stats = [
    {
      icon: Package,
      label: 'Total Items',
      value: userItems.length,
      color: 'from-blue-500 to-cyan-500',
      description: 'Items uploaded'
    },
    {
      icon: Gift,
      label: 'ReWear Points',
      value: user?.points || 0,
      color: 'from-purple-500 to-pink-500',
      description: 'Available points'
    },
    {
      icon: TrendingUp,
      label: 'Total Swaps',
      value: user?.totalSwaps || 0,
      color: 'from-emerald-500 to-teal-500',
      description: 'Completed swaps'
    },
    {
      icon: Award,
      label: 'Member Level',
      value: user?.level || 'Bronze',
      color: 'from-yellow-500 to-orange-500',
      description: 'Current tier',
      isText: true
    }
  ];

  const achievements = [
    { icon: Star, label: 'First Swap', unlocked: (user?.totalSwaps || 0) >= 1 },
    { icon: Trophy, label: 'Swap Master', unlocked: (user?.totalSwaps || 0) >= 10 },
    { icon: Zap, label: 'Quick Swapper', unlocked: totalLikes >= 50 },
    { icon: Gift, label: 'Point Collector', unlocked: (user?.points || 0) >= 200 }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.isText ? (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stat.value === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                  stat.value === 'Silver' ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {stat.value}
                </span>
              ) : null}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              {!stat.isText && (
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                achievement.unlocked
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}>
                <achievement.icon className="w-4 h-4" />
              </div>
              <p className={`text-sm font-medium ${
                achievement.unlocked ? 'text-emerald-700' : 'text-gray-500'
              }`}>
                {achievement.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{totalViews}</p>
          <p className="text-sm text-gray-600">Total Views</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <p className="text-2xl font-bold text-red-600">{totalLikes}</p>
          <p className="text-sm text-gray-600">Total Likes</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <p className="text-2xl font-bold text-green-600">{availableItems}</p>
          <p className="text-sm text-gray-600">Available</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <p className="text-2xl font-bold text-purple-600">{swappedItems}</p>
          <p className="text-sm text-gray-600">Swapped</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;