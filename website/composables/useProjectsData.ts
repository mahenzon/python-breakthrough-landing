import type { StudentProject, CourseProject } from '~/types/content'

export const useProjectsData = () => {
  // Use useState to share data between server and client
  const studentProjects = useState<StudentProject[]>('student-projects', () => [])
  const courseProjects = useState<CourseProject[]>('course-projects', () => [])

  const getStudentProjects = async (): Promise<StudentProject[]> => {
    // If data is already loaded, return it
    if (studentProjects.value.length > 0) {
      return studentProjects.value
    }

    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'students-projects.json')
      const content = readFileSync(filePath, 'utf-8')
      studentProjects.value = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/students-projects.json')
      studentProjects.value = await response.json()
    }

    return studentProjects.value
  }

  const getCourseProjects = async (): Promise<CourseProject[]> => {
    // If data is already loaded, return it
    if (courseProjects.value.length > 0) {
      return courseProjects.value
    }

    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'course-projects.json')
      const content = readFileSync(filePath, 'utf-8')
      courseProjects.value = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/course-projects.json')
      courseProjects.value = await response.json()
    }

    return courseProjects.value
  }

  return {
    getStudentProjects,
    getCourseProjects,
  }
}
