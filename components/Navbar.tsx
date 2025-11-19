import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Code2 } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const t = translations[lang];

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  const navLinks = [
    { path: '/', label: t.heroTitle.split(' ')[0] }, // "Learn/Ta'alam" simplified
    { path: '/courses', label: t.courses },
    { path: '/dashboard', label: t.dashboard },
    { path: '/admin', label: t.admin },
  ];

  return (
    <nav className="bg-brand-dark/90 backdrop-blur-md border-b border-brand-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg">
               <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white hidden sm:block tracking-tight">
              Pro<span className="text-brand-accent">Code</span>Free
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-accent ${
                  location.pathname === link.path ? 'text-brand-accent' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-card border border-gray-700 text-gray-300 hover:border-brand-primary transition-all text-xs uppercase"
            >
              <Globe size={14} />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-gray-300 text-xs uppercase"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-card border-b border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-brand-primary/20 text-brand-accent'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};