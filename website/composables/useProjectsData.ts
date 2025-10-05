import type { StudentProject } from '~/types/content'

let cachedProjects: StudentProject[] | null = null

export function useProjectsData() {
  function getProjects(): StudentProject[] {
    if (import.meta.server) {
      if (!cachedProjects) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { join } = require('path')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { loadYamlFile } = require('~/utils/yaml-loader')
        const projectsPath = join(process.cwd(), 'content', 'projects.yaml')
        cachedProjects = loadYamlFile<StudentProject[]>(projectsPath)
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
