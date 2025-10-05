import type { StudentProject } from '~/types/content'

export const useProjectsData = () => {
  // Use useState to share data between server and client
  const projects = useState<StudentProject[]>('projects', () => [])
  
  const getProjects = async (): Promise<StudentProject[]> => {
    // If data is already loaded, return it
    if (projects.value.length > 0) {
      return projects.value
    }
    
    // Load data on server side
    if (import.meta.server) {
      const { join } = await import('path')
      const { readFileSync } = await import('fs')
      const yaml = await import('js-yaml')
      
      const projectsPath = join(process.cwd(), 'content', 'projects.yaml')
      const content = readFileSync(projectsPath, 'utf8')
      projects.value = yaml.load(content) as StudentProject[]
      projects.value.sort((a, b) => a.order - b.order)
      return projects.value
    }
    
    // On client side, return the value from useState
    return projects.value
  }
  
  return {
    getProjects,
  }
}
