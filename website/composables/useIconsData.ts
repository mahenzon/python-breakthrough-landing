import type { Icon } from '~/types/content'

/**
 * Default empty icons array for fallback
 */
const defaultIcons: Icon[] = []

/**
 * Composable for loading and accessing icons data
 * Icons data is loaded from /data/icons.json
 */
export const useIconsData = () => {
  // Global state (cached across component instances)
  const icons = useState<Icon[] | null>('icons-data', () => null)

  /**
   * Get all icons data
   * Loads from JSON file and caches result
   */
  const getIcons = async (): Promise<Icon[]> => {
    // Return cached data if available
    if (icons.value) {
      return icons.value
    }

    try {
      // Server-side: read from file system
      if (import.meta.server) {
        const { readFileSync } = await import('fs')
        const { join } = await import('path')
        const filePath = join(process.cwd(), 'public', 'data', 'icons.json')
        const content = readFileSync(filePath, 'utf-8')
        icons.value = JSON.parse(content) as Icon[]
      }
      // Client-side: fetch from API
      else {
        const response = await fetch('/data/icons.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        icons.value = await response.json()
      }
    } catch (error) {
      console.error('Failed to load icons data:', error)
      icons.value = defaultIcons
    }

    return icons.value ?? defaultIcons
  }

  /**
   * Get a single icon by name
   * @param name - Icon name (e.g., "FastAPI", "Python")
   */
  const getIconByName = async (name: string): Promise<Icon | undefined> => {
    const iconsData = await getIcons()
    return iconsData.find(icon => icon.name === name)
  }

  /**
   * Get multiple icons by names
   * @param names - Array of icon names
   */
  const getIconsByNames = async (names: string[]): Promise<Icon[]> => {
    const iconsData = await getIcons()
    const iconMap = new Map(iconsData.map(icon => [icon.name, icon]))
    return names
      .map(name => iconMap.get(name))
      .filter((icon): icon is Icon => icon !== undefined)
  }

  /**
   * Create icon lookup map for efficient access
   */
  const getIconsMap = async (): Promise<Map<string, Icon>> => {
    const iconsData = await getIcons()
    return new Map(iconsData.map(icon => [icon.name, icon]))
  }

  return {
    getIcons,
    getIconByName,
    getIconsByNames,
    getIconsMap,
  }
}
