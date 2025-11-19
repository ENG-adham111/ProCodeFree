import React, { useEffect, useState } from 'react';
import { Search, Clock, BarChart, PlayCircle, CheckCircle } from 'lucide-react';
import { Course, Language } from '../types';
import { storageService } from '../services/storageService';
import { translations } from '../translations';

export const Courses: React.FC<{ lang: Language }> = ({ lang }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const t = translations[lang];

  useEffect(() => {
    setCourses(storageService.getCourses());
    const progress = storageService.getProgress();
    setEnrolledIds(progress.map(p => p.courseId));
  }, []);

  const handleEnroll = (id: string) => {
    storageService.enroll(id);
    setEnrolledIds(prev => [...prev, id]);
    // Optional: Show toast or navigate
  };

  const filteredCourses = courses.filter(c => {
    const term = search.toLowerCase();
    return (
      c.title.toLowerCase().includes(term) ||
      c.titleAr.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t.allCourses}</h1>
          <p className="text-gray-400">{t.missionText}</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`block w-full pl-10 pr-3 py-3 bg-brand-card border border-gray-700 rounded-xl leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary sm:text-sm transition-colors ${lang === 'ar' ? 'pr-10 pl-3' : ''}`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-brand-card/50 rounded-2xl border border-dashed border-gray-700">
          <p className="text-gray-500 text-lg">{t.noCourses}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
             const isEnrolled = enrolledIds.includes(course.id);
             return (
              <div key={course.id} className="bg-brand-card rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-xl group flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                    {course.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {lang === 'ar' ? course.titleAr : course.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
                    {lang === 'ar' ? course.descriptionAr : course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <BarChart size={16} className="text-brand-secondary" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-brand-accent" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => isEnrolled ? null : handleEnroll(course.id)}
                    disabled={isEnrolled}
                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      isEnrolled 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-default'
                        : 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle size={18} />
                        {t.continue}
                      </>
                    ) : (
                      <>
                        <PlayCircle size={18} />
                        {t.enroll}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};