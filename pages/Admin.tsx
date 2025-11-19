import React, { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, Users, Book, Activity, LogOut } from 'lucide-react';
import { Course, CourseLevel, Language } from '../types';
import { storageService } from '../services/storageService';
import { translations } from '../translations';

export const Admin: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({ totalCourses: 0, activeUsers: 0, enrollments: 0 });
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    level: CourseLevel.Beginner,
    category: 'Frontend'
  });

  const t = translations[lang];

  useEffect(() => {
    const auth = localStorage.getItem('ppff_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setCourses(storageService.getCourses());
    setStats(storageService.getStats());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('ppff_admin_auth', 'true');
      loadData();
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ppff_admin_auth');
    setPassword('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      storageService.deleteCourse(id);
      loadData();
    }
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title && newCourse.description) {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title,
        titleAr: newCourse.titleAr || newCourse.title,
        description: newCourse.description,
        descriptionAr: newCourse.descriptionAr || newCourse.description,
        level: newCourse.level as CourseLevel,
        duration: newCourse.duration || '10 Hours',
        image: `https://picsum.photos/seed/${Date.now()}/400/250`,
        category: newCourse.category || 'General'
      };
      storageService.addCourse(course);
      setIsAdding(false);
      setNewCourse({ level: CourseLevel.Beginner, category: 'Frontend' });
      loadData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-brand-card p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-brand-primary/10 rounded-full">
              <Lock className="w-8 h-8 text-brand-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">{t.adminLogin}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-brand-dark border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                placeholder="admin123"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-medium transition-colors"
            >
              {t.login}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t.adminDashboard}</h1>
          <p className="text-gray-400">{t.welcomeAdmin}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={18} />
          {t.logout}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-brand-card p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-gray-400">{t.totalCourses}</p>
            <p className="text-3xl font-bold text-white">{stats.totalCourses}</p>
          </div>
          <Book className="w-10 h-10 text-brand-primary opacity-50" />
        </div>
        <div className="bg-brand-card p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-gray-400">{t.activeStudents}</p>
            <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
          </div>
          <Users className="w-10 h-10 text-brand-secondary opacity-50" />
        </div>
        <div className="bg-brand-card p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-gray-400">{t.totalEnrollments}</p>
            <p className="text-3xl font-bold text-white">{stats.enrollments}</p>
          </div>
          <Activity className="w-10 h-10 text-brand-accent opacity-50" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
        >
          <Plus size={20} />
          {t.addCourse}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-brand-card p-6 rounded-2xl border border-gray-800 mb-8 animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-4">{t.addCourse}</h3>
          <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder={t.title}
              className="p-3 bg-brand-dark border border-gray-700 rounded-lg text-white"
              value={newCourse.title || ''}
              onChange={e => setNewCourse({...newCourse, title: e.target.value})}
              required
            />
             <input
              placeholder={t.titleAr}
              className="p-3 bg-brand-dark border border-gray-700 rounded-lg text-white text-right"
              value={newCourse.titleAr || ''}
              onChange={e => setNewCourse({...newCourse, titleAr: e.target.value})}
            />
             <textarea
              placeholder={t.desc}
              className="p-3 bg-brand-dark border border-gray-700 rounded-lg text-white md:col-span-2"
              value={newCourse.description || ''}
              onChange={e => setNewCourse({...newCourse, description: e.target.value})}
              required
            />
            <select
              className="p-3 bg-brand-dark border border-gray-700 rounded-lg text-white"
              value={newCourse.level}
              onChange={e => setNewCourse({...newCourse, level: e.target.value as CourseLevel})}
            >
              {Object.values(CourseLevel).map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <input
              placeholder={t.duration}
              className="p-3 bg-brand-dark border border-gray-700 rounded-lg text-white"
              value={newCourse.duration || ''}
              onChange={e => setNewCourse({...newCourse, duration: e.target.value})}
            />
            <button type="submit" className="md:col-span-2 py-3 bg-brand-secondary text-white rounded-lg font-bold mt-2">
              {t.save}
            </button>
          </form>
        </div>
      )}

      {/* Course List */}
      <div className="bg-brand-card rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-gray-400">
          <thead className="bg-gray-800/50 text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">{t.title}</th>
              <th className="px-6 py-4">{t.level}</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-800/30">
                <td className="px-6 py-4 font-medium text-white">
                  {lang === 'en' ? course.title : course.titleAr}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.level === CourseLevel.Beginner ? 'bg-green-500/10 text-green-500' :
                    course.level === CourseLevel.Intermediate ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {course.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};