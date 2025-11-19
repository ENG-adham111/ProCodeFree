export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  level: CourseLevel;
  duration: string;
  image: string;
  category: string;
}

export interface StudentProgress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  isCompleted: boolean;
}

export type Language = 'en' | 'ar';

export const INITIAL_COURSES: Course[] = [
  {
    id: '1',
    title: 'HTML & CSS Mastery',
    titleAr: 'HTML & CSS احتراف',
    description: 'Build beautiful websites from scratch using modern HTML5 and CSS3 techniques.',
    descriptionAr: 'قم ببناء مواقع ويب جميلة من الصفر باستخدام تقنيات HTML5 و CSS3 الحديثة.',
    level: CourseLevel.Beginner,
    duration: '15 Hours',
    image: 'https://picsum.photos/id/1/400/250',
    category: 'Frontend'
  },
  {
    id: '2',
    title: 'JavaScript Essentials',
    titleAr: 'أساسيات الجافا سكريبت',
    description: 'Master the logic of the web. Variables, loops, functions, and DOM manipulation.',
    descriptionAr: 'أتقن منطق الويب. المتغيرات، الحلقات، الدوال، والتعامل مع DOM.',
    level: CourseLevel.Beginner,
    duration: '20 Hours',
    image: 'https://picsum.photos/id/3/400/250',
    category: 'Frontend'
  },
  {
    id: '3',
    title: 'React JS Zero to Hero',
    titleAr: 'React JS من الصفر حتى الاحتراف',
    description: 'Build dynamic single-page applications with React and Hooks.',
    descriptionAr: 'قم ببناء تطبيقات الصفحة الواحدة الديناميكية باستخدام React و Hooks.',
    level: CourseLevel.Intermediate,
    duration: '25 Hours',
    image: 'https://picsum.photos/id/180/400/250',
    category: 'Frontend'
  },
  {
    id: '4',
    title: 'Python for Data Science',
    titleAr: 'بايثون لعلوم البيانات',
    description: 'Learn Python programming for data analysis, visualization, and machine learning.',
    descriptionAr: 'تعلم برمجة بايثون لتحليل البيانات، التصور، والتعلم الآلي.',
    level: CourseLevel.Beginner,
    duration: '30 Hours',
    image: 'https://picsum.photos/id/20/400/250',
    category: 'Data Science'
  },
  {
    id: '5',
    title: 'Java Enterprise',
    titleAr: 'تطبيقات جافا للمؤسسات',
    description: 'Deep dive into Java, OOP, and backend development.',
    descriptionAr: 'تعمق في جافا، البرمجة كائنية التوجه، وتطوير الواجهة الخلفية.',
    level: CourseLevel.Advanced,
    duration: '40 Hours',
    image: 'https://picsum.photos/id/60/400/250',
    category: 'Backend'
  }
];