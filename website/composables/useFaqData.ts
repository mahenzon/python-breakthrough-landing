import type { FaqItem } from '~/types/content'

export const useFaqData = () => {
  // Use useState to share data between server and client
  const faqItems = useState<FaqItem[]>('faqItems', () => [])
  
  const getFaqItems = async (): Promise<FaqItem[]> => {
    // If data is already loaded, return it
    if (faqItems.value.length > 0) {
      return faqItems.value
    }
    
    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'faq.json')
      const content = readFileSync(filePath, 'utf-8')
      faqItems.value = JSON.parse(content)
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/faq.json')
      faqItems.value = await response.json()
    }
    
    faqItems.value.sort((a, b) => a.order - b.order)
    return faqItems.value
  }
  
  return {
    getFaqItems,
  }
}
