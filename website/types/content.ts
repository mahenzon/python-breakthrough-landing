export interface FaqItem {
  question: string;
  answer: string;
  order: number;
}

export interface StudentProject {
  title: string;
  description: string;
  url: string;
  author?: string;
  order: number;
}
