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

export interface OpenGraphInfo {
  title: string;
  description: string;
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
  og: OpenGraphInfo;
  statistics: {
    numberOfStudents: number;
  };
}
