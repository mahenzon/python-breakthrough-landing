export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface AuthorInfo {
  name: string;
  bio: string;
  avatar?: string;
  links: SocialLink[];
}

export interface CourseInfo {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface SiteConfig {
  author: AuthorInfo;
  course: CourseInfo;
  statistics: {
    numberOfStudents: number;
  };
}
