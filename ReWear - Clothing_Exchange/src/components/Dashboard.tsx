import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useItems } from '../contexts/ItemContext';
import { Plus, Search, Filter, Grid, List, TrendingUp, Clock, Heart, Gift, Star, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ItemGrid from './ItemGrid';
import UserStats from './UserStats';
import SwapsList from './SwapsList';
import RedeemPoints from './RedeemPoints';
import SwapRequests from './SwapRequests';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'browse' | 'myItems' | 'swaps' | 'requests' | 'redeem'>('browse');

  const categories = ['all', 'shirts', 'dresses', 'pants', 'jackets', 'accessories', 'shoes'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const userItems = items.filter(item => item.uploaderId === user?.id);

  useEffect(() => {
    // Add entrance animation to dashboard elements
    const elements = document.querySelectorAll('.dashboard-animate');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 100);
    });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-purple-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to access your dashboard</h2>
          <p className="text-gray-600">You need to be authenticated to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="dashboard-animate opacity-0 transform translate-y-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-600">
                  Ready to discover amazing fashion pieces and make sustainable swaps?
                </p>
              </div>
              <Link
                to="/add-item"
                className="mt-4 md:mt-0 bg-gradient-to-r from-emerald-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Item</span>
              </Link>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="dashboard-animate opacity-0 transform translate-y-4 mb-8">
          <UserStats userItems={userItems} />
        </div>

        {/* Tab Navigation */}
        <div className="dashboard-animate opacity-0 transform translate-y-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-100">
            <div className="flex space-x-1">
              {[
                { id: 'browse', label: 'Browse Items', icon: Grid },
                { id: 'myItems', label: 'My Items', icon: Heart },
                { id: 'swaps', label: 'My Swaps', icon: Clock },
                { id: 'requests', label: 'Swap Requests', icon: TrendingUp },
                { id: 'redeem', label: 'Redeem Points', icon: Gift }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'browse' && (
          <>
            {/* Search and Filters */}
            <div className="dashboard-animate opacity-0 transform translate-y-4 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search items by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'text-gray-600 hover:text-emerald-600'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'text-gray-600 hover:text-emerald-600'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="dashboard-animate opacity-0 transform translate-y-4">
              <ItemGrid items={filteredItems} viewMode={viewMode} />
            </div>
          </>
        )}

        {activeTab === 'myItems' && (
          <div className="dashboard-animate opacity-0 transform translate-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">My Listed Items</h2>
              <p className="text-gray-600 mb-4">Manage your uploaded items and track their performance</p>
            </div>
            <ItemGrid items={userItems} viewMode={viewMode} isOwner={true} />
          </div>
        )}

        {activeTab === 'swaps' && (
          <div className="dashboard-animate opacity-0 transform translate-y-4">
            <SwapsList />
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="dashboard-animate opacity-0 transform translate-y-4">
            <SwapRequests />
          </div>
        )}

        {activeTab === 'redeem' && (
          <div className="dashboard-animate opacity-0 transform translate-y-4">
            <RedeemPoints />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;