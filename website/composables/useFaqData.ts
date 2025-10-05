import type { FaqItem } from '~/types/content'

let cachedFaq: FaqItem[] | null = null

export const useFaqData = () => {
  const getFaqItems = async (): Promise<FaqItem[]> => {
    if (import.meta.server) {
      if (!cachedFaq) {
        const { join } = await import('path')
        const { readFileSync } = await import('fs')
        const yaml = await import('js-yaml')
        
        const faqPath = join(process.cwd(), 'content', 'faq.yaml')
        const content = readFileSync(faqPath, 'utf8')
        cachedFaq = yaml.load(content) as FaqItem[]
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
