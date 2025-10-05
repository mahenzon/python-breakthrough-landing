import type { SiteConfig } from '~/types/site-config'

let cachedConfig: SiteConfig | null = null

export function useConfig() {
  function getConfig(): SiteConfig {
    if (import.meta.server) {
      if (!cachedConfig) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { join } = require('path')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { loadYamlFile } = require('../utils/yaml-loader')
        const configPath = join(process.cwd(), 'content', 'site-config.yaml')
        cachedConfig = loadYamlFile<SiteConfig>(configPath)
      }
      return cachedConfig!
    }
    
    // On client side, data should be in the rendered HTML
    // Return a minimal placeholder to prevent errors
    return {
      author: {
        name: '',
        bio: '',
        links: [],
      },
      course: {
        title: '',
        subtitle: '',
        description: '',
        features: [],
      },
      statistics: {
        numberOfStudents: 0,
      },
    }
  }
  
  return {
    getConfig,
  }
}
