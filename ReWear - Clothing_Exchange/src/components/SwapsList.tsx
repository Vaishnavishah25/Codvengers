import React from 'react';
import { Clock, CheckCircle, XCircle, User, Calendar } from 'lucide-react';

const SwapsList: React.FC = () => {
  // Mock data for swaps
  const swaps = [
    {
      id: '1',
      type: 'outgoing',
      status: 'pending',
      myItem: { title: 'Vintage Denim Jacket', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
      theirItem: { title: 'Elegant Evening Dress', image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg' },
      user: { name: 'Sarah Johnson' },
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'incoming',
      status: 'approved',
      myItem: { title: 'Designer Handbag', image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg' },
      theirItem: { title: 'Casual Summer Top', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' },
      user: { name: 'Emma Wilson' },
      createdAt: '2024-01-12T14:20:00Z'
    },
    {
      id: '3',
      type: 'outgoing',
      status: 'rejected',
      myItem: { title: 'Wool Winter Coat', image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg' },
      theirItem: { title: 'Stylish Sneakers', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
      user: { name: 'Mike Davis' },
      createdAt: '2024-01-10T09:15:00Z'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Swaps</h2>
        <p className="text-gray-600 mb-6">Track your ongoing and completed exchanges</p>
      </div>

      {swaps.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No swaps yet</h3>
          <p className="text-gray-500">
            Start browsing items to make your first swap!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {swaps.map((swap) => (
            <div
              key={swap.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(swap.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {swap.type === 'outgoing' ? 'Swap Request Sent' : 'Swap Request Received'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {swap.type === 'outgoing' ? `To ${swap.user.name}` : `From ${swap.user.name}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(swap.status)}`}>
                      {swap.status}
                    </span>
                    <div className="text-xs text-gray-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(swap.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* My Item */}
                    <div className="flex items-center space-x-3">
                      <img
                        src={swap.myItem.image}
                        alt={swap.myItem.title}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Your Item</p>
                        <p className="text-sm text-gray-600">{swap.myItem.title}</p>
                      </div>
                    </div>

                    {/* Exchange Arrow */}
                    <div className="flex items-center space-x-2 text-gray-400">
                      <div className="w-8 h-px bg-gray-300"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="w-8 h-px bg-gray-300"></div>
                    </div>

                    {/* Their Item */}
                    <div className="flex items-center space-x-3">
                      <img
                        src={swap.theirItem.image}
                        alt={swap.theirItem.title}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Their Item</p>
                        <p className="text-sm text-gray-600">{swap.theirItem.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {swap.status === 'pending' && (
                    <div className="flex items-center space-x-2">
                      {swap.type === 'incoming' ? (
                        <>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                            Accept
                          </button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                            Decline
                          </button>
                        </>
                      ) : (
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwapsList;