import { writeFileSync, readFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { parseCourseData } from '../server/utils/course-parser'
import { calculateStatistics } from '../server/utils/stats-calculator'
import { loadYamlFile } from '../server/utils/yaml-loader'
import type { SiteConfig } from '../types/site-config'
import type { FaqItem, StudentProject, CourseProject, TechnologyStackData } from '../types/content'
import { marked } from 'marked'

const publicDir = join(process.cwd(), 'public', 'data')

// Ensure public/data directory exists
try {
  mkdirSync(publicDir, { recursive: true })
} catch {
  // Directory might already exist
}

console.log('🔄 Generating static data files...\n')

// 1. Generate course data
const courseDataPath = join(process.cwd(), '..', 'course-data')
const course = parseCourseData(courseDataPath)
writeFileSync(join(publicDir, 'course.json'), JSON.stringify(course, null, 2))
console.log('✅ course.json generated')

// 2. Generate site config
const configPath = join(process.cwd(), 'content', 'site-config.yaml')
const siteConfig = loadYamlFile<SiteConfig>(configPath)
writeFileSync(join(publicDir, 'site-config.json'), JSON.stringify(siteConfig, null, 2))
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
  generatedAt: new Date().toISOString(),
}
writeFileSync(join(publicDir, 'stats.json'), JSON.stringify(detailedStats, null, 2))
console.log('✅ stats.json generated')

// 4. Generate FAQ data
const faqPath = join(process.cwd(), 'content', 'faq.yaml')
const faqData = loadYamlFile<FaqItem[]>(faqPath)
writeFileSync(join(publicDir, 'faq.json'), JSON.stringify(faqData, null, 2))
console.log('✅ faq.json generated')

// 5. Generate student projects data
const studentProjectsPath = join(process.cwd(), 'content', 'students-projects.yaml')
const studentProjectsData = loadYamlFile<StudentProject[]>(studentProjectsPath)
writeFileSync(join(publicDir, 'students-projects.json'), JSON.stringify(studentProjectsData, null, 2))
console.log('✅ students-projects.json generated')

// 6. Generate course projects data
const courseProjectsPath = join(process.cwd(), 'content', 'course-projects.yaml')
const courseProjectsData = loadYamlFile<CourseProject[]>(courseProjectsPath)
writeFileSync(join(publicDir, 'course-projects.json'), JSON.stringify(courseProjectsData, null, 2))
console.log('✅ course-projects.json generated')

// 7. Generate technology stack data
const technologyStackPath = join(process.cwd(), 'content', 'technology-stack.yaml')
const technologyStackData = loadYamlFile<TechnologyStackData>(technologyStackPath)
writeFileSync(join(publicDir, 'technology-stack.json'), JSON.stringify(technologyStackData, null, 2))
console.log('✅ technology-stack.json generated')

// 8. Generate latest changes HTML
const latestChangesPath = join(process.cwd(), 'content', 'latest-changes.md')
const latestChangesContent = readFileSync(latestChangesPath, 'utf-8')

// Update lesson headings from "УрокX" to "Урок (X)"
const updatedContent = latestChangesContent.replace(/\| Урок(\d+) \|/g, '| Урок ($1) |')

const latestChangesHtml = await marked(updatedContent)
writeFileSync(join(publicDir, 'latest-changes.json'), JSON.stringify({ html: latestChangesHtml }, null, 2))
console.log('✅ latest-changes.json generated')

console.log('\n✨ All data files generated in public/data/')
console.log(`📊 Course: ${course.modules.length} modules, ${stats.topicsCount} topics, ${stats.totalLessons} lessons`)
