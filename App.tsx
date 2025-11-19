import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { storageService } from './services/storageService';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    storageService.init();
    // Set direction on body
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update font based on language
    if (lang === 'ar') {
      document.body.style.fontFamily = "'Cairo', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [lang]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-brand-dark text-gray-100 selection:bg-brand-primary selection:text-white">
        <Navbar lang={lang} setLang={setLang} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/courses" element={<Courses lang={lang} />} />
            <Route path="/dashboard" element={<Dashboard lang={lang} />} />
            <Route path="/admin" element={<Admin lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />
      </div>
    </Router>
  );
};

export default App;