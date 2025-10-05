import { join } from 'path';
import type { Course, CourseStatistics, Module, Topic } from '~/types/course';
import { parseCourseData } from '~/utils/course-parser';
import { calculateStatistics } from '~/utils/stats-calculator';

let cachedCourse: Course | null = null;
let cachedStats: CourseStatistics | null = null;

export function useCourseData() {
  function getCourseData(): Course {
    if (!cachedCourse) {
      const courseDataPath = join(process.cwd(), '..', 'course-data');
      cachedCourse = parseCourseData(courseDataPath);
    }
    return cachedCourse;
  }
  
  function getStatistics(numberOfStudents: number): CourseStatistics {
    if (!cachedStats) {
      const course = getCourseData();
      cachedStats = calculateStatistics(course, numberOfStudents);
    }
    return cachedStats;
  }
  
  function getModuleById(moduleId: string): Module | undefined {
    const course = getCourseData();
    return course.modules.find(m => m.id === moduleId);
  }
  
  function getTopicById(moduleId: string, topicId: string): Topic | undefined {
    const module = getModuleById(moduleId);
    return module?.topics.find(t => t.id === topicId);
  }
  
  return {
    getCourseData,
    getStatistics,
    getModuleById,
    getTopicById
  };
}
