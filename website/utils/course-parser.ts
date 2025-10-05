import { join } from 'path'
import type { Module, Topic, Course } from '~/types/course'
import { loadYamlFile, getDirectories, getFiles } from './yaml-loader'

export function parseCourseData(courseDataPath: string): Course {
  const modules: Module[] = []
  
  const moduleDirs = getDirectories(courseDataPath)
    .filter(dir => /^\d+/.test(dir)) // Folders starting with numbers
  
  for (const moduleDir of moduleDirs) {
    const modulePath = join(courseDataPath, moduleDir)
    
    // Load module index
    const indexPath = join(modulePath, 'index.yaml')
    const moduleData = loadYamlFile<{ name: string; description: string; order: number }>(indexPath)
    
    // Load topics
    const topics: Topic[] = []
    const topicFiles = getFiles(modulePath)
      .filter(file => file !== 'index.yaml')
    
    for (const topicFile of topicFiles) {
      const topicPath = join(modulePath, topicFile)
      const topicData = loadYamlFile<Omit<Topic, 'id'>>(topicPath)
      
      topics.push({
        ...topicData,
        id: topicFile.replace('.yaml', ''),
      })
    }
    
    // Sort topics by order
    topics.sort((a, b) => a.order - b.order)
    
    modules.push({
      ...moduleData,
      id: moduleDir,
      topics,
    })
  }
  
  // Sort modules by order
  modules.sort((a, b) => a.order - b.order)
  
  return { modules }
}
