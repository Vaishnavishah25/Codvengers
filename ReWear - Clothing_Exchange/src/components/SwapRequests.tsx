import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useItems } from '../contexts/ItemContext';
import { Clock, CheckCircle, XCircle, User, Calendar, MessageCircle, ArrowRight } from 'lucide-react';

const SwapRequests: React.FC = () => {
  const { user } = useAuth();
  const { items, swapRequests, updateSwapRequest } = useItems();

  const incomingRequests = swapRequests.filter(request => 
    request.toUserId === user?.id && request.status === 'pending'
  );

  const outgoingRequests = swapRequests.filter(request => 
    request.fromUserId === user?.id && request.status === 'pending'
  );

  const handleAcceptRequest = (requestId: string) => {
    updateSwapRequest(requestId, 'accepted');
    // Award points for successful swap
    alert('Swap request accepted! You earned 50 points!');
  };

  const handleRejectRequest = (requestId: string) => {
    updateSwapRequest(requestId, 'rejected');
  };

  const getItemById = (itemId: string) => {
    return items.find(item => item.id === itemId);
  };

  const RequestCard: React.FC<{ request: any; type: 'incoming' | 'outgoing' }> = ({ request, type }) => {
    const fromItem = getItemById(request.fromItemId);
    const toItem = getItemById(request.toItemId);

    if (!fromItem || !toItem) return null;

    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {type === 'incoming' ? 'Incoming Swap Request' : 'Outgoing Swap Request'}
                </h3>
                <p className="text-sm text-gray-600">
                  {type === 'incoming' ? `From ${fromItem.uploaderName}` : `To ${toItem.uploaderName}`}
                </p>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(request.createdAt).toLocaleDateString()}
            </div>
          </div>

          {request.message && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <MessageCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                <p className="text-sm text-gray-700">{request.message}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Their Item */}
              <div className="flex items-center space-x-3">
                <img
                  src={type === 'incoming' ? fromItem.image : toItem.image}
                  alt={type === 'incoming' ? fromItem.title : toItem.title}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {type === 'incoming' ? 'They Offer' : 'You Want'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {type === 'incoming' ? fromItem.title : toItem.title}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {type === 'incoming' ? fromItem.swapValue : toItem.swapValue} points value
                  </p>
                </div>
              </div>

              {/* Exchange Arrow */}
              <div className="flex items-center space-x-2 text-gray-400">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Your Item */}
              <div className="flex items-center space-x-3">
                <img
                  src={type === 'incoming' ? toItem.image : fromItem.image}
                  alt={type === 'incoming' ? toItem.title : fromItem.title}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {type === 'incoming' ? 'For Your' : 'You Offer'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {type === 'incoming' ? toItem.title : fromItem.title}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {type === 'incoming' ? toItem.swapValue : fromItem.swapValue} points value
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {type === 'incoming' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAcceptRequest(request.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center space-x-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={() => handleRejectRequest(request.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center space-x-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Decline</span>
                </button>
              </div>
            )}

            {type === 'outgoing' && (
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  Pending Response
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Swap Requests</h2>
        <p className="text-gray-600 mb-6">Manage your incoming and outgoing swap requests</p>
      </div>

      {/* Incoming Requests */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-emerald-500" />
          Incoming Requests ({incomingRequests.length})
        </h3>
        
        {incomingRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No incoming requests</h4>
            <p className="text-gray-500">When someone wants to swap with your items, they'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {incomingRequests.map((request) => (
              <RequestCard key={request.id} request={request} type="incoming" />
            ))}
          </div>
        )}
      </div>

      {/* Outgoing Requests */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-purple-500" />
          Outgoing Requests ({outgoingRequests.length})
        </h3>
        
        {outgoingRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No outgoing requests</h4>
            <p className="text-gray-500">Start browsing items to send your first swap request!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {outgoingRequests.map((request) => (
              <RequestCard key={request.id} request={request} type="outgoing" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapRequests;