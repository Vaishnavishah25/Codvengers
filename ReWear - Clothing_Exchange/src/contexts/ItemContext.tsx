import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  image: string;
  uploaderId: string;
  uploaderName: string;
  status: 'available' | 'pending' | 'swapped';
  createdAt: string;
  likes?: number;
  views?: number;
  brand?: string;
  originalPrice?: number;
  swapValue?: number;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromItemId: string;
  toItemId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdAt: string;
  completedAt?: string;
}

interface ItemContextType {
  items: Item[];
  swapRequests: SwapRequest[];
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  createSwapRequest: (fromItemId: string, toItemId: string, message?: string) => void;
  updateSwapRequest: (id: string, status: SwapRequest['status']) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([
    // Fashion Items
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      description: 'Classic blue denim jacket from the 90s. Perfect condition with minimal wear. Great for layering and adding a retro touch to any outfit.',
      category: 'jackets',
      size: 'M',
      condition: 'excellent',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      uploaderId: '2',
      uploaderName: 'Sarah Johnson',
      status: 'available',
      createdAt: '2024-01-15T10:30:00Z',
      likes: 24,
      views: 156,
      brand: 'Levi\'s',
      originalPrice: 120,
      swapValue: 85
    },
    {
      id: '2',
      title: 'Elegant Evening Dress',
      description: 'Beautiful black evening dress perfect for formal occasions. Features a flattering silhouette and high-quality fabric.',
      category: 'dresses',
      size: 'S',
      condition: 'like-new',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      uploaderId: '3',
      uploaderName: 'Emma Wilson',
      status: 'available',
      createdAt: '2024-01-14T15:20:00Z',
      likes: 18,
      views: 89,
      brand: 'Zara',
      originalPrice: 89,
      swapValue: 65
    },
    {
      id: '3',
      title: 'Casual Summer Top',
      description: 'Light and breezy summer top in a lovely floral pattern. Perfect for warm weather and casual outings.',
      category: 'shirts',
      size: 'L',
      condition: 'good',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      uploaderId: '4',
      uploaderName: 'Mike Davis',
      status: 'available',
      createdAt: '2024-01-13T09:45:00Z',
      likes: 12,
      views: 67,
      brand: 'H&M',
      originalPrice: 25,
      swapValue: 15
    },
    {
      id: '4',
      title: 'Designer Handbag',
      description: 'Authentic designer handbag in excellent condition. Classic design that never goes out of style.',
      category: 'accessories',
      size: 'M',
      condition: 'excellent',
      image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg',
      uploaderId: '5',
      uploaderName: 'Lisa Chen',
      status: 'available',
      createdAt: '2024-01-12T14:30:00Z',
      likes: 31,
      views: 234,
      brand: 'Michael Kors',
      originalPrice: 250,
      swapValue: 180
    },
    {
      id: '5',
      title: 'Wool Winter Coat',
      description: 'Warm and stylish wool coat perfect for cold weather. High-quality material and classic cut.',
      category: 'jackets',
      size: 'L',
      condition: 'good',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
      uploaderId: '6',
      uploaderName: 'David Brown',
      status: 'available',
      createdAt: '2024-01-11T11:15:00Z',
      likes: 15,
      views: 98,
      brand: 'Uniqlo',
      originalPrice: 150,
      swapValue: 95
    },
    {
      id: '6',
      title: 'Stylish Sneakers',
      description: 'Comfortable and trendy sneakers in great condition. Perfect for everyday wear and casual activities.',
      category: 'shoes',
      size: '9',
      condition: 'good',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      uploaderId: '7',
      uploaderName: 'Jessica Taylor',
      status: 'available',
      createdAt: '2024-01-10T16:00:00Z',
      likes: 9,
      views: 45,
      brand: 'Nike',
      originalPrice: 80,
      swapValue: 50
    },
    // Additional Products
    {
      id: '7',
      title: 'Bohemian Maxi Dress',
      description: 'Flowing bohemian maxi dress with intricate patterns. Perfect for festivals and summer events.',
      category: 'dresses',
      size: 'M',
      condition: 'excellent',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      uploaderId: '8',
      uploaderName: 'Maya Patel',
      status: 'available',
      createdAt: '2024-01-09T12:00:00Z',
      likes: 22,
      views: 134,
      brand: 'Free People',
      originalPrice: 95,
      swapValue: 70
    },
    {
      id: '8',
      title: 'Classic White Shirt',
      description: 'Crisp white button-down shirt. A wardrobe essential that pairs with everything.',
      category: 'shirts',
      size: 'S',
      condition: 'like-new',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      uploaderId: '9',
      uploaderName: 'Alex Rodriguez',
      status: 'available',
      createdAt: '2024-01-08T14:30:00Z',
      likes: 16,
      views: 78,
      brand: 'Uniqlo',
      originalPrice: 35,
      swapValue: 25
    },
    {
      id: '9',
      title: 'Leather Ankle Boots',
      description: 'Genuine leather ankle boots with a modern design. Comfortable and versatile.',
      category: 'shoes',
      size: '8',
      condition: 'good',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      uploaderId: '10',
      uploaderName: 'Sophie Martin',
      status: 'available',
      createdAt: '2024-01-07T10:15:00Z',
      likes: 19,
      views: 112,
      brand: 'Dr. Martens',
      originalPrice: 140,
      swapValue: 90
    },
    {
      id: '10',
      title: 'Vintage Band T-Shirt',
      description: 'Authentic vintage band t-shirt from the 80s. Soft cotton with classic graphics.',
      category: 'shirts',
      size: 'M',
      condition: 'good',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      uploaderId: '11',
      uploaderName: 'Ryan Cooper',
      status: 'available',
      createdAt: '2024-01-06T16:45:00Z',
      likes: 28,
      views: 189,
      brand: 'Vintage',
      originalPrice: 45,
      swapValue: 35
    },
    {
      id: '11',
      title: 'Silk Scarf Collection',
      description: 'Beautiful silk scarves in various patterns. Perfect for adding elegance to any outfit.',
      category: 'accessories',
      size: 'One Size',
      condition: 'excellent',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      uploaderId: '12',
      uploaderName: 'Isabella Garcia',
      status: 'available',
      createdAt: '2024-01-05T11:20:00Z',
      likes: 14,
      views: 67,
      brand: 'Hermès',
      originalPrice: 180,
      swapValue: 130
    },
    {
      id: '12',
      title: 'High-Waisted Jeans',
      description: 'Trendy high-waisted jeans with a flattering fit. Perfect for casual and semi-formal occasions.',
      category: 'pants',
      size: 'M',
      condition: 'like-new',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      uploaderId: '13',
      uploaderName: 'Chloe Anderson',
      status: 'available',
      createdAt: '2024-01-04T13:10:00Z',
      likes: 21,
      views: 145,
      brand: 'Levi\'s',
      originalPrice: 75,
      swapValue: 55
    },
    {
      id: '13',
      title: 'Cashmere Sweater',
      description: 'Luxurious cashmere sweater in soft beige. Incredibly soft and warm.',
      category: 'shirts',
      size: 'L',
      condition: 'excellent',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      uploaderId: '14',
      uploaderName: 'Oliver Thompson',
      status: 'available',
      createdAt: '2024-01-03T09:30:00Z',
      likes: 33,
      views: 201,
      brand: 'Everlane',
      originalPrice: 120,
      swapValue: 85
    },
    {
      id: '14',
      title: 'Statement Earrings',
      description: 'Bold statement earrings that add glamour to any outfit. Gold-plated with crystals.',
      category: 'accessories',
      size: 'One Size',
      condition: 'like-new',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      uploaderId: '15',
      uploaderName: 'Zoe Williams',
      status: 'available',
      createdAt: '2024-01-02T15:45:00Z',
      likes: 17,
      views: 89,
      brand: 'Kate Spade',
      originalPrice: 65,
      swapValue: 45
    },
    {
      id: '15',
      title: 'Workout Leggings',
      description: 'High-performance workout leggings with moisture-wicking fabric. Perfect for yoga and gym.',
      category: 'pants',
      size: 'S',
      condition: 'good',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      uploaderId: '16',
      uploaderName: 'Fitness Enthusiast',
      status: 'available',
      createdAt: '2024-01-01T08:00:00Z',
      likes: 12,
      views: 76,
      brand: 'Lululemon',
      originalPrice: 90,
      swapValue: 60
    },
    {
      id: '16',
      title: 'Blazer Jacket',
      description: 'Professional blazer perfect for office wear. Tailored fit with classic styling.',
      category: 'jackets',
      size: 'M',
      condition: 'excellent',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      uploaderId: '17',
      uploaderName: 'Professional Jane',
      status: 'available',
      createdAt: '2023-12-31T14:20:00Z',
      likes: 25,
      views: 156,
      brand: 'Theory',
      originalPrice: 200,
      swapValue: 140
    },
    {
      id: '17',
      title: 'Summer Sandals',
      description: 'Comfortable summer sandals with cushioned soles. Perfect for beach and casual wear.',
      category: 'shoes',
      size: '7',
      condition: 'good',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      uploaderId: '18',
      uploaderName: 'Beach Lover',
      status: 'available',
      createdAt: '2023-12-30T11:30:00Z',
      likes: 8,
      views: 45,
      brand: 'Birkenstock',
      originalPrice: 85,
      swapValue: 55
    },
    {
      id: '18',
      title: 'Cocktail Dress',
      description: 'Stunning cocktail dress for special occasions. Flattering cut with elegant details.',
      category: 'dresses',
      size: 'M',
      condition: 'like-new',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      uploaderId: '19',
      uploaderName: 'Party Queen',
      status: 'available',
      createdAt: '2023-12-29T18:15:00Z',
      likes: 29,
      views: 178,
      brand: 'BCBG',
      originalPrice: 150,
      swapValue: 110
    },
    {
      id: '19',
      title: 'Denim Shorts',
      description: 'Classic denim shorts with a comfortable fit. Perfect for summer days.',
      category: 'pants',
      size: 'S',
      condition: 'good',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      uploaderId: '20',
      uploaderName: 'Summer Vibes',
      status: 'available',
      createdAt: '2023-12-28T12:45:00Z',
      likes: 11,
      views: 67,
      brand: 'American Eagle',
      originalPrice: 40,
      swapValue: 25
    },
    {
      id: '20',
      title: 'Luxury Watch',
      description: 'Elegant luxury watch with leather strap. Perfect for formal occasions.',
      category: 'accessories',
      size: 'One Size',
      condition: 'excellent',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      uploaderId: '21',
      uploaderName: 'Time Keeper',
      status: 'available',
      createdAt: '2023-12-27T16:30:00Z',
      likes: 42,
      views: 289,
      brand: 'Fossil',
      originalPrice: 180,
      swapValue: 130
    }
  ]);

  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([
    {
      id: '1',
      fromUserId: '1',
      toUserId: '2',
      fromItemId: '3',
      toItemId: '1',
      status: 'pending',
      message: 'I love your vintage jacket! Would you like to swap for my summer top?',
      createdAt: '2024-01-16T10:30:00Z'
    },
    {
      id: '2',
      fromUserId: '3',
      toUserId: '1',
      fromItemId: '2',
      toItemId: '4',
      status: 'accepted',
      message: 'Your handbag is perfect for my collection!',
      createdAt: '2024-01-15T14:20:00Z'
    },
    {
      id: '3',
      fromUserId: '1',
      toUserId: '5',
      fromItemId: '6',
      toItemId: '5',
      status: 'completed',
      message: 'Great coat! My sneakers are in excellent condition.',
      createdAt: '2024-01-14T09:15:00Z',
      completedAt: '2024-01-15T16:30:00Z'
    }
  ]);

  const addItem = (item: Omit<Item, 'id'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString()
    };
    setItems(prev => [newItem, ...prev]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const createSwapRequest = (fromItemId: string, toItemId: string, message?: string) => {
    const fromItem = items.find(item => item.id === fromItemId);
    const toItem = items.find(item => item.id === toItemId);
    
    if (!fromItem || !toItem) return;

    const newSwapRequest: SwapRequest = {
      id: Date.now().toString(),
      fromUserId: fromItem.uploaderId,
      toUserId: toItem.uploaderId,
      fromItemId,
      toItemId,
      status: 'pending',
      message,
      createdAt: new Date().toISOString()
    };

    setSwapRequests(prev => [newSwapRequest, ...prev]);
  };

  const updateSwapRequest = (id: string, status: SwapRequest['status']) => {
    setSwapRequests(prev => prev.map(request => 
      request.id === id 
        ? { 
            ...request, 
            status,
            completedAt: status === 'completed' ? new Date().toISOString() : request.completedAt
          } 
        : request
    ));

    // Update item status if swap is completed
    if (status === 'completed') {
      const request = swapRequests.find(r => r.id === id);
      if (request) {
        updateItem(request.fromItemId, { status: 'swapped' });
        updateItem(request.toItemId, { status: 'swapped' });
      }
    }
  };

  return (
    <ItemContext.Provider value={{ 
      items, 
      swapRequests, 
      addItem, 
      updateItem, 
      deleteItem, 
      createSwapRequest, 
      updateSwapRequest 
    }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};