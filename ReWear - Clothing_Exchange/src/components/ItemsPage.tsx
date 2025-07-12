import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useItems } from '../contexts/ItemContext';
import { Search, Filter, Grid, List, Heart, Eye, Calendar, User, MessageCircle, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ItemsPage: React.FC = () => {
  const { user } = useAuth();
  const { items, swapRequests, createSwapRequest, updateSwapRequest } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedUserItem, setSelectedUserItem] = useState<string>('');
  const [swapMessage, setSwapMessage] = useState('');

  const categories = ['all', 'shirts', 'dresses', 'pants', 'jackets', 'accessories', 'shoes'];

  // Filter available items (excluding user's own items)
  const availableItems = items.filter(item => 
    item.status === 'available' && 
    item.uploaderId !== user?.id &&
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || item.category === selectedCategory)
  );

  const userItems = items.filter(item => 
    item.uploaderId === user?.id && 
    item.status === 'available'
  );

  // Get pending swap requests for current user
  const pendingSwaps = swapRequests.filter(request => 
    (request.fromUserId === user?.id || request.toUserId === user?.id) && 
    request.status === 'pending'
  );

  const handleSwapRequest = (item: any) => {
    if (!user) {
      alert('Please log in to request a swap');
      return;
    }
    setSelectedItem(item);
    setShowSwapModal(true);
  };

  const handleSubmitSwap = () => {
    if (!selectedUserItem || !selectedItem) {
      alert('Please select an item to swap');
      return;
    }

    createSwapRequest(selectedUserItem, selectedItem.id, swapMessage);
    setShowSwapModal(false);
    setSelectedUserItem('');
    setSwapMessage('');
    setSelectedItem(null);
    alert('Swap request sent successfully!');
  };

  const handleConfirmSwap = (requestId: string) => {
    updateSwapRequest(requestId, 'accepted');
    alert('Swap confirmed! You earned 50 points!');
  };

  const handleRejectSwap = (requestId: string) => {
    updateSwapRequest(requestId, 'rejected');
    alert('Swap request rejected.');
  };

  const getItemById = (itemId: string) => {
    return items.find(item => item.id === itemId);
  };

  useEffect(() => {
    // Add entrance animation
    const elements = document.querySelectorAll('.items-animate');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 100);
    });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view items</h2>
          <p className="text-gray-600">You need to be authenticated to browse and swap items.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="items-animate opacity-0 transform translate-y-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Items</h1>
            <p className="text-gray-600">Discover amazing fashion pieces and request swaps with other users</p>
          </div>
        </div>

        {/* Pending Swaps Section */}
        {pendingSwaps.length > 0 && (
          <div className="items-animate opacity-0 transform translate-y-4 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-orange-500" />
                Pending Swap Confirmations ({pendingSwaps.length})
              </h2>
              <div className="space-y-4">
                {pendingSwaps.map((request) => {
                  const fromItem = getItemById(request.fromItemId);
                  const toItem = getItemById(request.toItemId);
                  const isIncoming = request.toUserId === user?.id;
                  
                  if (!fromItem || !toItem) return null;

                  return (
                    <div key={request.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={isIncoming ? fromItem.image : toItem.image}
                              alt={isIncoming ? fromItem.title : toItem.title}
                              className="w-16 h-16 object-cover rounded-xl"
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {isIncoming ? 'They Offer' : 'You Want'}
                              </p>
                              <p className="text-sm text-gray-600">
                                {isIncoming ? fromItem.title : toItem.title}
                              </p>
                            </div>
                          </div>

                          <ArrowRight className="w-5 h-5 text-gray-400" />

                          <div className="flex items-center space-x-3">
                            <img
                              src={isIncoming ? toItem.image : fromItem.image}
                              alt={isIncoming ? toItem.title : fromItem.title}
                              className="w-16 h-16 object-cover rounded-xl"
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {isIncoming ? 'For Your' : 'You Offer'}
                              </p>
                              <p className="text-sm text-gray-600">
                                {isIncoming ? toItem.title : fromItem.title}
                              </p>
                            </div>
                          </div>
                        </div>

                        {isIncoming && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleConfirmSwap(request.id)}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center space-x-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Confirm</span>
                            </button>
                            <button
                              onClick={() => handleRejectSwap(request.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center space-x-1"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}

                        {!isIncoming && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                            Awaiting Response
                          </span>
                        )}
                      </div>

                      {request.message && (
                        <div className="mt-3 p-3 bg-white rounded-lg">
                          <p className="text-sm text-gray-700 flex items-start space-x-2">
                            <MessageCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                            <span>{request.message}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="items-animate opacity-0 transform translate-y-4 mb-8">
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
        <div className="items-animate opacity-0 transform translate-y-4">
          {availableItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="text-gray-400 mb-4">
                <Heart className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
              <p className="text-gray-500">
                No items match your search criteria. Try adjusting your filters.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={`/item/${item.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          Available
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>Size {item.size}</span>
                        <span className="capitalize">{item.condition}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{item.views || 0}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-400 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="px-6 pb-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSwapRequest(item);
                      }}
                      className="w-full bg-gradient-to-r from-emerald-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Request Swap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="space-y-1">
                {availableItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-300 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <Link to={`/item/${item.id}`} className="flex items-center space-x-6 flex-1">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-xl"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">
                              {item.category}
                            </span>
                            <span>Size {item.size}</span>
                            <span>{item.condition}</span>
                          </div>
                        </div>
                      </Link>
                      
                      <button
                        onClick={() => handleSwapRequest(item)}
                        className="ml-4 bg-gradient-to-r from-emerald-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-purple-600 transition-all duration-300"
                      >
                        Request Swap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Swap Modal */}
        {showSwapModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-emerald-500" />
                Request Swap with {selectedItem.uploaderName}
              </h3>
              <p className="text-gray-600 mb-4">
                Send a swap request for "{selectedItem.title}"
              </p>
              
              {/* Select Your Item */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Select an item to swap:</h4>
                {userItems.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">You don't have any available items to swap.</p>
                    <Link
                      to="/add-item"
                      className="inline-block bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Add an Item
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {userItems.map((userItem) => (
                      <div
                        key={userItem.id}
                        onClick={() => setSelectedUserItem(userItem.id)}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedUserItem === userItem.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={userItem.image}
                            alt={userItem.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{userItem.title}</p>
                            <p className="text-sm text-gray-500">{userItem.category} • Size {userItem.size}</p>
                            <p className="text-sm text-emerald-600 font-medium">{userItem.swapValue} pts</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <textarea
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                placeholder="Add a message (optional)..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 mb-4"
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowSwapModal(false);
                    setSelectedItem(null);
                    setSelectedUserItem('');
                    setSwapMessage('');
                  }}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitSwap}
                  disabled={!selectedUserItem}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    selectedUserItem
                      ? 'bg-gradient-to-r from-emerald-500 to-purple-500 text-white hover:from-emerald-600 hover:to-purple-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsPage;