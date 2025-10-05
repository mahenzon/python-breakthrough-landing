import type { StudentProject } from '~/types/content'

export const useProjectsData = () => {
  // Use useState to share data between server and client
  const projects = useState<StudentProject[]>('projects', () => [])
  
  const getProjects = async (): Promise<StudentProject[]> => {
    // If data is already loaded, return it
    if (projects.value.length > 0) {
      return projects.value
    }
    
    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'projects.json')
      const content = readFileSync(filePath, 'utf-8')
      projects.value = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/projects.json')
      projects.value = await response.json()
    }
    
    projects.value.sort((a, b) => a.order - b.order)
    return projects.value
  }
  
  return {
    getProjects,
  }
}
