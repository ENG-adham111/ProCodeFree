import { Course, StudentProgress, INITIAL_COURSES } from '../types';

const KEYS = {
  COURSES: 'ppff_courses',
  PROGRESS: 'ppff_progress',
};

export const storageService = {
  // Initialize Data
  init: () => {
    if (!localStorage.getItem(KEYS.COURSES)) {
      localStorage.setItem(KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    }
    if (!localStorage.getItem(KEYS.PROGRESS)) {
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify([]));
    }
  },

  // Course Operations
  getCourses: (): Course[] => {
    const data = localStorage.getItem(KEYS.COURSES);
    return data ? JSON.parse(data) : [];
  },

  addCourse: (course: Course) => {
    const courses = storageService.getCourses();
    courses.push(course);
    localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
  },

  deleteCourse: (id: string) => {
    let courses = storageService.getCourses();
    courses = courses.filter(c => c.id !== id);
    localStorage.setItem(KEYS.COURSES, JSON.stringify(courses));
  },

  // Progress Operations
  getProgress: (): StudentProgress[] => {
    const data = localStorage.getItem(KEYS.PROGRESS);
    return data ? JSON.parse(data) : [];
  },

  enroll: (courseId: string) => {
    const progress = storageService.getProgress();
    if (!progress.find(p => p.courseId === courseId)) {
      progress.push({
        courseId,
        completedLessons: 0,
        totalLessons: 20, // Mock total
        isCompleted: false
      });
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
    }
  },

  updateProgress: (courseId: string, completed: number) => {
    const progress = storageService.getProgress();
    const idx = progress.findIndex(p => p.courseId === courseId);
    if (idx !== -1) {
      progress[idx].completedLessons = completed;
      if (completed >= progress[idx].totalLessons) {
        progress[idx].isCompleted = true;
      }
      localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
    }
  },
  
  getStats: () => {
     const courses = storageService.getCourses();
     // Mocking user count since we don't have real auth/multi-user
     const users = 1240; 
     const progress = storageService.getProgress();
     return {
         totalCourses: courses.length,
         activeUsers: users,
         enrollments: progress.length + 350 // Mock existing enrollments
     }
  }
};