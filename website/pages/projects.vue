<template>
  <div class="container mx-auto px-4">
    <!-- Course Projects Section -->
    <ProjectsSection
      id="course-projects"
      class="pt-5"
      :title="$t('projects.courseProjectsTitle')"
      :description="$t('projects.courseProjectsDescription')"
      :projects="courseProjects"
      :show-border="true"
    />

    <!-- Student Projects Section -->
    <ProjectsSection
      id="students-projects"
      class="pt-20"
      :title="$t('projects.studentProjectsTitle')"
      :description="$t('projects.studentProjectsDescription')"
      :projects="studentProjects"
    />
  </div>
</template>

<script setup lang="ts">
const { getStudentProjects, getCourseProjects } = useProjectsData()
const studentProjects = await getStudentProjects()
const courseProjects = await getCourseProjects()

const { t } = useI18n()

useHead({
  title: `Проекты студентов - ${t('brand.name')}`,
  meta: [
    { name: 'description', content: `Проекты, созданные студентами курса ${t('brand.name')}` },
    { property: 'og:title', content: 'Проекты студентов' },
    { property: 'og:description', content: 'Проекты, созданные студентами курса' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>
