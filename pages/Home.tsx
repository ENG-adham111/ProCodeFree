import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Monitor, Cpu } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const Home: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-brand-dark py-20 lg:py-32">
        {/* Background Decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-primary/20 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-brand-accent/10 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card border border-brand-primary/30 text-brand-accent text-xs font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            100% Free Education
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {t.heroTitle}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl text-white font-semibold shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              {t.startLearning}
              <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
            </Link>
            
            <a
              href="#mission"
              className="w-full sm:w-auto px-8 py-4 bg-brand-card border border-gray-700 rounded-xl text-gray-300 font-medium hover:bg-gray-800 transition-colors"
            >
              {t.mission}
            </a>
          </div>
        </div>
      </div>

      {/* Features/Mission Section */}
      <div id="mission" className="py-20 bg-brand-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Terminal className="w-8 h-8 text-brand-accent" />}
              title="Hands-on Coding"
              desc="Practice with real-world projects and exercises."
            />
            <FeatureCard 
              icon={<Monitor className="w-8 h-8 text-brand-secondary" />}
              title="Modern Curriculum"
              desc="Updated courses covering the latest tech stacks."
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-brand-primary" />}
              title="Career Ready"
              desc="Build a portfolio that gets you hired."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-6 bg-brand-card border border-gray-800 rounded-2xl hover:border-gray-600 transition-all duration-300">
    <div className="mb-4 p-3 bg-brand-dark w-fit rounded-lg">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);