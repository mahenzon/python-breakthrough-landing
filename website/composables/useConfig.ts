import type { SiteConfig } from '~/types/site-config'

export const useConfig = () => {
  // Use useState to share data between server and client
  const siteConfig = useState<SiteConfig | null>('siteConfig', () => null)
  
  const getConfig = async (): Promise<SiteConfig> => {
    // If data is already loaded, return it
    if (siteConfig.value) {
      return siteConfig.value
    }
    
    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'site-config.json')
      const content = readFileSync(filePath, 'utf-8')
      siteConfig.value = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/site-config.json')
      siteConfig.value = await response.json()
    }
    
    return siteConfig.value!
  }
  
  return {
    getConfig,
  }
}
