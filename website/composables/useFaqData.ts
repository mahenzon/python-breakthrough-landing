import type { FaqItem } from '~/types/content'

export const useFaqData = () => {
  // Use useState to share data between server and client
  const faqItems = useState<FaqItem[]>('faqItems', () => [])
  
  const getFaqItems = async (): Promise<FaqItem[]> => {
    // If data is already loaded, return it
    if (faqItems.value.length > 0) {
      return faqItems.value
    }
    
    // Load data on server side
    if (import.meta.server) {
      const { join } = await import('path')
      const { readFileSync } = await import('fs')
      const yaml = await import('js-yaml')
      
      const faqPath = join(process.cwd(), 'content', 'faq.yaml')
      const content = readFileSync(faqPath, 'utf8')
      faqItems.value = yaml.load(content) as FaqItem[]
      faqItems.value.sort((a, b) => a.order - b.order)
      return faqItems.value
    }
    
    // On client side, return the value from useState
    return faqItems.value
  }
  
  return {
    getFaqItems,
  }
}
