import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useItems, Item } from '../contexts/ItemContext';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Eye, MapPin, Calendar, User, ArrowLeft, Share2, Flag, MessageCircle, Repeat, Gift } from 'lucide-react';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items, createSwapRequest } = useItems();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedUserItem, setSelectedUserItem] = useState<string>('');
  const [swapMessage, setSwapMessage] = useState('');

  const item = items.find(item => item.id === id);
  const userItems = items.filter(item => item.uploaderId === user?.id && item.status === 'available');

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Item not found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-purple-600 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Update item likes in context
  };

  const handleSwapRequest = () => {
    if (!user) {
      alert('Please log in to request a swap');
      return;
    }
    setShowSwapModal(true);
  };

  const handleSubmitSwap = () => {
    if (!selectedUserItem) {
      alert('Please select an item to swap');
      return;
    }

    createSwapRequest(selectedUserItem, item.id, swapMessage);
    setShowSwapModal(false);
    setSelectedUserItem('');
    setSwapMessage('');
    alert('Swap request sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Image Gallery (placeholder for multiple images) */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg border-2 border-transparent hover:border-emerald-500 transition-colors cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} ${index}`}
                    className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-2">
                    {item.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views || 0} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isLiked
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-700 mb-1">Size</h4>
                  <p className="text-lg font-semibold text-gray-800">{item.size}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-700 mb-1">Condition</h4>
                  <p className="text-lg font-semibold text-gray-800 capitalize">{item.condition}</p>
                </div>
                {item.brand && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-700 mb-1">Brand</h4>
                    <p className="text-lg font-semibold text-gray-800">{item.brand}</p>
                  </div>
                )}
              </div>

              {/* Value Information */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {item.originalPrice && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <h4 className="font-medium text-emerald-700 mb-1">Original Price</h4>
                    <p className="text-lg font-semibold text-emerald-800">${item.originalPrice}</p>
                  </div>
                )}
                {item.swapValue && (
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <h4 className="font-medium text-purple-700 mb-1">Swap Value</h4>
                    <p className="text-lg font-semibold text-purple-800">{item.swapValue} points</p>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  item.status === 'available'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {item.status === 'available' ? '✓ Available for Swap' : '⏳ Swap Pending'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {item.status === 'available' && (
                  <button
                    onClick={handleSwapRequest}
                    className="w-full bg-gradient-to-r from-emerald-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Repeat className="w-5 h-5" />
                    Request Swap
                  </button>
                )}
                
                <button className="w-full border-2 border-emerald-500 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Message Owner</span>
                </button>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Item Owner</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.uploaderName}</h4>
                  <p className="text-sm text-gray-600">Member since 2024</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.8)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Modal */}
        {showSwapModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Repeat className="w-6 h-6 mr-2 text-emerald-500" />
                Request Swap
              </h3>
              <p className="text-gray-600 mb-4">
                Send a swap request for "{item.title}" to {item.uploaderName}
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
                  onClick={() => setShowSwapModal(false)}
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

export default ItemDetail;