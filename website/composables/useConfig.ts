import type { SiteConfig } from '~/types/site-config'

let cachedConfig: SiteConfig | null = null

export const useConfig = () => {
  const getConfig = async (): Promise<SiteConfig> => {
    if (import.meta.server) {
      if (!cachedConfig) {
        const { join } = await import('path')
        const { readFileSync } = await import('fs')
        const yaml = await import('js-yaml')
        
        const configPath = join(process.cwd(), 'content', 'site-config.yaml')
        const content = readFileSync(configPath, 'utf8')
        cachedConfig = yaml.load(content) as SiteConfig
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
