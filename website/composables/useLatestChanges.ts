import { readFileSync } from 'fs'
import { join } from 'path'

let cachedContent: string | null = null

export function useLatestChanges() {
  function getLatestChanges(): string {
    if (!cachedContent) {
      const changesPath = join(process.cwd(), 'content', 'latest-changes.md')
      cachedContent = readFileSync(changesPath, 'utf8')
    }
    return cachedContent
  }
  
  return {
    getLatestChanges,
  }
}
