import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  useEffect(() => {
    storageService.init();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;