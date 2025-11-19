import React, { useEffect, useState } from 'react';
import { Award, BookOpen, CheckSquare, Trophy } from 'lucide-react';
import { Course, StudentProgress, Language } from '../types';
import { storageService } from '../services/storageService';
import { translations } from '../translations';

export const Dashboard: React.FC<{ lang: Language }> = ({ lang }) => {
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const t = translations[lang];

  useEffect(() => {
    setProgress(storageService.getProgress());
    setCourses(storageService.getCourses());
  }, []);

  const getCourseDetails = (id: string) => courses.find(c => c.id === id);

  // Mock function to simulate lesson completion
  const advanceProgress = (courseId: string, current: number) => {
    const newVal = current + 1;
    storageService.updateProgress(courseId, newVal);
    setProgress(storageService.getProgress());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">{t.dashboard}</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          icon={<BookOpen className="text-blue-400" />} 
          label={t.myLearning} 
          value={progress.length.toString()} 
        />
        <StatCard 
          icon={<CheckSquare className="text-purple-400" />} 
          label={t.completed} 
          value={progress.filter(p => p.isCompleted).length.toString()} 
        />
        <StatCard 
          icon={<Award className="text-yellow-400" />} 
          label={t.certificates} 
          value={progress.filter(p => p.isCompleted).length.toString()} 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content: Enrolled Courses */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-brand-primary" />
            {t.myLearning}
          </h2>
          
          {progress.length === 0 ? (
             <div className="bg-brand-card p-8 rounded-2xl border border-gray-800 text-center">
               <p className="text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
             </div>
          ) : (
            progress.map(p => {
              const course = getCourseDetails(p.courseId);
              if (!course) return null;
              const percent = Math.round((p.completedLessons / p.totalLessons) * 100);

              return (
                <div key={p.courseId} className="bg-brand-card p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {lang === 'ar' ? course.titleAr : course.title}
                      </h3>
                      <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded mt-1 inline-block">
                        {course.level}
                      </span>
                    </div>
                    {p.isCompleted && <Award className="text-yellow-400 w-8 h-8" />}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>{t.progress}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2.5 rounded-full transition-all duration-1000" 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => !p.isCompleted && advanceProgress(p.courseId, p.completedLessons)}
                    disabled={p.isCompleted}
                    className="text-sm font-medium text-brand-accent hover:text-brand-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {p.isCompleted ? t.completed : '+ Simulate completing a lesson'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar: Tasks */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-brand-secondary" />
            {t.tasks}
          </h2>
          <div className="bg-brand-card p-6 rounded-2xl border border-gray-800">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Complete HTML Quiz</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                <span>Submit React Project</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                <span>Review Java Syntax</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 p-6 rounded-2xl border border-brand-primary/20">
            <h3 className="font-bold text-white mb-2">Pro Tip</h3>
            <p className="text-sm text-gray-300">Consistency is key. Try to code for at least 30 minutes every day to build muscle memory.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-brand-card p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
    <div className="p-3 bg-gray-800/50 rounded-xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);