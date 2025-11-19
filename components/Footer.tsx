import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-stone-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-stone-500">
            © {new Date().getFullYear()} Web Author. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-stone-400">
            <span className="hover:text-stone-600 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-stone-600 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-stone-600 cursor-pointer transition-colors">Help</span>
          </div>
        </div>
      </div>
    </footer>
  );
};