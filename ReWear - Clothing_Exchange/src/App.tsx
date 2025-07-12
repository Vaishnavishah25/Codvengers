import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ItemsPage from './components/ItemsPage';
import ItemDetail from './components/ItemDetail';
import AddItem from './components/AddItem';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ItemProvider } from './contexts/ItemContext';
import './styles/animations.css';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <AuthProvider>
      <ItemProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50">
            <Navbar 
              onAuthClick={(mode) => {
                setAuthMode(mode);
                setIsAuthModalOpen(true);
              }} 
            />
            
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>

            <Footer />

            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              mode={authMode}
              onModeChange={setAuthMode}
            />
          </div>
        </Router>
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;