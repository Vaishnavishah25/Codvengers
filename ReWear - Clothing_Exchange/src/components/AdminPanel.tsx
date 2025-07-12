import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useItems } from '../contexts/ItemContext';
import { Shield, Users, Package, TrendingUp, CheckCircle, XCircle, Eye, Edit, Trash2 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { items } = useItems();
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'users'>('overview');

  // Mock admin check - in a real app, this would be from user roles
  const isAdmin = user?.email === 'admin@rewear.com';

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '1,234',
      change: '+12%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Package,
      label: 'Total Items',
      value: items.length.toString(),
      change: '+8%',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      label: 'Active Swaps',
      value: '89',
      change: '+23%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: CheckCircle,
      label: 'Completed Swaps',
      value: '567',
      change: '+15%',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const pendingItems = items.filter(item => item.status === 'pending');
  const reportedItems = []; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-purple-500 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                <p className="text-gray-600">Manage and monitor the ReWear platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-100 mb-8">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'items', label: 'Item Management', icon: Package },
              { id: 'users', label: 'User Management', icon: Users }
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

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: 'New item uploaded', user: 'Sarah Johnson', time: '2 minutes ago' },
                  { action: 'Swap completed', user: 'Mike Davis', time: '5 minutes ago' },
                  { action: 'User registered', user: 'Emma Wilson', time: '10 minutes ago' },
                  { action: 'Item reported', user: 'Alex Brown', time: '15 minutes ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Items Awaiting Approval</h3>
                  <p className="text-2xl font-bold text-orange-600">{pendingItems.length}</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Reported Items</h3>
                  <p className="text-2xl font-bold text-red-600">{reportedItems.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Item Management</h2>
              <p className="text-gray-600 mt-1">Review and moderate uploaded items</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.slice(0, 10).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-lg object-cover" src={item.image} alt={item.title} />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.uploaderName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-emerald-600 hover:text-emerald-900">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">User Management</h2>
              <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-500 text-center">User management interface would go here...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;