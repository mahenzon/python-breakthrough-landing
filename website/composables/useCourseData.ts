import type { Course, CourseStatistics, GhostModuleConfig, Module, ModuleStatus, Topic } from '~/types/course'

// Interface for modules.yaml structure
interface ModulesYAMLStructure {
  ghostModule?: {
    enabled?: boolean
    customText?: string
  }
  modules: {
    [key: string]: {
      status?: 'ready' | 'in_development'
      ghostTopic?: {
        enabled?: boolean
        customText?: string
      }
      tech: Array<{
        'icon-name': string
        text: string
      }>
    }
  }
}

export const useCourseData = () => {
  // Use useState to share data between server and client
  const courseData = useState<Course>('courseData', () => ({ modules: [] }))
  const statsData = useState<CourseStatistics | null>('statsData', () => null)
  const modulesConfig = useState<ModulesYAMLStructure | null>('modulesConfig', () => null)
  
  // Load modules configuration from YAML
  const loadModulesConfig = async (): Promise<ModulesYAMLStructure> => {
    if (modulesConfig.value) {
      return modulesConfig.value
    }

    if (import.meta.server) {
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const yaml = await import('js-yaml')
      const filePath = join(process.cwd(), 'content', 'modules.yaml')
      const content = readFileSync(filePath, 'utf-8')
      modulesConfig.value = yaml.load(content) as ModulesYAMLStructure
    } else {
      // On client, modules config is embedded in the course data
      // We'll need to fetch it separately or embed it in the build
      modulesConfig.value = { modules: {} }
    }

    return modulesConfig.value
  }

  const getCourseData = async (): Promise<Course> => {
    // If data is already loaded, return it
    if (courseData.value.modules.length > 0) {
      return courseData.value
    }
    
    // Load course structure
    let baseCourse: Course
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'course.json')
      const content = readFileSync(filePath, 'utf-8')
      baseCourse = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/course.json')
      baseCourse = await response.json()
    }

    // Load and merge modules configuration
    const config = await loadModulesConfig()
    
    // Merge module configurations
    baseCourse.modules = baseCourse.modules.map((module) => {
      const moduleConfig = config.modules[module.id] || {}
      return {
        ...module,
        status: (moduleConfig.status || 'ready') as ModuleStatus,
        ghostTopic: moduleConfig.ghostTopic || { enabled: false },
      }
    })

    // Add ghost module config
    baseCourse.ghostModule = {
      enabled: config.ghostModule?.enabled || false,
      customText: config.ghostModule?.customText,
    }
    
    courseData.value = baseCourse
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
  
  const getGhostModuleConfig = async (): Promise<GhostModuleConfig> => {
    const course = await getCourseData()
    return course.ghostModule || { enabled: false }
  }

  return {
    getCourseData,
    getStatistics,
    getModuleById,
    getTopicById,
    getGhostModuleConfig,
  }
}
