import type { Course, CourseStatistics } from '../../types/course'

export function calculateStatistics(course: Course, numberOfStudents: number): CourseStatistics {
  let totalLessons = 0
  let totalDurationMinutes = 0
  let totalTasks = 0
  let topicsCount = 0
  
  for (const module of course.modules) {
    topicsCount += module.topics.length
    
    for (const topic of module.topics) {
      totalLessons += topic.lessons.length
      
      for (const lesson of topic.lessons) {
        totalDurationMinutes += lesson.duration_minutes
        totalTasks += lesson.tasks
      }
    }
  }
  
  const hours = Math.floor(totalDurationMinutes / 60)
  const minutes = totalDurationMinutes % 60
  const totalDurationFormatted = `${hours} ч ${minutes} мин`
  
  return {
    totalLessons,
    totalDurationMinutes,
    totalDurationFormatted,
    numberOfStudents,
    totalTasks,
    modulesCount: course.modules.length,
    topicsCount,
  }
}
