import type { Course, CourseStatistics, Module, Topic } from '~/types/course'

let cachedCourse: Course | null = null

export const useCourseData = () => {
  const getCourseData = async (): Promise<Course> => {
    // During static generation, this will be provided by the server
    // For now, return a placeholder that will be replaced during build
    if (import.meta.server) {
      if (!cachedCourse) {
        const { join } = await import('path')
        const { parseCourseData } = await import('~/utils/course-parser')
        const courseDataPath = join(process.cwd(), '..', 'course-data')
        cachedCourse = parseCourseData(courseDataPath)
      }
      return cachedCourse
    }
    // On client side (after hydration), data will be in the rendered HTML
    return { modules: [] }
  }
  
  const getStatistics = async (numberOfStudents: number): Promise<CourseStatistics> => {
    if (import.meta.server) {
      const { calculateStatistics } = await import('~/utils/stats-calculator')
      const course = await getCourseData()
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
  
  const getModuleById = async (moduleId: string): Promise<Module | undefined> => {
    const course = await getCourseData()
    return course.modules.find(m => m.id === moduleId)
  }
  
  const getTopicById = async (moduleId: string, topicId: string): Promise<Topic | undefined> => {
    const module = await getModuleById(moduleId)
    return module?.topics.find(t => t.id === topicId)
  }
  
  return {
    getCourseData,
    getStatistics,
    getModuleById,
    getTopicById,
  }
}
