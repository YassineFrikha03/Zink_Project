// src/components/Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0E] border-t border-white/10 pt-16 pb-10 text-gray-400">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
        {/* Colonne 1: Histoire & Logo */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Le Zink Logo Officiel" 
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(245,158,11,0.3)] grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mt-1">
            Le pionnier incontournable du burger gourmet et des viandes maturées en Tunisie depuis 2014. Créations authentiques, généreuses et passionnées.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="w-9 h-9 rounded-full bg-[#181820] flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-black transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#181820] flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-black transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#181820] flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-black font-bold text-sm">
              𝕏
            </a>
          </div>
        </div>

        {/* Colonne 2: Navigation rapide */}
        <div>
          <h4 className="font-heading font-bold text-white text-base uppercase tracking-wider mb-5 border-l-2 border-[#F59E0B] pl-3">
            Navigation
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <NavLink to="/" className="hover:text-[#F59E0B] transition-colors flex items-center gap-2">
                <span className="text-xs text-[#F59E0B]">▸</span> Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className="hover:text-[#F59E0B] transition-colors flex items-center gap-2">
                <span className="text-xs text-[#F59E0B]">▸</span> Notre Menu Gourmet
              </NavLink>
            </li>
            <li>
              <NavLink to="/creer-mon-burger" className="hover:text-[#F59E0B] transition-colors flex items-center gap-2 font-semibold text-amber-200">
                <span className="text-xs text-[#F59E0B]">★</span> Créer Mon Burger
              </NavLink>
            </li>
            <li>
              <NavLink to="/a-propos" className="hover:text-[#F59E0B] transition-colors flex items-center gap-2">
                <span className="text-xs text-[#F59E0B]">▸</span> Notre Histoire
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-[#F59E0B] transition-colors flex items-center gap-2">
                <span className="text-xs text-[#F59E0B]">▸</span> Nous Contacter
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Colonne 3: Horaires */}
        <div>
          <h4 className="font-heading font-bold text-white text-base uppercase tracking-wider mb-5 border-l-2 border-[#F59E0B] pl-3">
            Horaires d'Ouverture
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Lundi - Jeudi :</p>
                <p className="text-xs text-gray-400">11h30 - 22h30</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Vendredi - Samedi :</p>
                <p className="text-xs text-gray-400">11h30 - 23h30</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Dimanche :</p>
                <p className="text-xs text-gray-400">11h30 - 22h00</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Colonne 4: Contact & Localisation */}
        <div>
          <h4 className="font-heading font-bold text-white text-base uppercase tracking-wider mb-5 border-l-2 border-[#F59E0B] pl-3">
            Nos Adresses en Tunisie
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">El Menzah 1 :</strong>
                <span>1, Rue Salah Ben Mahmoud, Tunis</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">La Marsa :</strong>
                <span>Rue des Narcisses, La Marsa</span>
              </div>
            </li>
            <li className="flex items-center gap-3 pt-1 border-t border-white/5">
              <Phone size={18} className="text-[#F59E0B] shrink-0" />
              <span>+216 54 804 408 / +216 54 805 508</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright avec raccourci discret vers l'administration staff */}
      <div className="container-custom pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p className="flex items-center gap-2">
          <span>© 2026 Le Zink Tunisie • Taste the original. Tous droits réservés.</span>
          <a 
            href="/admin" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/admin';
            }}
            title="Accès Portail Staff"
            className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-[#F59E0B] hover:text-black text-[10px] text-gray-400 font-mono transition-all"
          >
            🔒 Staff
          </a>
        </p>
        <p className="flex items-center gap-1.5">
          Fait avec <Heart size={14} className="text-red-500 fill-red-500" /> par l'équipe Le Zink.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
