export const useLatestChanges = () => {
  // Use useState to share data between server and client
  const latestChanges = useState<string>('latestChanges', () => '')
  
  const getLatestChanges = async (): Promise<string> => {
    // If data is already loaded, return it
    if (latestChanges.value) {
      return latestChanges.value
    }
    
    // Load data differently based on environment
    if (import.meta.server) {
      // During SSR, read from filesystem
      const { readFileSync } = await import('fs')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'public', 'data', 'latest-changes.json')
      const content = readFileSync(filePath, 'utf-8')
      const data = JSON.parse(content)
      latestChanges.value = data.html
    } else {
      // On client, fetch from public directory
      const response = await fetch('/data/latest-changes.json')
      const data = await response.json()
      latestChanges.value = data.html
    }
    
    return latestChanges.value
  }
  
  return {
    getLatestChanges,
  }
}
