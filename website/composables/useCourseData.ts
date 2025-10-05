import type { Course, CourseStatistics, Module, Topic } from '~/types/course'

export const useCourseData = () => {
  // Use useState to share data between server and client
  const courseData = useState<Course>('courseData', () => ({ modules: [] }))
  
  const getCourseData = async (): Promise<Course> => {
    // If data is already loaded, return it
    if (courseData.value.modules.length > 0) {
      return courseData.value
    }
    
    // Load data on server side
    if (import.meta.server) {
      const { join } = await import('path')
      const { parseCourseData } = await import('~/utils/course-parser')
      const courseDataPath = join(process.cwd(), '..', 'course-data')
      courseData.value = parseCourseData(courseDataPath)
      return courseData.value
    }
    
    // On client side, the data should already be in useState from server
    return courseData.value
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
