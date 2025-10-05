import { join } from 'path'
import type { StudentProject } from '~/types/content'
import { loadYamlFile } from '~/utils/yaml-loader'

let cachedProjects: StudentProject[] | null = null

export function useProjectsData() {
  function getProjects(): StudentProject[] {
    if (!cachedProjects) {
      const projectsPath = join(process.cwd(), 'content', 'projects.yaml')
      cachedProjects = loadYamlFile<StudentProject[]>(projectsPath)
      cachedProjects.sort((a, b) => a.order - b.order)
    }
    return cachedProjects
  }
  
  return {
    getProjects,
  }
}
