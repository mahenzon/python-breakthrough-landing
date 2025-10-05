import type { FaqItem } from '~/types/content'

let cachedFaq: FaqItem[] | null = null

export function useFaqData() {
  function getFaqItems(): FaqItem[] {
    if (import.meta.server) {
      if (!cachedFaq) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { join } = require('path')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { loadYamlFile } = require('../utils/yaml-loader')
        const faqPath = join(process.cwd(), 'content', 'faq.yaml')
        cachedFaq = loadYamlFile<FaqItem[]>(faqPath)
        cachedFaq.sort((a, b) => a.order - b.order)
      }
      return cachedFaq!
    }
    
    // Client-side placeholder
    return []
  }
  
  return {
    getFaqItems,
  }
}
