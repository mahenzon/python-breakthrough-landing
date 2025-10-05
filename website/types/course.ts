export interface Lesson {
  name: string;
  duration_minutes: number;
  tasks: number;
  order: number;
}

export interface Topic {
  name: string;
  description: string;
  order: number;
  lessons: Lesson[];
  id: string; // Derived from filename
}

export interface Module {
  name: string;
  description: string;
  order: number;
  topics: Topic[];
  id: string; // Derived from folder name
}

export interface Course {
  modules: Module[];
}

export interface CourseStatistics {
  totalLessons: number;
  totalVideos: number;
  totalDurationMinutes: number;
  totalDurationFormatted: string;
  numberOfStudents: number;
  totalTasks: number;
  modulesCount: number;
  topicsCount: number;
}
