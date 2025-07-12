import React from 'react';
import { Shield, Zap, Heart, Star, Sparkles, RefreshCw } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Exchanges',
      description: 'Advanced verification system ensures safe and trusted transactions between users.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'AI-powered algorithm finds perfect swap matches based on your preferences.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built by fashion lovers, for fashion lovers. Rate and review every exchange.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Comprehensive quality checks and user ratings maintain high standards.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Sparkles,
      title: 'Style Discovery',
      description: 'Explore new styles and trends through our curated recommendations.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: RefreshCw,
      title: 'Circular Fashion',
      description: 'Contribute to sustainable fashion by extending the lifecycle of clothing.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-purple-50/30" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why Choose ReWear?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of sustainable fashion with features designed for modern style enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="scroll-animate opacity-0 transform translate-y-8 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full animate-pulse`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;