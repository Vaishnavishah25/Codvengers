import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useItems } from '../contexts/ItemContext';
import { Upload, Camera, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useItems();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    images: [] as File[],
    brand: '',
    originalPrice: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['shirts', 'dresses', 'pants', 'jackets', 'accessories', 'shoes'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['like-new', 'excellent', 'good', 'fair'];
  const popularBrands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Levi\'s', 'Gap', 'Forever 21', 'Urban Outfitters', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, images: [file] }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, images: [] }));
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to add an item');
      return;
    }

    if (!formData.title || !formData.description || !formData.category || !formData.size || !formData.condition) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // For demo purposes, we'll use a placeholder image if no image is uploaded
      const imageUrl = imagePreview || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg';

      // Calculate swap value based on original price and condition
      const originalPrice = parseFloat(formData.originalPrice) || 0;
      const conditionMultiplier = {
        'like-new': 0.8,
        'excellent': 0.7,
        'good': 0.6,
        'fair': 0.4
      };
      const swapValue = Math.round(originalPrice * conditionMultiplier[formData.condition as keyof typeof conditionMultiplier]);

      const newItem = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        size: formData.size,
        condition: formData.condition,
        brand: formData.brand || undefined,
        originalPrice: originalPrice || undefined,
        swapValue: swapValue || undefined,
        image: imageUrl,
        uploaderId: user.id,
        uploaderName: user.name,
        status: 'available' as const,
        createdAt: new Date().toISOString(),
        likes: 0,
        views: 0
      };

      addItem(newItem);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        size: '',
        condition: '',
        images: [],
        brand: '',
        originalPrice: ''
      });
      setImagePreview('');
      
      alert('Item added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to add an item</h2>
          <p className="text-gray-600">You need to be authenticated to upload items.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Item</h1>
            <p className="text-gray-600">Share your fashion pieces with the ReWear community</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Item Photos</h2>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-64 object-cover rounded-xl mx-auto"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-2">Upload Item Photo</p>
                  <p className="text-gray-500">Click to select or drag and drop</p>
                </label>
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Item Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Vintage Denim Jacket"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your item in detail..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white"
                  required
                >
                  <option value="">Select a size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white"
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Value Preview */}
            {formData.originalPrice && formData.condition && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="font-medium text-emerald-700 mb-2">Estimated Swap Value</h4>
                <p className="text-2xl font-bold text-emerald-800">
                  {Math.round(parseFloat(formData.originalPrice) * (conditionMultiplier[formData.condition as keyof typeof conditionMultiplier] || 0))} points
                </p>
                <p className="text-sm text-emerald-600 mt-1">
                  Based on original price and condition
                </p>
              </div>
            )}
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white"
                >
                  <option value="">Select a brand (optional)</option>
                  {popularBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This helps calculate the swap value for your item
                </p>
              </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-gradient-to-r from-emerald-500 to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-emerald-600 hover:to-purple-600'
              }`}
            >
              {isSubmitting ? 'Adding Item...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;