import { join } from 'path'
import type { SiteConfig } from '~/types/site-config'
import { loadYamlFile } from '~/utils/yaml-loader'

let cachedConfig: SiteConfig | null = null

export function useSiteConfig() {
  function getSiteConfig(): SiteConfig {
    if (!cachedConfig) {
      const configPath = join(process.cwd(), 'content', 'site-config.yaml')
      cachedConfig = loadYamlFile<SiteConfig>(configPath)
    }
    return cachedConfig
  }
  
  return {
    getSiteConfig,
  }
}
