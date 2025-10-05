import { writeFileSync } from 'fs'
import { join } from 'path'
import { parseCourseData } from '../server/utils/course-parser'
import { calculateStatistics } from '../server/utils/stats-calculator'
import { loadYamlFile } from '../server/utils/yaml-loader'
import type { SiteConfig } from '../types/site-config'

// Parse course data
const courseDataPath = join(process.cwd(), '..', 'course-data')
const course = parseCourseData(courseDataPath)

// Load site config for number of students
const configPath = join(process.cwd(), 'content', 'site-config.yaml')
const siteConfig = loadYamlFile<SiteConfig>(configPath)

// Calculate statistics
const stats = calculateStatistics(course, siteConfig.statistics.numberOfStudents)

// Create detailed statistics object
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

// Save to JSON file
const outputPath = join(process.cwd(), 'public', 'stats.json')
writeFileSync(outputPath, JSON.stringify(detailedStats, null, 2), 'utf8')

// Print summary to console
console.log('\n📊 Course Statistics Summary:\n')
console.log(`✅ Total Modules: ${stats.modulesCount}`)
console.log(`✅ Total Topics: ${stats.topicsCount}`)
console.log(`✅ Total Lessons: ${stats.totalLessons}`)
console.log(`✅ Total Tasks: ${stats.totalTasks}`)
console.log(`✅ Total Duration: ${stats.totalDurationFormatted} (${stats.totalDurationMinutes} minutes)`)
console.log(`✅ Number of Students: ${stats.numberOfStudents}`)
console.log(`\n💾 Stats saved to: ${outputPath}`)
console.log('\n📋 Module Breakdown:')

course.modules.forEach((module) => {
  const moduleLessons = module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0)
  const moduleDuration = module.topics.reduce((sum, topic) =>
    sum + topic.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.duration_minutes, 0),
  0)
  const moduleHours = Math.floor(moduleDuration / 60)
  const moduleMinutes = moduleDuration % 60

  console.log(`\n  ${module.order}. ${module.name}`)
  console.log(`     Topics: ${module.topics.length} | Lessons: ${moduleLessons} | Duration: ${moduleHours}ч ${moduleMinutes}мин`)
})

console.log('\n✨ Done!\n')
