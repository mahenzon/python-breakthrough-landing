import type { TechnologyStackData } from '~/types/content'

const defaultTechnologyStack: TechnologyStackData = {
  title: '',
  categories: [],
}

export const useTechnologyStackData = () => {
  const technologyStack = useState<TechnologyStackData | null>('technology-stack', () => null)

  const getTechnologyStackData = async (): Promise<TechnologyStackData> => {
    if (technologyStack.value) {
      return technologyStack.value
    }

    try {
      if (import.meta.server) {
        const { readFileSync } = await import('fs')
        const { join } = await import('path')
        const filePath = join(process.cwd(), 'public', 'data', 'technology-stack.json')
        const content = readFileSync(filePath, 'utf-8')
        technologyStack.value = JSON.parse(content) as TechnologyStackData
      } else {
        const response = await fetch('/data/technology-stack.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        technologyStack.value = await response.json()
      }
    } catch (error) {
      console.error('Failed to load technology stack data:', error)
      technologyStack.value = defaultTechnologyStack
    }

    return technologyStack.value ?? defaultTechnologyStack
  }

  return {
    getTechnologyStackData,
  }
}
