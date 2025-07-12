import React from 'react';
import { Users, Recycle, TrendingUp, Globe } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Users',
      description: 'Fashion enthusiasts worldwide'
    },
    {
      icon: Recycle,
      value: '50,000+',
      label: 'Items Swapped',
      description: 'Clothes given new life'
    },
    {
      icon: TrendingUp,
      value: '75%',
      label: 'Waste Reduced',
      description: 'Environmental impact decreased'
    },
    {
      icon: Globe,
      value: '100+',
      label: 'Cities',
      description: 'Global community reach'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-purple-50/50" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Impact by Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how our community is making a difference in sustainable fashion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="scroll-animate opacity-0 transform translate-y-8 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;