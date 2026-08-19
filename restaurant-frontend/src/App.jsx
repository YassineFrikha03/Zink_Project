// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';


import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import OrderTracking from './pages/OrderTracking';
import CustomBurger from './pages/CustomBurger';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Bell } from 'lucide-react';

// Composant pour faire remonter le scroll en haut à chaque changement de page
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Composant gérant le layout, la Navbar conditionnelle et le bandeau d'alerte piloté par l'admin
const AppContent = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  // Bandeau d'alerte contrôlé depuis AdminDashboard (`localStorage.getItem('zink_alert_active')`)
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertText, setAlertText] = useState('');

  useEffect(() => {
    const checkAlert = () => {
      const active = localStorage.getItem('zink_alert_active') === 'true';
      const text = localStorage.getItem('zink_alert_banner') || '🔥 LIVRAISON OFFERTE sur El Menzah & La Marsa dès 60 DT avec le code ZINKTUNISIE !';
      setIsAlertActive(active);
      setAlertText(text);
    };
    checkAlert();
    window.addEventListener('storage', checkAlert);
    return () => window.removeEventListener('storage', checkAlert);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0E] text-white selection:bg-[#F59E0B] selection:text-black">
      <ScrollToTop />

      {/* Bandeau d'alerte en direct contrôlé par l'administrateur */}
      {!isAdminRoute && isAlertActive && (
        <div className="bg-gradient-to-r from-[#F59E0B] via-yellow-500 to-[#F59E0B] text-black font-extrabold text-xs sm:text-sm px-4 py-2 text-center shadow-lg flex items-center justify-center gap-2 relative z-50 animate-pulse">
          <Bell className="w-4 h-4 shrink-0" />
          <span>{alertText}</span>
        </div>
      )}
      
      {/* Barre de navigation (masquée dans le portail admin) */}
      {!isAdminRoute && <Navbar />}

      {/* Tiroir Panier et Modale de Commande */}
      <CartDrawer />
      <CheckoutModal />



      {/* Contenu principal */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/creer-mon-burger" element={<CustomBurger />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offres" element={<Offers />} />
          <Route path="/suivi/:id" element={<OrderTracking />} />
          <Route path="/suivi" element={<OrderTracking />} />
          
          {/* Routes Admin (sans login public sur le site) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Pied de page (masqué dans le portail admin) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
