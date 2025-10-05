import type { SiteConfig } from '~/types/site-config'

export const useConfig = () => {
  // Use useState to share data between server and client
  const siteConfig = useState<SiteConfig | null>('siteConfig', () => null)
  
  const getConfig = async (): Promise<SiteConfig> => {
    // If data is already loaded, return it
    if (siteConfig.value) {
      return siteConfig.value
    }
    
    // Load data on server side
    if (import.meta.server) {
      const { join } = await import('path')
      const { readFileSync } = await import('fs')
      const yaml = await import('js-yaml')
      
      const configPath = join(process.cwd(), 'content', 'site-config.yaml')
      const content = readFileSync(configPath, 'utf8')
      siteConfig.value = yaml.load(content) as SiteConfig
      return siteConfig.value
    }
    
    // On client side, return the value from useState (populated by server)
    // Fallback to minimal config if somehow not available
    return siteConfig.value || {
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
