import type { ModuleTechData, ModuleTech, EnrichedModuleTech } from '~/types/content'

/**
 * Default empty module tech data for fallback
 */
const defaultModuleTechData: ModuleTechData = {
  modules: {},
}

/**
 * Composable for loading and accessing module technology mapping data
 * Module tech data maps module IDs to their associated technologies
 */
export const useModuleTechData = () => {
  // Global state (cached across component instances)
  const moduleTechData = useState<ModuleTechData | null>('module-tech-data', () => null)

  /**
   * Get all module tech data
   * Loads from JSON file and caches result
   */
  const getModuleTechData = async (): Promise<ModuleTechData> => {
    // Return cached data if available
    if (moduleTechData.value) {
      return moduleTechData.value
    }

    try {
      // Server-side: read from file system
      if (import.meta.server) {
        const { readFileSync } = await import('fs')
        const { join } = await import('path')
        const filePath = join(process.cwd(), 'public', 'data', 'modules-tech.json')
        const content = readFileSync(filePath, 'utf-8')
        moduleTechData.value = JSON.parse(content) as ModuleTechData
      }
      // Client-side: fetch from API
      else {
        const response = await fetch('/data/modules-tech.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        moduleTechData.value = await response.json()
      }
    } catch (error) {
      console.error('Failed to load module tech data:', error)
      moduleTechData.value = defaultModuleTechData
    }

    return moduleTechData.value ?? defaultModuleTechData
  }

  /**
   * Get technology list for a specific module
   * @param moduleId - Module ID (e.g., "01-введение")
   */
  const getModuleTech = async (moduleId: string): Promise<ModuleTech[]> => {
    const data = await getModuleTechData()
    return data.modules[moduleId]?.tech || []
  }

  /**
   * Get enriched (merged with icons) technology list for a module
   * @param moduleId - Module ID
   */
  const getEnrichedModuleTech = async (moduleId: string): Promise<EnrichedModuleTech[]> => {
    const { getIconsMap } = useIconsData()

    const moduleTech = await getModuleTech(moduleId)
    const iconsMap = await getIconsMap()

    return moduleTech.map(tech => {
      const icon = iconsMap.get(tech['icon-name'])
      return {
        ...tech,
        name: tech['icon-name'],
        icon: icon?.icon || '❓',
        path: icon?.path || '',
      }
    })
  }

  /**
   * Check if module has any technologies configured
   * @param moduleId - Module ID
   */
  const hasModuleTech = async (moduleId: string): Promise<boolean> => {
    const moduleTech = await getModuleTech(moduleId)
    return moduleTech.length > 0
  }

  return {
    getModuleTechData,
    getModuleTech,
    getEnrichedModuleTech,
    hasModuleTech,
  }
}
