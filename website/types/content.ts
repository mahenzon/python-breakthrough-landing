export interface FaqItem {
  question: string;
  answer: string;
}

export interface StudentProject {
  title: string;
  description: string;
  url: string;
  author?: string;
  order: number;
}

export interface CourseProject {
  id: string;
  title: string;
  description: string;
  url: string;
  status: 'available' | 'coming_soon';
  order: number;
}
