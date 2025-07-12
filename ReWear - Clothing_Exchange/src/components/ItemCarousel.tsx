import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Eye, Sparkles } from 'lucide-react';
import { useItems } from '../contexts/ItemContext';

const ItemCarousel: React.FC = () => {
  const { items } = useItems();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredItems = items.slice(0, 6);

  useEffect(() => {
    if (isAutoPlaying && featuredItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, featuredItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    setIsAutoPlaying(false);
  };

  if (featuredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No items available yet. Be the first to add one!</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredItems.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="relative group cursor-pointer">
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* 3D Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-500 px-3 py-1 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                        <span className="ml-2 text-sm opacity-80">Size {item.size}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-200 mb-4 opacity-90">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{item.likes || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{item.views || 0}</span>
                          </div>
                        </div>
                        
                        <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Swap Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-emerald-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemCarousel;