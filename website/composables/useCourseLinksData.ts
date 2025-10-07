import type { CourseLinksData } from '~/types/content'

export const useCourseLinksData = () => {
  const courseLinksData = useState<CourseLinksData | null>('courseLinksData', () => null)

  const getCourseLinksData = async (): Promise<CourseLinksData> => {
    if (courseLinksData.value) {
      return courseLinksData.value
    }

    if (import.meta.server) {
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'course-links.json')
      const content = readFileSync(filePath, 'utf-8')
      courseLinksData.value = JSON.parse(content)
    } else {
      const response = await fetch('/data/course-links.json')
      courseLinksData.value = await response.json()
    }

    return courseLinksData.value!
  }

  return {
    getCourseLinksData,
  }
}
