import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Recycle, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onAuthClick: (mode: 'login' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Items', path: '/items' },
    { name: 'Add Item', path: '/add-item' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-emerald-500 to-purple-500 p-2 rounded-lg">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              ReWear
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors hover:text-emerald-500 ${
                  location.pathname === item.path
                    ? 'text-emerald-500'
                    : isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-emerald-500" />
                  <span className={`${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onAuthClick('login')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-emerald-500' 
                      : 'text-white hover:text-emerald-200'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => onAuthClick('signup')}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-purple-500 text-white rounded-lg hover:from-emerald-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border">
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="border-t pt-2">
                  <div className="px-3 py-2 text-gray-700">Welcome, {user.name}!</div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t pt-2 space-y-2">
                  <button
                    onClick={() => {
                      onAuthClick('login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onAuthClick('signup');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-purple-500 text-white hover:from-emerald-600 hover:to-purple-600 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;