import type { StudentProject } from '~/types/content'

let cachedProjects: StudentProject[] | null = null

export const useProjectsData = () => {
  const getProjects = async (): Promise<StudentProject[]> => {
    if (import.meta.server) {
      if (!cachedProjects) {
        const { join } = await import('path')
        const { readFileSync } = await import('fs')
        const yaml = await import('js-yaml')
        
        const projectsPath = join(process.cwd(), 'content', 'projects.yaml')
        const content = readFileSync(projectsPath, 'utf8')
        cachedProjects = yaml.load(content) as StudentProject[]
        cachedProjects.sort((a, b) => a.order - b.order)
      }
      return cachedProjects!
    }
    
    // Client-side placeholder
    return []
  }
  
  return {
    getProjects,
  }
}
