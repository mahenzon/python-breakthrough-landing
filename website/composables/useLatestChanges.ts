export const useLatestChanges = () => {
  // Use useState to share data between server and client
  const latestChanges = useState<string>('latestChanges', () => '')
  
  const getLatestChanges = async (): Promise<string> => {
    // If data is already loaded, return it
    if (latestChanges.value) {
      return latestChanges.value
    }
    
    // Load data on server side
    if (import.meta.server) {
      const { join } = await import('path')
      const { readFileSync } = await import('fs')
      
      const changesPath = join(process.cwd(), 'content', 'latest-changes.md')
      latestChanges.value = readFileSync(changesPath, 'utf8')
      return latestChanges.value
    }
    
    // On client side, return the value from useState
    return latestChanges.value
  }
  
  return {
    getLatestChanges,
  }
}
