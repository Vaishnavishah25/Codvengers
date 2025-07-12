import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Gift, Star, Zap, Crown, ShoppingBag, Coffee, Ticket, Award } from 'lucide-react';

const RedeemPoints: React.FC = () => {
  const { user } = useAuth();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const rewards = [
    {
      id: '1',
      title: 'Free Shipping Voucher',
      description: 'Get free shipping on your next purchase from partner stores',
      points: 50,
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      category: 'Shipping'
    },
    {
      id: '2',
      title: 'Premium Listing Boost',
      description: 'Boost your item listings to appear at the top for 7 days',
      points: 75,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      category: 'Features'
    },
    {
      id: '3',
      title: 'Coffee Shop Gift Card',
      description: '$10 gift card to popular coffee chains',
      points: 100,
      icon: Coffee,
      color: 'from-amber-500 to-yellow-500',
      category: 'Gift Cards'
    },
    {
      id: '4',
      title: 'Fashion Store Discount',
      description: '20% off at partner fashion retailers',
      points: 150,
      icon: Ticket,
      color: 'from-pink-500 to-rose-500',
      category: 'Discounts'
    },
    {
      id: '5',
      title: 'VIP Member Status',
      description: 'Unlock VIP features for 30 days including priority support',
      points: 200,
      icon: Crown,
      color: 'from-purple-500 to-indigo-500',
      category: 'Membership'
    },
    {
      id: '6',
      title: 'Sustainability Certificate',
      description: 'Digital certificate recognizing your eco-friendly contributions',
      points: 250,
      icon: Award,
      color: 'from-emerald-500 to-teal-500',
      category: 'Recognition'
    },
    {
      id: '7',
      title: 'Featured Profile Badge',
      description: 'Get a special badge on your profile for 30 days',
      points: 125,
      icon: Star,
      color: 'from-violet-500 to-purple-500',
      category: 'Profile'
    },
    {
      id: '8',
      title: 'Eco-Warrior Bundle',
      description: 'Sustainable lifestyle products worth $50',
      points: 300,
      icon: Gift,
      color: 'from-green-500 to-emerald-500',
      category: 'Products'
    }
  ];

  const categories = ['All', 'Shipping', 'Features', 'Gift Cards', 'Discounts', 'Membership', 'Recognition', 'Profile', 'Products'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRewards = selectedCategory === 'All' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const handleRedeem = (reward: any) => {
    if (!user || user.points < reward.points) {
      alert('Insufficient points!');
      return;
    }

    setSelectedReward(reward.id);
    // Simulate redemption process
    setTimeout(() => {
      alert(`Successfully redeemed ${reward.title}! Check your email for details.`);
      setSelectedReward(null);
      // In a real app, you would update the user's points here
    }, 2000);
  };

  const pointsHistory = [
    { date: '2024-01-16', action: 'Item Upload', points: '+25', type: 'earned' },
    { date: '2024-01-15', action: 'Successful Swap', points: '+50', type: 'earned' },
    { date: '2024-01-14', action: 'Profile Completion', points: '+20', type: 'earned' },
    { date: '2024-01-13', action: 'Free Shipping Voucher', points: '-50', type: 'redeemed' },
    { date: '2024-01-12', action: 'Daily Login Bonus', points: '+10', type: 'earned' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Redeem Points</h2>
            <p className="text-gray-600">Use your ReWear points to unlock amazing rewards</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-emerald-500 to-purple-500 text-white px-6 py-3 rounded-2xl">
              <p className="text-sm font-medium">Your Points</p>
              <p className="text-2xl font-bold">{user?.points || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Points Level Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Level Progress</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Current: {user?.level}</span>
              <span>Next: {user?.level === 'Bronze' ? 'Silver' : user?.level === 'Silver' ? 'Gold' : 'Platinum'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(((user?.points || 0) % 500) / 500 * 100, 100)}%` 
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {500 - ((user?.points || 0) % 500)} points to next level
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${reward.color} p-3 rounded-xl`}>
                  <reward.icon className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {reward.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">{reward.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{reward.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4 text-emerald-500" />
                  <span className="text-lg font-bold text-emerald-600">{reward.points} pts</span>
                </div>

                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!user || user.points < reward.points || selectedReward === reward.id}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    !user || user.points < reward.points
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : selectedReward === reward.id
                      ? 'bg-orange-500 text-white cursor-wait'
                      : 'bg-gradient-to-r from-emerald-500 to-purple-500 text-white hover:from-emerald-600 hover:to-purple-600 transform hover:scale-105'
                  }`}
                >
                  {selectedReward === reward.id ? 'Redeeming...' : 
                   !user || user.points < reward.points ? 'Insufficient Points' : 'Redeem'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Points History */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Points History</h3>
        <div className="space-y-3">
          {pointsHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  entry.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {entry.type === 'earned' ? (
                    <Gift className="w-4 h-4 text-green-600" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{entry.action}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
              </div>
              <span className={`font-bold ${
                entry.type === 'earned' ? 'text-green-600' : 'text-red-600'
              }`}>
                {entry.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RedeemPoints;