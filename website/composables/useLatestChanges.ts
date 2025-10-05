let cachedContent: string | null = null

export function useLatestChanges() {
  function getLatestChanges(): string {
    if (import.meta.server) {
      if (!cachedContent) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { readFileSync } = require('fs')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { join } = require('path')
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
