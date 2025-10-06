# Implementation Tasks
## Python Breakthrough Course Landing Site

---

## Overview

This document breaks down the implementation into phases and specific tasks. Each task includes:
- Clear description
- Dependencies
- Acceptance criteria
- Estimated effort

**Total Estimated Time:** 4-6 weeks (1 developer)

---

## Phase 0: Project Setup (3-5 hours)

### Task 0.1: Initialize Nuxt 3 Project

**Description:** Set up new Nuxt 3 project with TypeScript support.

**Steps:**
```bash
cd /Users/suren/MyFiles/Projects/python-breakthrough-landing
npx nuxi@latest init website
cd website
```

**Configuration Choices:**
- Package manager: npm
- TypeScript: Yes
- ESLint: Yes

**Acceptance Criteria:**
- [ ] Nuxt 3 project created in `website/` folder
- [ ] TypeScript configured
- [ ] Project runs with `npm run dev`
- [ ] Default welcome page visible at localhost:3000

**Estimated Time:** 30 minutes

---

### Task 0.2: Install Core Dependencies

**Description:** Install all required packages for the project.

**Dependencies:** Task 0.1

**Steps:**
```bash
cd website
npm install -D @nuxtjs/tailwindcss tailwindcss @tailwindcss/typography @tailwindcss/forms
npm install @nuxtjs/i18n
npm install nuxt-simple-sitemap
npm install js-yaml
npm install -D @types/js-yaml
```

**Acceptance Criteria:**
- [ ] All packages installed successfully
- [ ] No dependency conflicts
- [ ] `package.json` updated with all dependencies
- [ ] `package-lock.json` committed

**Estimated Time:** 15 minutes

---

### Task 0.3: Configure Nuxt Modules

**Description:** Configure Nuxt modules in `nuxt.config.ts`.

**Dependencies:** Task 0.2

**Configuration:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-simple-sitemap'
  ],

  css: ['~/assets/css/tailwind.css'],

  i18n: {
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', file: 'ru.ts', name: 'Русский' }
    ],
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },

  site: {
    url: 'https://yourdomain.com', // Update with actual domain
  },

  nitro: {
    preset: 'github_pages'
  }
})
```

**Acceptance Criteria:**
- [ ] All modules configured
- [ ] i18n set to Russian default
- [ ] GitHub Pages preset configured
- [ ] Site URL configured
- [ ] Dev server restarts successfully

**Estimated Time:** 30 minutes

---

### Task 0.4: Configure Tailwind CSS

**Description:** Set up Tailwind CSS with custom configuration.

**Dependencies:** Task 0.3

**Files to Create:**

1. `website/assets/css/tailwind.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. `website/tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

**Acceptance Criteria:**
- [ ] Tailwind CSS compiles successfully
- [ ] Custom colors available
- [ ] Typography plugin working
- [ ] Forms plugin working
- [ ] Can use Tailwind classes in components

**Estimated Time:** 30 minutes

---

### Task 0.5: Set Up Project Folder Structure

**Description:** Create all necessary folders per design document.

**Dependencies:** Task 0.1

**Folders to Create:**
```bash
mkdir -p website/components/layout
mkdir -p website/components/course
mkdir -p website/components/ui
mkdir -p website/components/sections
mkdir -p website/composables
mkdir -p website/content
mkdir -p website/locales
mkdir -p website/types
mkdir -p website/utils
```

**Acceptance Criteria:**
- [ ] All folders created
- [ ] Structure matches design document
- [ ] `.gitkeep` files added to empty folders (optional)

**Estimated Time:** 10 minutes

---

### Task 0.6: Set Up TypeScript Types

**Description:** Create TypeScript interfaces for all data models.

**Dependencies:** Task 0.5

**File:** `website/types/course.ts`

```typescript
export interface Lesson {
  name: string;
  duration_minutes: number;
  tasks: number;
  order: number;
}

export interface Topic {
  name: string;
  description: string;
  order: number;
  lessons: Lesson[];
  id: string; // Derived from filename
}

export interface Module {
  name: string;
  description: string;
  order: number;
  topics: Topic[];
  id: string; // Derived from folder name
}

export interface Course {
  modules: Module[];
}

export interface CourseStatistics {
  totalLessons: number;
  totalVideos: number;
  totalDurationMinutes: number;
  totalDurationFormatted: string;
  numberOfStudents: number;
  totalTasks: number;
  modulesCount: number;
  topicsCount: number;
}
```

**File:** `website/types/site-config.ts`

```typescript
export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface AuthorInfo {
  name: string;
  bio: string;
  avatar?: string;
  links: SocialLink[];
}

export interface CourseInfo {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface SiteConfig {
  author: AuthorInfo;
  course: CourseInfo;
  statistics: {
    numberOfStudents: number;
  };
}
```

**File:** `website/types/content.ts`

```typescript
export interface FaqItem {
  question: string;
  answer: string;
  order: number;
}

export interface StudentProject {
  title: string;
  description: string;
  url: string;
  author?: string;
  order: number;
}
```

**Acceptance Criteria:**
- [ ] All type files created
- [ ] Types match Python models
- [ ] No TypeScript errors
- [ ] Types exported correctly

**Estimated Time:** 30 minutes

---

### Task 0.7: Create Initial Russian Translations

**Description:** Create initial Russian translation file in TypeScript format for type safety.

**Dependencies:** Task 0.5

**File:** `website/locales/ru.ts`

```typescript
// locales/ru.ts
export default {
  nav: {
    home: 'Главная',
    modules: 'Модули',
    statistics: 'Статистика',
    projects: 'Проекты',
    faq: 'Вопросы',
    latest: 'Обновления',
    collaboration: 'Сотрудничество'
  },
  course: {
    modules: 'Модули курса',
    topics: 'Темы',
    lessons: 'Уроки',
    duration: 'Длительность',
    tasks: 'Задач',
    minutes: 'мин',
    module: 'Модуль',
    topic: 'Тема'
  },
  accordion: {
    expandAll: 'Развернуть всё',
    collapseAll: 'Свернуть всё'
  },
  stats: {
    title: 'Статистика курса',
    totalLessons: 'Всего уроков',
    totalVideos: 'Всего видео',
    totalDuration: 'Общая длительность',
    students: 'Студентов',
    modules: 'Модулей',
    topics: 'Тем',
    tasks: 'Задач'
  },
  faq: {
    title: 'Часто задаваемые вопросы'
  },
  projects: {
    title: 'Проекты студентов',
    viewProject: 'Посмотреть проект'
  },
  latest: {
    title: 'Последние обновления'
  },
  collaboration: {
    title: 'Сотрудничество'
  },
  footer: {
    copyright: 'Все права защищены'
  }
} as const;

// Optional: Export type for other locales to follow
export type LocaleMessages = typeof import('./ru').default;
```

**Acceptance Criteria:**
- [ ] Translation file created in TypeScript format
- [ ] Valid TypeScript syntax
- [ ] Covers all UI elements
- [ ] Cyrillic text displays correctly
- [ ] Type safety with 'as const'
- [ ] Autocompletion works in IDE

**Estimated Time:** 30 minutes

---

### Task 0.8: Configure Git and GitHub Repository

**Description:** Initialize git repository and push to GitHub.

**Dependencies:** Task 0.1

**Steps:**
```bash
cd /Users/suren/MyFiles/Projects/python-breakthrough-landing
git init
# Create .gitignore for Nuxt
echo "node_modules
.nuxt
.output
dist
.env
.DS_Store" > website/.gitignore

git add .
git commit -m "Initial project setup with Nuxt 3"

# Create GitHub repository (via gh CLI or web UI)
# Link and push
```

**Acceptance Criteria:**
- [ ] Git repository initialized
- [ ] `.gitignore` configured properly
- [ ] Initial commit created
- [ ] Pushed to GitHub
- [ ] Repository accessible

**Estimated Time:** 20 minutes

---

## Phase 1: Content Loading & Utilities (8-10 hours)

### Task 1.1: Create YAML Loader Utility

**Description:** Implement utility to load and parse YAML files.

**Dependencies:** Task 0.6

**File:** `website/utils/yaml-loader.ts`

```typescript
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

export function loadYamlFile<T>(filePath: string): T {
  try {
    const content = readFileSync(filePath, 'utf8');
    return yaml.load(content) as T;
  } catch (error) {
    console.error(`Error loading YAML file: ${filePath}`, error);
    throw error;
  }
}

export function getDirectories(path: string): string[] {
  return readdirSync(path).filter(file => {
    return statSync(join(path, file)).isDirectory();
  });
}

export function getFiles(path: string, extension: string = '.yaml'): string[] {
  return readdirSync(path).filter(file => file.endsWith(extension));
}
```

**Acceptance Criteria:**
- [ ] YAML files load successfully
- [ ] UTF-8 encoding handled
- [ ] Error handling implemented
- [ ] Helper functions work

**Estimated Time:** 1 hour

---

### Task 1.2: Create Course Data Parser

**Description:** Parse course-data folder into Course model.

**Dependencies:** Task 1.1

**File:** `website/utils/course-parser.ts`

```typescript
import { join } from 'path';
import type { Module, Topic, Course } from '~/types/course';
import { loadYamlFile, getDirectories, getFiles } from './yaml-loader';

export function parseCourseData(courseDataPath: string): Course {
  const modules: Module[] = [];
  
  const moduleDirs = getDirectories(courseDataPath)
    .filter(dir => /^\d+/.test(dir)); // Folders starting with numbers
  
  for (const moduleDir of moduleDirs) {
    const modulePath = join(courseDataPath, moduleDir);
    
    // Load module index
    const indexPath = join(modulePath, 'index.yaml');
    const moduleData = loadYamlFile<{ name: string; description: string; order: number }>(indexPath);
    
    // Load topics
    const topics: Topic[] = [];
    const topicFiles = getFiles(modulePath)
      .filter(file => file !== 'index.yaml');
    
    for (const topicFile of topicFiles) {
      const topicPath = join(modulePath, topicFile);
      const topicData = loadYamlFile<any>(topicPath);
      
      topics.push({
        ...topicData,
        id: topicFile.replace('.yaml', '')
      });
    }
    
    // Sort topics by order
    topics.sort((a, b) => a.order - b.order);
    
    modules.push({
      ...moduleData,
      id: moduleDir,
      topics
    });
  }
  
  // Sort modules by order
  modules.sort((a, b) => a.order - b.order);
  
  return { modules };
}
```

**Acceptance Criteria:**
- [ ] Parses all modules from course-data
- [ ] Parses all topics for each module
- [ ] Sorts by order correctly
- [ ] Returns valid Course object
- [ ] Handles missing files gracefully

**Estimated Time:** 2 hours

---

### Task 1.3: Create Statistics Calculator

**Description:** Calculate course statistics from course data.

**Dependencies:** Task 1.2

**File:** `website/utils/stats-calculator.ts`

```typescript
import type { Course, CourseStatistics } from '~/types/course';

export function calculateStatistics(course: Course, numberOfStudents: number): CourseStatistics {
  let totalLessons = 0;
  let totalDurationMinutes = 0;
  let totalTasks = 0;
  let topicsCount = 0;
  
  for (const module of course.modules) {
    topicsCount += module.topics.length;
    
    for (const topic of module.topics) {
      totalLessons += topic.lessons.length;
      
      for (const lesson of topic.lessons) {
        totalDurationMinutes += lesson.duration_minutes;
        totalTasks += lesson.tasks;
      }
    }
  }
  
  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const totalDurationFormatted = `${hours} ч ${minutes} мин`;
  
  return {
    totalLessons,
    totalVideos: totalLessons, // Each lesson has a video
    totalDurationMinutes,
    totalDurationFormatted,
    numberOfStudents,
    totalTasks,
    modulesCount: course.modules.length,
    topicsCount
  };
}
```

**Acceptance Criteria:**
- [ ] Counts all lessons correctly
- [ ] Sums duration correctly
- [ ] Formats duration as "X ч Y мин"
- [ ] Counts all metrics
- [ ] Returns valid CourseStatistics object

**Estimated Time:** 1 hour

---

### Task 1.4: Create Course Data Composable

**Description:** Create Vue composable to access course data.

**Dependencies:** Task 1.2, Task 1.3

**File:** `website/composables/useCourseData.ts`

```typescript
import { join } from 'path';
import type { Course, CourseStatistics, Module, Topic } from '~/types/course';
import { parseCourseData } from '~/utils/course-parser';
import { calculateStatistics } from '~/utils/stats-calculator';

let cachedCourse: Course | null = null;
let cachedStats: CourseStatistics | null = null;

export function useCourseData() {
  function getCourseData(): Course {
    if (!cachedCourse) {
      const courseDataPath = join(process.cwd(), '..', 'course-data');
      cachedCourse = parseCourseData(courseDataPath);
    }
    return cachedCourse;
  }
  
  function getStatistics(numberOfStudents: number): CourseStatistics {
    if (!cachedStats) {
      const course = getCourseData();
      cachedStats = calculateStatistics(course, numberOfStudents);
    }
    return cachedStats;
  }
  
  function getModuleById(moduleId: string): Module | undefined {
    const course = getCourseData();
    return course.modules.find(m => m.id === moduleId);
  }
  
  function getTopicById(moduleId: string, topicId: string): Topic | undefined {
    const module = getModuleById(moduleId);
    return module?.topics.find(t => t.id === topicId);
  }
  
  return {
    getCourseData,
    getStatistics,
    getModuleById,
    getTopicById
  };
}
```

**Acceptance Criteria:**
- [ ] Composable loads course data
- [ ] Data cached properly
- [ ] Helper functions work
- [ ] Can be used in any component

**Estimated Time:** 1.5 hours

---

### Task 1.5: Create Site Config Loader

**Description:** Load site configuration from YAML.

**Dependencies:** Task 1.1

**File:** `website/content/site-config.yaml`

```yaml
author:
  name: "Your Name"
  bio: |
    Brief bio about you.
    Multiple lines supported.
  links:
    - name: "GitHub"
      url: "https://github.com/mahenzon"
      icon: "github"
    - name: "Telegram"
      url: "https://t.me/yourusername"
      icon: "telegram"

course:
  title: "Python Breakthrough"
  subtitle: "Разработка веб-приложений на Python"
  description: |
    Comprehensive course description.
    Multiple paragraphs supported.
  features:
    - "Асинхронное обучение"
    - "Практические проекты"
    - "Поддержка наставника"

statistics:
  numberOfStudents: 100
```

**File:** `website/composables/useSiteConfig.ts`

```typescript
import { join } from 'path';
import type { SiteConfig } from '~/types/site-config';
import { loadYamlFile } from '~/utils/yaml-loader';

let cachedConfig: SiteConfig | null = null;

export function useSiteConfig() {
  function getSiteConfig(): SiteConfig {
    if (!cachedConfig) {
      const configPath = join(process.cwd(), 'content', 'site-config.yaml');
      cachedConfig = loadYamlFile<SiteConfig>(configPath);
    }
    return cachedConfig;
  }
  
  return {
    getSiteConfig
  };
}
```

**Acceptance Criteria:**
- [ ] Site config file created
- [ ] Config loads successfully
- [ ] All fields accessible
- [ ] Cached properly

**Estimated Time:** 1 hour

---

### Task 1.6: Create FAQ Data Loader

**Description:** Load FAQ data from YAML.

**Dependencies:** Task 1.1

**File:** `website/content/faq.yaml`

```yaml
- question: "Можно ли проходить курс в своём темпе?"
  answer: |
    Да! Курс полностью асинхронный. Вы можете учиться в удобное для вас время и темпе.
    Нет жёстких дедлайнов и расписаний.
  order: 1

- question: "Можно ли проходить модули не по порядку?"
  answer: |
    Конечно! Модули можно проходить в любом порядке, если у вас уже есть базовые знания
    по некоторым темам. Выбирайте то, что вам интересно.
  order: 2

- question: "Как получить доступ к курсу?"
  answer: |
    Информация о доступе к курсу будет добавлена позже.
  order: 3
```

**File:** `website/composables/useFaqData.ts`

```typescript
import { join } from 'path';
import type { FaqItem } from '~/types/content';
import { loadYamlFile } from '~/utils/yaml-loader';

let cachedFaq: FaqItem[] | null = null;

export function useFaqData() {
  function getFaqItems(): FaqItem[] {
    if (!cachedFaq) {
      const faqPath = join(process.cwd(), 'content', 'faq.yaml');
      cachedFaq = loadYamlFile<FaqItem[]>(faqPath);
      cachedFaq.sort((a, b) => a.order - b.order);
    }
    return cachedFaq;
  }
  
  return {
    getFaqItems
  };
}
```

**Acceptance Criteria:**
- [ ] FAQ file created with required questions
- [ ] Data loads successfully
- [ ] Sorted by order
- [ ] Cached properly

**Estimated Time:** 45 minutes

---

### Task 1.7: Create Projects Data Loader

**Description:** Load student projects from YAML.

**Dependencies:** Task 1.1

**File:** `website/content/projects.yaml`

```yaml
- title: "Пример проекта 1"
  description: "Описание проекта"
  url: "https://example.com"
  author: "Студент"
  order: 1
```

**File:** `website/composables/useProjectsData.ts`

```typescript
import { join } from 'path';
import type { StudentProject } from '~/types/content';
import { loadYamlFile } from '~/utils/yaml-loader';

let cachedProjects: StudentProject[] | null = null;

export function useProjectsData() {
  function getProjects(): StudentProject[] {
    if (!cachedProjects) {
      const projectsPath = join(process.cwd(), 'content', 'projects.yaml');
      cachedProjects = loadYamlFile<StudentProject[]>(projectsPath);
      cachedProjects.sort((a, b) => a.order - b.order);
    }
    return cachedProjects;
  }
  
  return {
    getProjects
  };
}
```

**Acceptance Criteria:**
- [ ] Projects file created
- [ ] Data loads successfully
- [ ] Sorted by order
- [ ] Cached properly

**Estimated Time:** 30 minutes

---

### Task 1.8: Create Latest Changes Loader

**Description:** Load latest changes from markdown file.

**Dependencies:** None

**File:** `website/content/latest-changes.md`

```markdown
# Последние обновления

## 2024-01-15
- Создан сайт курса
- Добавлена структура модулей

## 2024-01-10
- Подготовка курса
```

**File:** `website/composables/useLatestChanges.ts`

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

let cachedContent: string | null = null;

export function useLatestChanges() {
  function getLatestChanges(): string {
    if (!cachedContent) {
      const changesPath = join(process.cwd(), 'content', 'latest-changes.md');
      cachedContent = readFileSync(changesPath, 'utf8');
    }
    return cachedContent;
  }
  
  return {
    getLatestChanges
  };
}
```

**Acceptance Criteria:**
- [ ] Markdown file created
- [ ] Content loads successfully
- [ ] Cached properly

**Estimated Time:** 30 minutes

---

## Phase 2: UI Components (12-15 hours)

### Task 2.1: Create Base Layout Component

**Description:** Create default layout with header and footer.

**Dependencies:** Phase 0

**File:** `website/layouts/default.vue`

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
</script>
```

**Acceptance Criteria:**
- [ ] Layout renders correctly
- [ ] Header, main, footer structure
- [ ] Min height full screen
- [ ] Responsive

**Estimated Time:** 30 minutes

---

### Task 2.2: Create Header Component

**Description:** Create site header with navigation.

**Dependencies:** Task 0.7

**File:** `website/components/layout/Header.vue`

```vue
<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold text-primary-600">
          {{ $t('course.title') }}
        </NuxtLink>
        
        <div class="hidden md:flex space-x-6">
          <NuxtLink to="/" class="hover:text-primary-600">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink to="/modules" class="hover:text-primary-600">{{ $t('nav.modules') }}</NuxtLink>
          <NuxtLink to="/statistics" class="hover:text-primary-600">{{ $t('nav.statistics') }}</NuxtLink>
          <NuxtLink to="/projects" class="hover:text-primary-600">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink to="/faq" class="hover:text-primary-600">{{ $t('nav.faq') }}</NuxtLink>
          <NuxtLink to="/latest-changes" class="hover:text-primary-600">{{ $t('nav.latest') }}</NuxtLink>
        </div>
        
        <!-- Mobile menu button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
          <!-- Icon here -->
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-2">
        <NuxtLink to="/" class="block hover:text-primary-600">{{ $t('nav.home') }}</NuxtLink>
        <!-- Other links -->
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);
</script>
```

**Acceptance Criteria:**
- [ ] Header renders
- [ ] All navigation links present
- [ ] Mobile menu works
- [ ] Translations work
- [ ] Responsive design

**Estimated Time:** 2 hours

---

### Task 2.3: Create Footer Component

**Description:** Create site footer with links and copyright.

**Dependencies:** Task 0.7

**File:** `website/components/layout/Footer.vue`

```vue
<template>
  <footer class="bg-gray-50 border-t mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="font-bold mb-4">{{ config.course.title }}</h3>
          <p class="text-sm text-gray-600">{{ config.course.subtitle }}</p>
        </div>
        
        <div>
          <h3 class="font-bold mb-4">{{ $t('nav.modules') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/modules" class="text-gray-600 hover:text-primary-600">{{ $t('nav.modules') }}</NuxtLink></li>
            <li><NuxtLink to="/statistics" class="text-gray-600 hover:text-primary-600">{{ $t('nav.statistics') }}</NuxtLink></li>
            <li><NuxtLink to="/projects" class="text-gray-600 hover:text-primary-600">{{ $t('nav.projects') }}</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold mb-4">Контакты</h3>
          <div class="flex space-x-4">
            <a v-for="link in config.author.links" :key="link.name" 
               :href="link.url" target="_blank"
               class="text-gray-600 hover:text-primary-600">
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t text-center text-sm text-gray-600">
        © {{ new Date().getFullYear() }} {{ config.author.name }}. {{ $t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { getSiteConfig } = useSiteConfig();
const config = getSiteConfig();
</script>
```

**Acceptance Criteria:**
- [ ] Footer renders
- [ ] Links from config displayed
- [ ] Copyright with current year
- [ ] Responsive grid layout

**Estimated Time:** 1.5 hours

---

### Task 2.4: Create Accordion UI Component

**Description:** Create reusable accordion component.

**Dependencies:** Phase 0

**File:** `website/components/ui/Accordion.vue`

```vue
<template>
  <div class="accordion">
    <div v-for="(item, index) in items" :key="index" class="border-b">
      <button
        @click="toggle(index)"
        class="w-full flex justify-between items-center py-4 px-6 text-left hover:bg-gray-50"
        :aria-expanded="isOpen(index)"
      >
        <span class="font-medium">{{ item.title }}</span>
        <span class="transform transition-transform" :class="{ 'rotate-180': isOpen(index) }">
          ▼
        </span>
      </button>
      
      <div v-show="isOpen(index)" class="px-6 pb-4">
        <slot :name="`item-${index}`" :item="item">
          {{ item.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AccordionItem {
  title: string;
  content?: string;
}

const props = defineProps<{
  items: AccordionItem[];
  allowMultiple?: boolean;
}>();

const openItems = ref<Set<number>>(new Set());

function isOpen(index: number): boolean {
  return openItems.value.has(index);
}

function toggle(index: number) {
  if (isOpen(index)) {
    openItems.value.delete(index);
  } else {
    if (!props.allowMultiple) {
      openItems.value.clear();
    }
    openItems.value.add(index);
  }
}

defineExpose({
  expandAll: () => {
    props.items.forEach((_, index) => openItems.value.add(index));
  },
  collapseAll: () => {
    openItems.value.clear();
  }
});
</script>
```

**Acceptance Criteria:**
- [ ] Accordion expands/collapses
- [ ] Animation smooth
- [ ] Keyboard accessible
- [ ] ARIA attributes present
- [ ] Can expand/collapse all via exposed methods

**Estimated Time:** 2 hours

---

### Task 2.5: Create Module Accordion Component

**Description:** Create specialized accordion for course modules.

**Dependencies:** Task 2.4

**File:** `website/components/course/ModuleAccordion.vue`

```vue
<template>
  <div class="module-accordion">
    <!-- Controls -->
    <div v-if="showControls" class="flex justify-end space-x-2 mb-4">
      <button @click="expandAll" class="px-4 py-2 text-sm bg-primary-100 hover:bg-primary-200 rounded">
        {{ $t('accordion.expandAll') }}
      </button>
      <button @click="collapseAll" class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
        {{ $t('accordion.collapseAll') }}
      </button>
    </div>
    
    <!-- Modules -->
    <Accordion ref="accordionRef" :items="moduleItems" :allow-multiple="true">
      <template v-for="(module, moduleIndex) in modules" :key="module.id" #[`item-${moduleIndex}`]>
        <div class="space-y-4">
          <div class="prose prose-sm max-w-none" v-html="renderMarkdown(module.description)"></div>
          
          <!-- Topics -->
          <div class="space-y-2">
            <div v-for="topic in module.topics" :key="topic.id" class="border-l-4 border-primary-300 pl-4">
              <NuxtLink :to="`/modules/${module.id}/${topic.id}`" 
                        class="block hover:bg-gray-50 p-3 rounded">
                <div class="font-medium">{{ topic.name }}</div>
                <div class="text-sm text-gray-600">
                  {{ topic.lessons.length }} {{ $t('course.lessons') }} · 
                  {{ calculateTopicDuration(topic) }} {{ $t('course.minutes') }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import type { Module, Topic } from '~/types/course';
import { marked } from 'marked'; // Need to install: npm install marked

const props = defineProps<{
  modules: Module[];
  showControls?: boolean;
}>();

const accordionRef = ref();

const moduleItems = computed(() => {
  return props.modules.map(m => ({
    title: m.name,
  }));
});

function expandAll() {
  accordionRef.value?.expandAll();
}

function collapseAll() {
  accordionRef.value?.collapseAll();
}

function renderMarkdown(md: string): string {
  return marked(md);
}

function calculateTopicDuration(topic: Topic): number {
  return topic.lessons.reduce((sum, lesson) => sum + lesson.duration_minutes, 0);
}
</script>
```

**Note:** Need to install `marked` package: `npm install marked @types/marked`

**Acceptance Criteria:**
- [ ] Displays all modules
- [ ] Nested structure works
- [ ] Expand/collapse all buttons work
- [ ] Markdown rendering works
- [ ] Links to topics work
- [ ] Duration calculated correctly

**Estimated Time:** 3 hours

---

### Task 2.6: Create Stats Section Component

**Description:** Create component to display course statistics.

**Dependencies:** Task 1.3

**File:** `website/components/sections/StatsSection.vue`

```vue
<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">{{ $t('stats.title') }}</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-4xl font-bold text-primary-600">{{ stats.totalLessons }}</div>
          <div class="text-gray-600 mt-2">{{ $t('stats.totalLessons') }}</div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-4xl font-bold text-primary-600">{{ stats.totalDurationFormatted }}</div>
          <div class="text-gray-600 mt-2">{{ $t('stats.totalDuration') }}</div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-4xl font-bold text-primary-600">{{ stats.numberOfStudents }}</div>
          <div class="text-gray-600 mt-2">{{ $t('stats.students') }}</div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-4xl font-bold text-primary-600">{{ stats.modulesCount }}</div>
          <div class="text-gray-600 mt-2">{{ $t('stats.modules') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CourseStatistics } from '~/types/course';

defineProps<{
  stats: CourseStatistics;
}>();
</script>
```

**Acceptance Criteria:**
- [ ] Stats display correctly
- [ ] Responsive grid
- [ ] Cards styled nicely
- [ ] Translations work

**Estimated Time:** 1.5 hours

---

### Task 2.7: Create Hero Section Component

**Description:** Create hero section for home page.

**Dependencies:** Task 1.5

**File:** `website/components/sections/HeroSection.vue`

```vue
<template>
  <section class="py-20 bg-gradient-to-br from-primary-50 to-white">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">{{ config.course.title }}</h1>
        <p class="text-xl text-gray-600 mb-8">{{ config.course.subtitle }}</p>
        
        <div class="prose prose-lg max-w-none mx-auto mb-8" v-html="renderMarkdown(config.course.description)"></div>
        
        <div class="flex justify-center space-x-4">
          <NuxtLink to="/modules" class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            {{ $t('nav.modules') }}
          </NuxtLink>
          <NuxtLink to="/collaboration" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
            {{ $t('nav.collaboration') }}
          </NuxtLink>
        </div>
      </div>
      
      <!-- Author info -->
      <div class="mt-16 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4">{{ config.author.name }}</h2>
        <div class="prose max-w-none" v-html="renderMarkdown(config.author.bio)"></div>
        
        <div class="mt-6 flex space-x-4">
          <a v-for="link in config.author.links" :key="link.name"
             :href="link.url" target="_blank"
             class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SiteConfig } from '~/types/site-config';
import { marked } from 'marked';

defineProps<{
  config: SiteConfig;
}>();

function renderMarkdown(md: string): string {
  return marked(md);
}
</script>
```

**Acceptance Criteria:**
- [ ] Hero section looks great
- [ ] Author info displayed
- [ ] Markdown rendering works
- [ ] CTAs present
- [ ] Responsive design

**Estimated Time:** 2 hours

---

### Task 2.8: Create FAQ Section Component

**Description:** Create FAQ accordion component for the FAQ page.

**Dependencies:** Task 2.4, Task 1.6

**Note:** This component is used only on the dedicated FAQ page (/faq), not on the home page.

**File:** `website/components/sections/FaqSection.vue`

```vue
<template>
  <section class="py-12">
    <div class="container mx-auto px-4 max-w-3xl">
      <h2 class="text-3xl font-bold text-center mb-8">{{ $t('faq.title') }}</h2>
      
      <Accordion :items="faqItems">
        <template v-for="(faq, index) in faqs" :key="faq.order" #[`item-${index}`]>
          <div class="prose max-w-none" v-html="renderMarkdown(faq.answer)"></div>
        </template>
      </Accordion>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/types/content';
import { marked } from 'marked';

const props = defineProps<{
  faqs: FaqItem[];
  limit?: number; // Optional limit for preview
}>();

const displayedFaqs = computed(() => {
  return props.limit ? props.faqs.slice(0, props.limit) : props.faqs;
});

const faqItems = computed(() => {
  return displayedFaqs.value.map(faq => ({
    title: faq.question,
  }));
});

function renderMarkdown(md: string): string {
  return marked(md);
}
</script>
```

**Acceptance Criteria:**
- [ ] FAQ displays correctly
- [ ] Accordion works
- [ ] Markdown rendering works
- [ ] Optional limit works

**Estimated Time:** 1 hour

---

## Phase 3: Pages Implementation (15-20 hours)

### Task 3.1: Create Home Page

**Description:** Implement home/landing page with key sections. Note: FAQ and Projects are separate pages.

**Dependencies:** Phase 2

**File:** `website/pages/index.vue`

```vue
<template>
  <div>
    <HeroSection :config="config" />
    
    <StatsSection :stats="stats" />
    
    <section class="py-12 container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">{{ $t('course.modules') }}</h2>
      <ModuleAccordion :modules="course.modules" :show-controls="true" />
    </section>
    
    <!-- Call to Action Section -->
    <section class="py-16 bg-primary-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Готовы начать обучение?</h2>
        <p class="text-xl text-gray-600 mb-8">Изучите все модули или свяжитесь для сотрудничества</p>
        <div class="flex justify-center space-x-4">
          <NuxtLink to="/faq" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
            {{ $t('nav.faq') }}
          </NuxtLink>
          <NuxtLink to="/projects" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
            {{ $t('nav.projects') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { getCourseData, getStatistics } = useCourseData();
const { getSiteConfig } = useSiteConfig();

const config = getSiteConfig();
const course = getCourseData();
const stats = getStatistics(config.statistics.numberOfStudents);

useHead({
  title: config.course.title,
  meta: [
    { name: 'description', content: config.course.subtitle },
    { property: 'og:title', content: config.course.title },
    { property: 'og:description', content: config.course.subtitle },
    { property: 'og:url', content: 'https://yourdomain.com/' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] All sections render
- [ ] Data loads correctly
- [ ] Meta tags present
- [ ] Responsive design
- [ ] No errors

**Estimated Time:** 2 hours

---

### Task 3.2: Create Modules Index Page

**Description:** Implement modules overview page.

**Dependencies:** Phase 2

**File:** `website/pages/modules/index.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('course.modules') }}</h1>
    
    <div class="grid md:grid-cols-2 gap-8">
      <NuxtLink v-for="module in course.modules" :key="module.id"
                :to="`/modules/${module.id}`"
                class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <h2 class="text-2xl font-bold mb-4">{{ module.name }}</h2>
        <div class="text-gray-600 mb-4 line-clamp-3">
          {{ getPlainText(module.description) }}
        </div>
        <div class="flex space-x-4 text-sm text-gray-500">
          <span>{{ module.topics.length }} {{ $t('course.topics') }}</span>
          <span>{{ countModuleLessons(module) }} {{ $t('course.lessons') }}</span>
          <span>{{ calculateModuleDuration(module) }} {{ $t('course.minutes') }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from '~/types/course';

const { getCourseData } = useCourseData();
const course = getCourseData();

function getPlainText(markdown: string): string {
  return markdown.replace(/[#*`]/g, '').substring(0, 150) + '...';
}

function countModuleLessons(module: Module): number {
  return module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
}

function calculateModuleDuration(module: Module): number {
  let total = 0;
  module.topics.forEach(topic => {
    topic.lessons.forEach(lesson => {
      total += lesson.duration_minutes;
    });
  });
  return total;
}

useHead({
  title: 'Модули курса - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Все модули курса Python Breakthrough' },
    { property: 'og:title', content: 'Модули курса' },
    { property: 'og:description', content: 'Все модули курса Python Breakthrough' },
    { property: 'og:url', content: 'https://yourdomain.com/modules' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] All modules displayed as cards
- [ ] Links work
- [ ] Statistics shown
- [ ] Meta tags present
- [ ] Responsive grid

**Estimated Time:** 2 hours

---

### Task 3.3: Create Module Detail Page

**Description:** Implement individual module page.

**Dependencies:** Phase 2

**File:** `website/pages/modules/[moduleId]/index.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <nav class="text-sm text-gray-600 mb-6">
      <NuxtLink to="/" class="hover:text-primary-600">{{ $t('nav.home') }}</NuxtLink>
      /
      <NuxtLink to="/modules" class="hover:text-primary-600">{{ $t('nav.modules') }}</NuxtLink>
      /
      <span class="text-gray-900">{{ module.name }}</span>
    </nav>
    
    <h1 class="text-4xl font-bold mb-6">{{ module.name }}</h1>
    
    <div class="prose prose-lg max-w-none mb-8" v-html="renderMarkdown(module.description)"></div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink v-for="topic in module.topics" :key="topic.id"
                :to="`/modules/${moduleId}/${topic.id}`"
                class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
        <h3 class="text-xl font-bold mb-3">{{ topic.name }}</h3>
        <p v-if="topic.description" class="text-gray-600 mb-4 text-sm">{{ topic.description }}</p>
        <div class="flex space-x-4 text-sm text-gray-500">
          <span>{{ topic.lessons.length }} {{ $t('course.lessons') }}</span>
          <span>{{ calculateTopicDuration(topic) }} {{ $t('course.minutes') }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Topic } from '~/types/course';
import { marked } from 'marked';

const route = useRoute();
const moduleId = route.params.moduleId as string;

const { getModuleById } = useCourseData();
const module = getModuleById(moduleId);

if (!module) {
  throw createError({ statusCode: 404, message: 'Module not found' });
}

function renderMarkdown(md: string): string {
  return marked(md);
}

function calculateTopicDuration(topic: Topic): number {
  return topic.lessons.reduce((sum, lesson) => sum + lesson.duration_minutes, 0);
}

useHead({
  title: `${module.name} - Python Breakthrough`,
  meta: [
    { name: 'description', content: module.description.substring(0, 160) },
    { property: 'og:title', content: module.name },
    { property: 'og:description', content: module.description.substring(0, 160) },
    { property: 'og:url', content: `https://yourdomain.com/modules/${moduleId}` },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] Module details displayed
- [ ] Breadcrumb navigation works
- [ ] Markdown rendered
- [ ] Topics displayed as cards
- [ ] Links work
- [ ] 404 handling
- [ ] Meta tags present

**Estimated Time:** 2.5 hours

---

### Task 3.4: Create Topic Detail Page

**Description:** Implement individual topic page with lessons.

**Dependencies:** Phase 2

**File:** `website/pages/modules/[moduleId]/[topicId]/index.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <nav class="text-sm text-gray-600 mb-6">
      <NuxtLink to="/" class="hover:text-primary-600">{{ $t('nav.home') }}</NuxtLink>
      /
      <NuxtLink to="/modules" class="hover:text-primary-600">{{ $t('nav.modules') }}</NuxtLink>
      /
      <NuxtLink :to="`/modules/${moduleId}`" class="hover:text-primary-600">{{ module.name }}</NuxtLink>
      /
      <span class="text-gray-900">{{ topic.name }}</span>
    </nav>
    
    <h1 class="text-4xl font-bold mb-6">{{ topic.name }}</h1>
    
    <div v-if="topic.description" class="prose mb-8">
      {{ topic.description }}
    </div>
    
    <h2 class="text-2xl font-bold mb-6">{{ $t('course.lessons') }}</h2>
    
    <div class="space-y-4">
      <div v-for="lesson in topic.lessons" :key="lesson.order"
           class="flex items-center justify-between p-6 bg-white rounded-lg shadow">
        <div>
          <div class="font-medium text-lg">{{ lesson.order }}. {{ lesson.name }}</div>
        </div>
        <div class="flex items-center space-x-6 text-sm text-gray-600">
          <span>{{ lesson.duration_minutes }} {{ $t('course.minutes') }}</span>
          <span>{{ lesson.tasks }} {{ $t('course.tasks') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const moduleId = route.params.moduleId as string;
const topicId = route.params.topicId as string;

const { getModuleById, getTopicById } = useCourseData();
const module = getModuleById(moduleId);
const topic = getTopicById(moduleId, topicId);

if (!module || !topic) {
  throw createError({ statusCode: 404, message: 'Topic not found' });
}

useHead({
  title: `${topic.name} - ${module.name} - Python Breakthrough`,
  meta: [
    { name: 'description', content: `${topic.name}: ${topic.lessons.length} уроков` },
    { property: 'og:title', content: topic.name },
    { property: 'og:description', content: `${topic.name}: ${topic.lessons.length} уроков` },
    { property: 'og:url', content: `https://yourdomain.com/modules/${moduleId}/${topicId}` },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] Topic details displayed
- [ ] Breadcrumb with module link
- [ ] All lessons listed
- [ ] Lesson metadata shown
- [ ] 404 handling
- [ ] Meta tags present

**Estimated Time:** 2 hours

---

### Task 3.5: Create Statistics Page

**Description:** Implement statistics page with all metrics.

**Dependencies:** Task 1.3

**File:** `website/pages/statistics.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('stats.title') }}</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-5xl font-bold text-primary-600 mb-2">{{ stats.totalLessons }}</div>
        <div class="text-gray-600">{{ $t('stats.totalLessons') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-5xl font-bold text-primary-600 mb-2">{{ stats.totalVideos }}</div>
        <div class="text-gray-600">{{ $t('stats.totalVideos') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-5xl font-bold text-primary-600 mb-2">{{ stats.totalDurationFormatted }}</div>
        <div class="text-gray-600">{{ $t('stats.totalDuration') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-5xl font-bold text-primary-600 mb-2">{{ stats.numberOfStudents }}</div>
        <div class="text-gray-600">{{ $t('stats.students') }}</div>
      </div>
    </div>
    
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.modulesCount }}</div>
        <div class="text-gray-600">{{ $t('stats.modules') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.topicsCount }}</div>
        <div class="text-gray-600">{{ $t('stats.topics') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.totalTasks }}</div>
        <div class="text-gray-600">{{ $t('stats.tasks') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getStatistics } = useCourseData();
const { getSiteConfig } = useSiteConfig();

const config = getSiteConfig();
const stats = getStatistics(config.statistics.numberOfStudents);

useHead({
  title: 'Статистика курса - Python Breakthrough',
  meta: [
    { name: 'description', content: `Курс содержит ${stats.totalLessons} уроков общей длительностью ${stats.totalDurationFormatted}` },
    { property: 'og:title', content: 'Статистика курса' },
    { property: 'og:description', content: `${stats.totalLessons} уроков, ${stats.totalDurationFormatted}` },
    { property: 'og:url', content: 'https://yourdomain.com/statistics' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] All statistics displayed
- [ ] Numbers calculated correctly
- [ ] Cards styled nicely
- [ ] Responsive grid
- [ ] Meta tags present

**Estimated Time:** 1.5 hours

---

### Task 3.6: Create Projects Page

**Description:** Implement student projects listing page.

**Dependencies:** Task 1.7

**File:** `website/pages/projects.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('projects.title') }}</h1>
    
    <div v-if="projects.length === 0" class="text-center text-gray-600 py-12">
      Проекты скоро появятся!
    </div>
    
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project.order"
           class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-bold mb-3">{{ project.title }}</h3>
        <p class="text-gray-600 mb-4">{{ project.description }}</p>
        <div v-if="project.author" class="text-sm text-gray-500 mb-4">
          Автор: {{ project.author }}
        </div>
        <a :href="project.url" target="_blank" rel="noopener"
           class="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
          {{ $t('projects.viewProject') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getProjects } = useProjectsData();
const projects = getProjects();

useHead({
  title: 'Проекты студентов - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Проекты, созданные студентами курса Python Breakthrough' },
    { property: 'og:title', content: 'Проекты студентов' },
    { property: 'og:description', content: 'Проекты, созданные студентами курса' },
    { property: 'og:url', content: 'https://yourdomain.com/projects' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] Projects displayed as cards
- [ ] Empty state handled
- [ ] Links open in new tab
- [ ] Responsive grid
- [ ] Meta tags present

**Estimated Time:** 1.5 hours

---

### Task 3.7: Create FAQ Page

**Description:** Implement FAQ page with accordion.

**Dependencies:** Task 2.8

**File:** `website/pages/faq.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-center">{{ $t('faq.title') }}</h1>
    
    <div class="max-w-3xl mx-auto">
      <FaqSection :faqs="faqs" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { getFaqItems } = useFaqData();
const faqs = getFaqItems();

useHead({
  title: 'FAQ - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Часто задаваемые вопросы о курсе Python Breakthrough' },
    { property: 'og:title', content: 'Часто задаваемые вопросы' },
    { property: 'og:description', content: 'Ответы на частые вопросы о курсе' },
    { property: 'og:url', content: 'https://yourdomain.com/faq' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] FAQ section rendered
- [ ] All questions/answers displayed
- [ ] Accordion works
- [ ] Meta tags present

**Estimated Time:** 1 hour

---

### Task 3.8: Create Latest Changes Page

**Description:** Implement latest changes page with markdown content.

**Dependencies:** Task 1.8

**File:** `website/pages/latest-changes.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('latest.title') }}</h1>
    
    <div class="max-w-3xl mx-auto">
      <article class="prose prose-lg max-w-none" v-html="renderedContent"></article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';

const { getLatestChanges } = useLatestChanges();
const content = getLatestChanges();
const renderedContent = marked(content);

useHead({
  title: 'Последние обновления - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Последние изменения и обновления курса' },
    { property: 'og:title', content: 'Последние обновления' },
    { property: 'og:description', content: 'Последние изменения и обновления курса' },
    { property: 'og:url', content: 'https://yourdomain.com/latest-changes' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] Markdown rendered correctly
- [ ] Styled with Tailwind typography
- [ ] Meta tags present

**Estimated Time:** 1 hour

---

### Task 3.9: Create Collaboration Page

**Description:** Implement collaboration information page.

**Dependencies:** Task 0.7

**File:** `website/pages/collaboration.vue`

```vue
<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">{{ $t('collaboration.title') }}</h1>
      
      <div class="prose prose-lg max-w-none">
        <h2>Корпоративное обучение</h2>
        <p>
          Предлагаю услуги по обучению сотрудников вашей компании веб-разработке на Python.
          Возможны индивидуальные и групповые консультации.
        </p>
        
        <h2>Что включено:</h2>
        <ul>
          <li>Групповые занятия для команды</li>
          <li>Индивидуальные консультации</li>
          <li>Ревью кода и архитектуры</li>
          <li>Адаптация программы под ваши задачи</li>
        </ul>
        
        <h2>Для юридических лиц:</h2>
        <p>
          Работаю с организациями по договору. Предоставляю все необходимые документы.
        </p>
        
        <h2>Связаться:</h2>
        <div class="flex space-x-4 not-prose">
          <a v-for="link in config.author.links" :key="link.name"
             :href="link.url" target="_blank"
             class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getSiteConfig } = useSiteConfig();
const config = getSiteConfig();

useHead({
  title: 'Сотрудничество - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Корпоративное обучение и консультации по веб-разработке на Python' },
    { property: 'og:title', content: 'Сотрудничество' },
    { property: 'og:description', content: 'Корпоративное обучение и консультации' },
    { property: 'og:url', content: 'https://yourdomain.com/collaboration' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
```

**Acceptance Criteria:**
- [ ] Content displayed
- [ ] Contact links work
- [ ] Styled with typography
- [ ] Meta tags present

**Estimated Time:** 1 hour

---

## Phase 4: Deployment & CI/CD (4-6 hours)

### Task 4.1: Configure Nuxt for Static Generation

**Description:** Ensure Nuxt is properly configured for SSG.

**Dependencies:** Phase 3

**Update:** `website/nuxt.config.ts`

Add route generation:

```typescript
export default defineNuxtConfig({
  // ... existing config
  
  hooks: {
    async 'nitro:config'(nitroConfig) {
      // Generate all routes from course data
      const { parseCourseData } = await import('./utils/course-parser');
      const { join } = await import('path');
      
      const courseDataPath = join(process.cwd(), '..', 'course-data');
      const course = parseCourseData(courseDataPath);
      
      const routes = [
        '/',
        '/modules',
        '/statistics',
        '/projects',
        '/faq',
        '/latest-changes',
        '/collaboration',
      ];
      
      // Add module routes
      for (const module of course.modules) {
        routes.push(`/modules/${module.id}`);
        
        // Add topic routes
        for (const topic of module.topics) {
          routes.push(`/modules/${module.id}/${topic.id}`);
        }
      }
      
      nitroConfig.prerender = nitroConfig.prerender || {};
      nitroConfig.prerender.routes = routes;
    }
  }
})
```

**Acceptance Criteria:**
- [ ] All routes pre-rendered
- [ ] Build completes successfully
- [ ] Output in `.output/public/`
- [ ] HTML files generated for all pages

**Estimated Time:** 2 hours

---

### Task 4.2: Add robots.txt and CNAME

**Description:** Add robots.txt and CNAME for custom domain.

**Dependencies:** None

**File:** `website/public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**File:** `website/public/CNAME`

```
yourdomain.com
```

**Acceptance Criteria:**
- [ ] robots.txt accessible
- [ ] CNAME file present
- [ ] Files copied to output

**Estimated Time:** 15 minutes

---

### Task 4.3: Create GitHub Actions Workflow

**Description:** Set up automated deployment to GitHub Pages.

**Dependencies:** Task 4.1

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/package-lock.json

      - name: Install dependencies
        run: |
          cd website
          npm ci

      - name: Generate static site
        run: |
          cd website
          npm run generate

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./website/.output/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Acceptance Criteria:**
- [ ] Workflow file created
- [ ] Workflow triggers on push
- [ ] Build step works
- [ ] Deploy step works
- [ ] Site accessible after deploy

**Estimated Time:** 1.5 hours

---

### Task 4.4: Configure GitHub Pages

**Description:** Enable and configure GitHub Pages in repository settings.

**Dependencies:** Task 4.3

**Steps:**
1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. Add custom domain (if applicable)
4. Enable HTTPS
5. Test deployment

**Acceptance Criteria:**
- [ ] GitHub Pages enabled
- [ ] Custom domain configured
- [ ] HTTPS working
- [ ] Site accessible

**Estimated Time:** 30 minutes

---

### Task 4.5: Test Full Deployment

**Description:** Test complete deployment pipeline.

**Dependencies:** Task 4.4

**Steps:**
1. Make a content change
2. Push to main
3. Verify build triggers
4. Check build logs
5. Verify site updates
6. Test all pages

**Acceptance Criteria:**
- [ ] Deployment completes successfully
- [ ] All pages accessible
- [ ] Content updates reflected
- [ ] No broken links
- [ ] Meta tags working

**Estimated Time:** 1 hour

---

## Phase 5: Testing & Polish (6-8 hours)

### Task 5.1: Cross-Browser Testing

**Description:** Test site in all major browsers.

**Dependencies:** Phase 4

**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Test Cases:**
- Page loads correctly
- Navigation works
- Accordions function
- Responsive design
- No console errors

**Acceptance Criteria:**
- [ ] Site works in all browsers
- [ ] No major visual bugs
- [ ] All functionality works

**Estimated Time:** 2 hours

---

### Task 5.2: Mobile Responsiveness Testing

**Description:** Test on various mobile devices.

**Dependencies:** Phase 4

**Devices to Test:**
- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPad (768px)
- Android phone (various)

**Test Cases:**
- Navigation usable
- Text readable
- Touch targets adequate
- No horizontal scroll
- Images scale properly

**Acceptance Criteria:**
- [ ] Works on small screens
- [ ] Works on tablets
- [ ] Touch interactions work
- [ ] No layout issues

**Estimated Time:** 2 hours

---

### Task 5.3: Lighthouse Audits

**Description:** Run Lighthouse audits and fix issues.

**Dependencies:** Phase 4

**Audits:**
- Performance
- Accessibility
- Best Practices
- SEO

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 95

**Acceptance Criteria:**
- [ ] All scores above targets
- [ ] No critical issues
- [ ] Recommendations implemented

**Estimated Time:** 2 hours

---

### Task 5.4: SEO Verification

**Description:** Verify all SEO elements are correct.

**Dependencies:** Phase 4

**Checks:**
- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Open Graph tags present
- [ ] Sitemap generated correctly
- [ ] robots.txt accessible
- [ ] URLs clean and descriptive
- [ ] Heading hierarchy correct
- [ ] Semantic HTML used

**Acceptance Criteria:**
- [ ] All SEO checks pass
- [ ] Social previews work
- [ ] Sitemap valid

**Estimated Time:** 1 hour

---

### Task 5.5: Content Verification

**Description:** Verify all content loads and displays correctly.

**Dependencies:** Phase 4

**Checks:**
- [ ] All modules loaded
- [ ] All topics loaded
- [ ] All lessons displayed
- [ ] Statistics calculated correctly
- [ ] FAQ items present (including required ones)
- [ ] No missing data
- [ ] Cyrillic text displays correctly
- [ ] Markdown rendering works

**Acceptance Criteria:**
- [ ] All content present
- [ ] No data errors
- [ ] Everything displays correctly

**Estimated Time:** 1 hour

---

## Phase 6: Documentation (2-3 hours)

### Task 6.1: Write Website README

**Description:** Document setup and development process.

**Dependencies:** Phase 5

**File:** `website/README.md`

Include:
- Project overview
- Prerequisites
- Installation steps
- Development commands
- Build process
- Deployment process
- Project structure
- Contributing guidelines

**Acceptance Criteria:**
- [ ] README complete
- [ ] All commands documented
- [ ] Clear instructions

**Estimated Time:** 1 hour

---

### Task 6.2: Write Content Update Guide

**Description:** Document how to update content.

**Dependencies:** Phase 5

**File:** `website/CONTENT_GUIDE.md`

Include:
- How to update course data
- How to add latest changes
- How to add projects
- How to update FAQ
- How to update site config
- YAML format examples

**Acceptance Criteria:**
- [ ] Guide complete
- [ ] Examples provided
- [ ] Clear process

**Estimated Time:** 1 hour

---

### Task 6.3: Write Root README

**Description:** Document entire project.

**Dependencies:** Task 6.1, Task 6.2

**File:** `README.md` (root)

Include:
- Project overview
- Repository structure
- Quick start
- Links to other docs
- Deployment status badge
- License

**Acceptance Criteria:**
- [ ] Root README complete
- [ ] Links to subdocs
- [ ] Professional appearance

**Estimated Time:** 30 minutes

---

## Summary

### Total Tasks: 61

### Time Estimates by Phase:

| Phase | Tasks | Time Estimate |
|-------|-------|---------------|
| Phase 0: Project Setup | 8 | 3-5 hours |
| Phase 1: Content Loading | 8 | 8-10 hours |
| Phase 2: UI Components | 8 | 12-15 hours |
| Phase 3: Pages | 9 | 15-20 hours |
| Phase 4: Deployment | 5 | 4-6 hours |
| Phase 5: Testing | 5 | 6-8 hours |
| Phase 6: Documentation | 3 | 2-3 hours |
| **TOTAL** | **46** | **50-67 hours** |

### Estimated Timeline:

- **1 Developer, Full-Time:** 1.5-2 weeks
- **1 Developer, Part-Time (20h/week):** 3-4 weeks
- **With Team (2-3 developers):** 1 week

### Critical Path:

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
```

### Parallel Work Opportunities:

- Phase 2 tasks can start once Phase 1 has initial composables
- Some pages (Phase 3) can be developed in parallel
- Documentation (Phase 6) can be written during testing

### Dependencies Graph:

```
Setup (Phase 0)
    ↓
Content Utils (Phase 1)
    ↓
    ├→ Components (Phase 2)
    │       ↓
    └→ Pages (Phase 3)
            ↓
       Deployment (Phase 4)
            ↓
        Testing (Phase 5)
            ↓
          Docs (Phase 6)
```

---

## Risk Management

### High Risk Items:

1. **YAML Parsing with Cyrillic:** Test early with actual course data
2. **GitHub Pages Deployment:** Test workflow early
3. **Route Generation:** Verify all routes pre-rendered

### Mitigation Strategies:

- Test with real data from day 1
- Set up CI/CD early (Phase 4 can be done earlier)
- Regular testing throughout development
- Incremental commits and testing

---

## Next Steps

1. Review this task breakdown
2. Confirm approach and estimates
3. Begin Phase 0: Project Setup
4. Work through phases sequentially
5. Test continuously
6. Deploy early and often

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Status:** Ready for Implementation
