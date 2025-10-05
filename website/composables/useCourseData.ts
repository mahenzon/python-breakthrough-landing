import type { Course, CourseStatistics, Module, Topic } from '~/types/course'

export const useCourseData = () => {
  // Use useState to share data between server and client
  const courseData = useState<Course>('courseData', () => ({ modules: [] }))
  const statsData = useState<CourseStatistics | null>('statsData', () => null)
  
  const getCourseData = async (): Promise<Course> => {
    // If data is already loaded, return it
    if (courseData.value.modules.length > 0) {
      return courseData.value
    }
    
    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'course.json')
      const content = readFileSync(filePath, 'utf-8')
      courseData.value = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/course.json')
      courseData.value = await response.json()
    }
    
    return courseData.value
  }
  
  const getStatistics = async (): Promise<CourseStatistics> => {
    // If stats are already loaded, return them
    if (statsData.value) {
      return statsData.value
    }
    
    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'stats.json')
      const content = readFileSync(filePath, 'utf-8')
      statsData.value = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/stats.json')
      statsData.value = await response.json()
    }
    
    return statsData.value!
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
