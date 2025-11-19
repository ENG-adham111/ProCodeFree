import React from 'react';
import { Heart, Phone, Code } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  
  return (
    <footer className="bg-brand-card border-t border-gray-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2 text-gray-400">
            <Code size={18} className="text-brand-primary" />
            <span className="font-semibold text-gray-200">ProCodeFree</span>
            <span className="text-sm">© 2024</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-red-500 fill-red-500" />
              <span>{t.footerDev}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-brand-accent" />
              <span className="font-mono">{t.footerPhone}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};