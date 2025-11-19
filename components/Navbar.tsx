import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, User, Layout, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-stone-900 text-white p-1.5 rounded-md">
              <PenTool size={20} />
            </div>
            <span className="font-display font-bold text-xl text-stone-900">
              Web Author
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-stone-900' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Layout size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive('/profile')
                  ? 'bg-stone-100 text-stone-900 ring-1 ring-stone-200'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {isActive('/profile') ? (
                <>
                  <User size={18} />
                  <span>Viewing Profile</span>
                </>
              ) : (
                <>
                  <ExternalLink size={16} />
                  <span>View Public Page</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};