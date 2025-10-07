import type { HomeContent } from '~/types/content'

export const useHomeContent = () => {
  const homeContent = useState<HomeContent | null>('homeContent', () => null)

  const getHomeContent = async (): Promise<HomeContent> => {
    if (homeContent.value) {
      return homeContent.value
    }

    if (import.meta.server) {
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'home-content.json')
      const content = readFileSync(filePath, 'utf-8')
      homeContent.value = JSON.parse(content)
    } else {
      const response = await fetch('/data/home-content.json')
      homeContent.value = await response.json()
    }

    return homeContent.value!
  }

  return {
    getHomeContent,
  }
}
