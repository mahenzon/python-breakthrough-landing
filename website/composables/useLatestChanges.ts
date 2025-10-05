let cachedContent: string | null = null

export const useLatestChanges = () => {
  const getLatestChanges = async (): Promise<string> => {
    if (import.meta.server) {
      if (!cachedContent) {
        const { join } = await import('path')
        const { readFileSync } = await import('fs')
        
        const changesPath = join(process.cwd(), 'content', 'latest-changes.md')
        cachedContent = readFileSync(changesPath, 'utf8')
      }
      return cachedContent!
    }
    
    // Client-side placeholder
    return ''
  }
  
  return {
    getLatestChanges,
  }
}
