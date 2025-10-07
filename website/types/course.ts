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

// Development status types
export type ModuleStatus = 'ready' | 'in_development' | null;

export interface GhostModuleConfig {
  enabled: boolean;
  customText?: string;
}

export interface GhostTopicConfig {
  enabled: boolean;
  customText?: string;
}

export interface Module {
  name: string;
  description: string;
  order: number;
  topics: Topic[];
  id: string; // Derived from folder name
  status?: ModuleStatus; // Development status
  ghostTopic?: GhostTopicConfig; // Ghost topic configuration
}

export interface Course {
  modules: Module[];
  ghostModule?: GhostModuleConfig; // Ghost module configuration
}

export interface CourseStatistics {
  totalLessons: number;
  totalDurationMinutes: number;
  totalDurationFormatted: string;
  numberOfStudents: number;
  totalTasks: number;
  modulesCount: number;
  topicsCount: number;
}
