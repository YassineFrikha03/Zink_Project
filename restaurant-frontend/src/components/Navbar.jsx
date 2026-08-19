// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'ACCUEIL', path: '/' },
    { name: 'MENU', path: '/menu' },
    { name: 'CRÉER MON BURGER', path: '/creer-mon-burger' },
    { name: 'OFFRES', path: '/offres' },
    { name: 'SUIVI', path: '/suivi' },
    { name: 'À PROPOS', path: '/a-propos' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0E]/95 backdrop-blur-md py-3 shadow-2xl border-b border-white/10'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo Officiel : LE ZINK - Taste the Original */}
        <NavLink to="/" className="flex items-center group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative flex items-center"
            onDoubleClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/admin');
            }}
            title="Double click for admin"
          >
            <img 
              src="/logo.png" 
              alt="Le Zink Logo Officiel" 
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] transition-transform duration-300"
            />
          </motion.div>
        </NavLink>

        {/* Navigation Desktop Maquette Exacte */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-heading text-xs uppercase font-bold tracking-widest transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#F59E0B]'
                    : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F59E0B] rounded-full shadow-sm shadow-[#F59E0B]" 
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions à droite (Thème + Panier + Bouton COMMANDER jaune maquette) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Bouton bascule de thème dans le header */}
          <ThemeToggle isNavbarVariant={true} />

          {/* Bouton Panier */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-transparent border border-white/20 hover:border-[#F59E0B] text-white transition-all shadow-md"
            aria-label="Panier"
          >
            <ShoppingBag size={20} className="text-white" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-[#F59E0B] text-black font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Bouton COMMANDER Maquette : Jaune orange, angles arrondis, texte noir */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#FBBF24' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (totalItems > 0) {
                setIsCartOpen(true);
              } else {
                navigate('/menu');
              }
            }}
            className="hidden sm:inline-flex bg-[#F59E0B] text-black text-xs font-black tracking-wider uppercase px-6 py-3 rounded-xl shadow-lg shadow-[#F59E0B]/25 transition-all"
          >
            COMMANDER
          </motion.button>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#F59E0B] transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#121217] border-b border-white/10 px-6 py-6 mt-3 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-heading text-sm uppercase font-bold tracking-widest py-2 border-b border-white/5 flex items-center justify-between ${
                      isActive ? 'text-[#F59E0B]' : 'text-gray-300'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-gray-600">→</span>
                </NavLink>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (totalItems > 0) setIsCartOpen(true);
                  else navigate('/menu');
                }}
                className="bg-[#F59E0B] text-black font-black uppercase tracking-wider w-full mt-4 py-3 text-sm rounded-xl"
              >
                COMMANDER EN LIGNE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
