import { AuthorProfile, DEFAULT_PROFILE, Course, CourseLevel, Progress } from '../types';

const STORAGE_KEY = 'web_author_profile';
const COURSES_KEY = 'ppff_courses';
const PROGRESS_KEY = 'ppff_progress';

const DEFAULT_COURSES: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    titleAr: 'مقدمة في React',
    description: 'Learn the basics of React with this comprehensive guide for beginners.',
    descriptionAr: 'تعلم أساسيات React مع هذا الدليل الشامل للمبتدئين.',
    level: CourseLevel.Beginner,
    duration: '5 Hours',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Frontend'
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    titleAr: 'TypeScript المتقدمة',
    description: 'Master TypeScript generics, decorators, and advanced types.',
    descriptionAr: 'أتقن TypeScript generics و decorators والأنواع المتقدمة.',
    level: CourseLevel.Advanced,
    duration: '8 Hours',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Frontend'
  }
];

export const storageService = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
    }
    if (!localStorage.getItem(COURSES_KEY)) {
      localStorage.setItem(COURSES_KEY, JSON.stringify(DEFAULT_COURSES));
    }
    if (!localStorage.getItem(PROGRESS_KEY)) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify([]));
    }
  },

  getProfile: (): AuthorProfile => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  },

  saveProfile: (profile: AuthorProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  },

  resetProfile: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  },

  // Course related methods
  getCourses: (): Course[] => {
    const data = localStorage.getItem(COURSES_KEY);
    return data ? JSON.parse(data) : [];
  },

  addCourse: (course: Course) => {
    const courses = storageService.getCourses();
    courses.push(course);
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  },

  deleteCourse: (id: string) => {
    const courses = storageService.getCourses();
    const updatedCourses = courses.filter(c => c.id !== id);
    localStorage.setItem(COURSES_KEY, JSON.stringify(updatedCourses));
  },

  // Progress related methods
  getProgress: (): Progress[] => {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : [];
  },

  enroll: (courseId: string) => {
    const progress = storageService.getProgress();
    if (!progress.find(p => p.courseId === courseId)) {
      progress.push({ courseId, completed: false });
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
  },

  getStats: () => {
    const courses = storageService.getCourses();
    const progress = storageService.getProgress();
    return {
      totalCourses: courses.length,
      activeUsers: progress.length > 0 ? 1 : 0, // Mock for single user
      enrollments: progress.length
    };
  }
};