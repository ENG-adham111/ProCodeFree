import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Feather, Share2, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center bg-stone-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider mb-8">
            For Writers & Creators
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
            Your Words Deserve <br/>
            <span className="italic text-stone-600">A Beautiful Home.</span>
          </h1>
          
          <p className="font-serif text-lg md:text-xl text-stone-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Build a professional author profile in minutes. Showcase your books, articles, and bio with a minimal, elegant design. No coding required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="group px-8 py-4 bg-stone-900 text-white rounded-full font-medium text-lg hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Create Your Profile
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/profile"
              className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-full font-medium text-lg hover:bg-stone-50 transition-colors"
            >
              See Example
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8" />}
              title="Showcase Books"
              desc="Beautifully display your published works with covers, descriptions, and purchase links."
            />
            <FeatureCard 
              icon={<Feather className="w-8 h-8" />}
              title="Curate Articles"
              desc="Link to your best writing from across the web in one organized list."
            />
            <FeatureCard 
              icon={<Share2 className="w-8 h-8" />}
              title="Share Anywhere"
              desc="Get a clean, professional link to share on social media or your email signature."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-stone-50 transition-colors">
    <div className="mb-6 p-4 bg-stone-100 rounded-full text-stone-800">{icon}</div>
    <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">{title}</h3>
    <p className="font-serif text-stone-500 leading-relaxed">{desc}</p>
  </div>
);