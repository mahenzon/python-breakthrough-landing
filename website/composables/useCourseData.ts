import type { Course, CourseStatistics, Module, Topic } from '~/types/course'

export function useCourseData() {
  function getCourseData(): Course {
    // During static generation, this will be provided by the server
    // For now, return a placeholder that will be replaced during build
    if (import.meta.server) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { join } = require('path')
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { parseCourseData } = require('~/utils/course-parser')
      const courseDataPath = join(process.cwd(), '..', 'course-data')
      return parseCourseData(courseDataPath)
    }
    // On client side (after hydration), data will be in the rendered HTML
    return { modules: [] }
  }
  
  function getStatistics(numberOfStudents: number): CourseStatistics {
    if (import.meta.server) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { calculateStatistics } = require('~/utils/stats-calculator')
      const course = getCourseData()
      return calculateStatistics(course, numberOfStudents)
    }
    // Placeholder for client-side
    return {
      totalLessons: 0,
      totalVideos: 0,
      totalDurationMinutes: 0,
      totalDurationFormatted: '0 ч 0 мин',
      numberOfStudents: 0,
      totalTasks: 0,
      modulesCount: 0,
      topicsCount: 0,
    }
  }
  
  function getModuleById(moduleId: string): Module | undefined {
    const course = getCourseData()
    return course.modules.find(m => m.id === moduleId)
  }
  
  function getTopicById(moduleId: string, topicId: string): Topic | undefined {
    const module = getModuleById(moduleId)
    return module?.topics.find(t => t.id === topicId)
  }
  
  return {
    getCourseData,
    getStatistics,
    getModuleById,
    getTopicById,
  }
}
