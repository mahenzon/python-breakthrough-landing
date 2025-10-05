import { join } from 'path'
import type { FaqItem } from '~/types/content'
import { loadYamlFile } from '~/utils/yaml-loader'

let cachedFaq: FaqItem[] | null = null

export function useFaqData() {
  function getFaqItems(): FaqItem[] {
    if (!cachedFaq) {
      const faqPath = join(process.cwd(), 'content', 'faq.yaml')
      cachedFaq = loadYamlFile<FaqItem[]>(faqPath)
      cachedFaq.sort((a, b) => a.order - b.order)
    }
    return cachedFaq
  }
  
  return {
    getFaqItems,
  }
}
