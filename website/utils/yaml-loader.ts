import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

export function loadYamlFile<T>(filePath: string): T {
  try {
    const content = readFileSync(filePath, 'utf8')
    return yaml.load(content) as T
  } catch (error) {
    console.error(`Error loading YAML file: ${filePath}`, error)
    throw error
  }
}

export function getDirectories(path: string): string[] {
  try {
    return readdirSync(path).filter(file => {
      const fullPath = join(path, file)
      return statSync(fullPath).isDirectory()
    })
  } catch (error) {
    console.error(`Error reading directories from: ${path}`, error)
    return []
  }
}

export function getFiles(path: string, extension: string = '.yaml'): string[] {
  try {
    return readdirSync(path).filter(file => file.endsWith(extension))
  } catch (error) {
    console.error(`Error reading files from: ${path}`, error)
    return []
  }
}
