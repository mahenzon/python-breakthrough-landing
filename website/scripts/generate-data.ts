import { writeFileSync, readFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'
import { parseCourseData } from '../server/utils/course-parser'
import { calculateStatistics } from '../server/utils/stats-calculator'
import { loadYamlFile } from '../server/utils/yaml-loader'
import type { SiteConfig } from '../types/site-config'
import type { FaqItem, StudentProject, CourseProject, TechnologyStackData, Icon, ModuleTechData, ModuleTechMapping, HomeContent, CourseLinksData } from '../types/content'
import { marked } from 'marked'

const publicDir = join(process.cwd(), 'public', 'data')

// Ensure public/data directory exists
try {
  mkdirSync(publicDir, { recursive: true })
} catch {
  // Directory might already exist
}

/**
 * Normalize unicode string to NFC form
 * This fixes unicode normalization issues
 */
function normalizeUnicode(str: string): string {
  return str.normalize('NFC')
}

/**
 * Get all directory names from a path
 */
function getDirectories(path: string): string[] {
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

/**
 * Auto-detects modules from course-data folder and ensures they exist
 * in modules.yaml. If a module is missing, it adds it with empty tech array.
 * Preserves existing module configurations.
 */
function ensureModulesInTechMapping(
  courseDataPath: string,
  modulesTechPath: string,
): void {
  // Get all module folder names from course-data
  const moduleIds = getDirectories(courseDataPath)

  // Load existing modules.yaml
  let modulesTechData: ModuleTechData
  try {
    modulesTechData = loadYamlFile<ModuleTechData>(modulesTechPath)
  } catch {
    // If file doesn't exist, create initial structure
    console.log('⚠️  modules.yaml not found, creating new one')
    modulesTechData = { modules: {} }
  }

  // Ensure modules object exists
  if (!modulesTechData.modules) {
    modulesTechData.modules = {}
  }

  let newModulesAdded = 0

  // Check each module from course-data
  for (const moduleId of moduleIds) {
    if (!modulesTechData.modules[moduleId]) {
      // Module doesn't exist in mapping, add it
      modulesTechData.modules[moduleId] = {
        tech: [],
      }
      newModulesAdded++
      console.log(`  ➕ Added new module: ${moduleId}`)
    }
  }

  // Sort modules by key (keeps them organized)
  const sortedModules: ModuleTechMapping = {}
  Object.keys(modulesTechData.modules)
    .sort()
    .forEach(key => {
      sortedModules[key] = modulesTechData.modules[key]!
    })
  modulesTechData.modules = sortedModules

  // Write back to file if changes were made
  if (newModulesAdded > 0) {
    const yamlContent = yaml.dump(modulesTechData, {
      indent: 2,
      lineWidth: -1, // Don't wrap lines
      noRefs: true,
      sortKeys: false, // We already sorted manually
    })

    writeFileSync(modulesTechPath, yamlContent, 'utf-8')
    console.log(`✅ modules.yaml updated (${newModulesAdded} new modules added)`)
  } else {
    console.log('✅ modules.yaml is up to date')
  }
}

console.log('🔄 Generating static data files...\n')

// 1. Generate course data
const courseDataPath = join(process.cwd(), '..', 'course-data')
const course = parseCourseData(courseDataPath)
writeFileSync(join(publicDir, 'course.json'), normalizeUnicode(JSON.stringify(course, null, 2)))
console.log('✅ course.json generated')

// 1a. Ensure all modules are in modules.yaml
console.log('\n🔍 Checking modules.yaml...')
const modulesTechPath = join(process.cwd(), 'content', 'modules.yaml')
ensureModulesInTechMapping(courseDataPath, modulesTechPath)
console.log('')

// 2. Generate site config
const configPath = join(process.cwd(), 'content', 'site-config.yaml')
const siteConfig = loadYamlFile<SiteConfig>(configPath)
writeFileSync(join(publicDir, 'site-config.json'), normalizeUnicode(JSON.stringify(siteConfig, null, 2)))
console.log('✅ site-config.json generated')

// 3. Generate statistics
const stats = calculateStatistics(course, siteConfig.statistics.numberOfStudents)
const detailedStats = {
  ...stats,
  modules: course.modules.map(module => ({
    id: module.id,
    name: module.name,
    order: module.order,
    topicsCount: module.topics.length,
    lessonsCount: module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0),
    totalDuration: module.topics.reduce((sum, topic) =>
      sum + topic.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.duration_minutes, 0),
    0),
    totalTasks: module.topics.reduce((sum, topic) =>
      sum + topic.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.tasks, 0),
    0),
    topics: module.topics.map(topic => ({
      id: topic.id,
      name: topic.name,
      order: topic.order,
      lessonsCount: topic.lessons.length,
      totalDuration: topic.lessons.reduce((sum, lesson) => sum + lesson.duration_minutes, 0),
      totalTasks: topic.lessons.reduce((sum, lesson) => sum + lesson.tasks, 0),
    })),
  })),
}
writeFileSync(join(publicDir, 'stats.json'), normalizeUnicode(JSON.stringify(detailedStats, null, 2)))
console.log('✅ stats.json generated')

// 4. Generate FAQ data
const faqPath = join(process.cwd(), 'content', 'faq.yaml')
const faqData = loadYamlFile<FaqItem[]>(faqPath)
writeFileSync(join(publicDir, 'faq.json'), normalizeUnicode(JSON.stringify(faqData, null, 2)))
console.log('✅ faq.json generated')

// 5. Generate home content data
const homeContentPath = join(process.cwd(), 'content', 'home-content.yaml')
const homeContentData = loadYamlFile<HomeContent>(homeContentPath)
writeFileSync(join(publicDir, 'home-content.json'), normalizeUnicode(JSON.stringify(homeContentData, null, 2)))
console.log('✅ home-content.json generated')

// 5a. Generate course links data
const courseLinksPath = join(process.cwd(), 'content', 'course-links.yaml')
const courseLinksData = loadYamlFile<CourseLinksData>(courseLinksPath)
writeFileSync(join(publicDir, 'course-links.json'), normalizeUnicode(JSON.stringify(courseLinksData, null, 2)))
console.log('✅ course-links.json generated')

// 6. Generate student projects data
const studentProjectsPath = join(process.cwd(), 'content', 'students-projects.yaml')
const studentProjectsData = loadYamlFile<StudentProject[]>(studentProjectsPath)
writeFileSync(join(publicDir, 'students-projects.json'), normalizeUnicode(JSON.stringify(studentProjectsData, null, 2)))
console.log('✅ students-projects.json generated')

// 7. Generate course projects data
const courseProjectsPath = join(process.cwd(), 'content', 'course-projects.yaml')
const courseProjectsData = loadYamlFile<CourseProject[]>(courseProjectsPath)
writeFileSync(join(publicDir, 'course-projects.json'), normalizeUnicode(JSON.stringify(courseProjectsData, null, 2)))
console.log('✅ course-projects.json generated')

// 8. Generate icons data
const iconsPath = join(process.cwd(), 'content', 'icons.yaml')
const iconsData = loadYamlFile<Icon[]>(iconsPath)
writeFileSync(join(publicDir, 'icons.json'), normalizeUnicode(JSON.stringify(iconsData, null, 2)))
console.log('✅ icons.json generated')

// 9. Generate modules-tech data
const modulesTechData = loadYamlFile<ModuleTechData>(modulesTechPath)
writeFileSync(join(publicDir, 'modules-tech.json'), normalizeUnicode(JSON.stringify(modulesTechData, null, 2)))
console.log('✅ modules-tech.json generated')

// 10. Generate technology stack data (with icon enrichment)
const technologyStackPath = join(process.cwd(), 'content', 'technology-stack.yaml')
const technologyStackData = loadYamlFile<TechnologyStackData>(technologyStackPath)

// Enrich with icon data for easier consumption
const iconMap = new Map<string, Icon>()
iconsData.forEach(icon => iconMap.set(icon.name, icon))

const enrichedTechStack = {
  ...technologyStackData,
  categories: technologyStackData.categories.map(category => ({
    ...category,
    items: category.items.map(item => {
      const iconData = iconMap.get(item['icon-name'])
      return {
        ...item,
        // Include resolved icon data for convenience
        icon: iconData?.icon,
        path: iconData?.path,
      }
    }),
  })),
}

writeFileSync(join(publicDir, 'technology-stack.json'), normalizeUnicode(JSON.stringify(enrichedTechStack, null, 2)))
console.log('✅ technology-stack.json generated')

// 11. Generate latest changes HTML
const latestChangesPath = join(process.cwd(), 'content', 'latest-changes.md')
const latestChangesContent = readFileSync(latestChangesPath, 'utf-8')

// Update lesson headings from "УрокX" to "Урок (X)"
const updatedContent = latestChangesContent.replace(/\| Урок(\d+) \|/g, '| Урок ($1) |')

const latestChangesHtml = await marked(updatedContent)
writeFileSync(join(publicDir, 'latest-changes.json'), normalizeUnicode(JSON.stringify({ html: latestChangesHtml }, null, 2)))
console.log('✅ latest-changes.json generated')

console.log('\n✨ All data files generated in public/data/')
console.log(`📊 Course: ${course.modules.length} modules, ${stats.topicsCount} topics, ${stats.totalLessons} lessons`)
