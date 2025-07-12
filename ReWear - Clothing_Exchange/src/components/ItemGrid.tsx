import React from 'react';
import { Heart, Eye, MapPin, Calendar, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Item } from '../contexts/ItemContext';

interface ItemGridProps {
  items: Item[];
  viewMode: 'grid' | 'list';
  isOwner?: boolean;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, viewMode, isOwner = false }) => {
  const handleLike = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle like functionality
    console.log('Liked item:', itemId);
  };

  const handleEdit = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle edit functionality
    console.log('Edit item:', itemId);
  };

  const handleDelete = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle delete functionality
    console.log('Delete item:', itemId);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <div className="text-gray-400 mb-4">
          <Heart className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
        <p className="text-gray-500">
          {isOwner 
            ? "You haven't uploaded any items yet. Add your first item to get started!"
            : "No items match your search criteria. Try adjusting your filters."
          }
        </p>
        {isOwner && (
          <Link
            to="/add-item"
            className="inline-block mt-4 bg-gradient-to-r from-emerald-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Add Your First Item
          </Link>
        )}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="space-y-1">
          {items.map((item, index) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="block p-6 hover:bg-gray-50 transition-colors duration-300 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
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
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views || 0}</span>
                      </div>
                      {isOwner && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => handleEdit(item.id, e)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
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
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Action buttons */}
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Heart className="w-4 h-4 text-gray-700 hover:text-red-500" />
                </button>
                
                {isOwner && (
                  <>
                    <button
                      onClick={(e) => handleEdit(item.id, e)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </>
                )}
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'available' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {item.status === 'available' ? 'Available' : 'Pending'}
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
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;