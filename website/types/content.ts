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

export interface TechnologyStackItem {
  title: string;
  icon?: string;
  path: string;
}

export interface TechnologyStackCategory {
  title: string;
  icon: string;
  path: string;
  items: TechnologyStackItem[];
}

export interface TechnologyStackData {
  title: string;
  subtitle?: string;
  categories: TechnologyStackCategory[];
}
