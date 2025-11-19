export interface Book {
  id: string;
  title: string;
  coverUrl: string;
  link: string;
  description?: string;
}

export interface Article {
  id: string;
  title: string;
  link: string;
  publishedDate?: string;
  publication?: string;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  email?: string;
}

export interface AuthorProfile {
  name: string;
  bio: string;
  tagline: string;
  avatarUrl: string;
  coverImageUrl: string;
  themeColor: string; // Hex code or tailwind class prefix
  social: SocialLinks;
  books: Book[];
  articles: Article[];
}

export type Language = 'en' | 'ar';

export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
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

export interface Progress {
  courseId: string;
  completed: boolean;
}

export const DEFAULT_PROFILE: AuthorProfile = {
  name: "Elena Vance",
  tagline: "Bestselling Author of 'The Silent Echo'",
  bio: "Elena Vance is a contemporary fiction writer based in Seattle. Her work explores the complexities of human connection in the digital age. When she's not writing, she's probably hiking or brewing excessive amounts of coffee.",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  themeColor: "stone",
  social: {
    twitter: "https://twitter.com",
    email: "hello@example.com",
    website: "https://example.com"
  },
  books: [
    {
      id: "1",
      title: "The Silent Echo",
      coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      link: "#",
      description: "A mystery that unravels across three decades."
    },
    {
      id: "2",
      title: "Digital Dust",
      coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      link: "#",
      description: "How technology is rewriting our memories."
    }
  ],
  articles: [
    {
      id: "1",
      title: "Why I Stopped Plotting My Novels",
      publication: "The Writer's Digest",
      link: "#",
      publishedDate: "2023-11-15"
    },
    {
      id: "2",
      title: "The Art of the First Draft",
      publication: "Medium",
      link: "#",
      publishedDate: "2023-10-02"
    }
  ]
};