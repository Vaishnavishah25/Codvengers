import React, { useEffect, useRef } from 'react';
import { Recycle, ArrowRight, TrendingUp, Users, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ItemCarousel from './ItemCarousel';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      const rate2 = scrolled * -0.3;
      
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
      
      // 3D rotation effect on hero content
      if (heroRef.current) {
        const rotateX = Math.min(scrolled * 0.01, 10);
        heroRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with 3D Parallax */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-purple-600 opacity-90"
        />
        <div className="absolute inset-0 bg-black opacity-20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        <div ref={heroRef} className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="scroll-animate opacity-0 transform translate-y-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse-soft">
                <Recycle className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              ReWear
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Transform fashion waste into sustainable style. Exchange, discover, and give your clothes a second life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/dashboard"
                className="group bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Start Swapping
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
                Learn More
                <Sparkles className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Items Carousel */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing pieces from our community members
            </p>
          </div>
          <ItemCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="scroll-animate opacity-0 transform translate-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Fashion?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts creating a sustainable future, one swap at a time.
            </p>
            <Link 
              to="/dashboard"
              className="inline-block bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Join ReWear Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;