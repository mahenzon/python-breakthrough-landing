# Project Design Document
## Python Web Development Course Landing Site

---

## 1. Project Overview

**Project Name:** Python Breakthrough Course Landing Site

**Purpose:** A pre-rendered static multi-page landing site for an online course about web development in Python, hosted on GitHub Pages with a custom domain.

**Target Audience:** Russian-speaking students interested in learning web development with Python.

**Key Characteristics:**
- Fully static, pre-rendered site for optimal performance and SEO
- Content-driven from YAML exports (modules → topics → lessons)
- GitHub Pages compatible with automated deployment
- Modern, lightweight UI with Tailwind CSS
- Russian language interface with i18n support for future languages

---

## 2. Technology Stack & Rationale

### Core Framework: Nuxt 3

**Choice Rationale:**
- User familiarity with Nuxt 3
- Excellent static site generation (SSG) capabilities
- Built-in routing, meta management, and SEO features
- Vue 3 Composition API for modern component architecture
- Strong TypeScript support
- File-based routing system

### Styling: Tailwind CSS

**Choice Rationale:**
- Utility-first approach for rapid development
- Lightweight and tree-shakeable
- Modern design patterns built-in
- Easy responsive design
- Excellent documentation

### Additional Technologies:

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Nuxt 3** | Framework | Latest stable (^3.x) |
| **Vue 3** | UI Library | ^3.x |
| **Tailwind CSS** | Styling | ^3.x |
| **@nuxtjs/i18n** | Internationalization | ^8.x |
| **@nuxtjs/sitemap** | SEO - Sitemap generation | Latest |
| **js-yaml** | YAML parsing | ^4.x |
| **TypeScript** | Type safety | ^5.x |

---

## 3. Architecture & Design Patterns

### Static Site Generation (SSG) Architecture

```
Content Source (YAML) → Build Process → Static HTML/CSS/JS → GitHub Pages
```

### Key Architectural Principles:

1. **Static First:** All pages pre-rendered at build time
2. **Content Separation:** Content (YAML) separate from presentation (Vue components)
3. **Component-Based:** Reusable Vue components for UI elements
4. **Type Safety:** TypeScript interfaces matching content models
5. **SEO Optimized:** Pre-rendered HTML with proper meta tags
6. **Progressive Enhancement:** Basic HTML works, JS enhances

### Data Flow:

```
course-data/*.yaml
    ↓
Nuxt composables/utils
    ↓ (parse & validate)
TypeScript Models
    ↓ (provide to)
Vue Components
    ↓ (render to)
Static HTML Pages
```

---

## 4. Folder Structure

```
python-breakthrough-landing/
├── course-data/                    # Content source (external)
│   └── {NN-module-name}/
│       ├── index.yaml              # Module metadata
│       └── {NN-topic-name}.yaml   # Topic + lessons
│
├── project-plan/                   # Planning docs (this folder)
│   ├── design.md
│   ├── requirements.md
│   └── tasks.md
│
├── website/                        # Main Nuxt application
│   ├── .output/                    # Build output (ignored)
│   ├── assets/                     # Global assets
│   │   └── css/
│   │       └── tailwind.css        # Tailwind imports
│   │
│   ├── components/                 # Vue components
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Navigation.vue
│   │   ├── course/
│   │   │   ├── ModuleAccordion.vue
│   │   │   ├── ModuleCard.vue
│   │   │   ├── TopicCard.vue
│   │   │   ├── LessonList.vue
│   │   │   └── AccordionControls.vue
│   │   ├── ui/
│   │   │   ├── Accordion.vue
│   │   │   ├── Card.vue
│   │   │   ├── Button.vue
│   │   │   └── Badge.vue
│   │   └── sections/
│   │       ├── HeroSection.vue
│   │       ├── StatsSection.vue
│   │       ├── FaqSection.vue
│   │       └── LinksSection.vue
│   │
│   ├── composables/                # Vue composables
│   │   ├── useCourseData.ts        # Course data loader
│   │   ├── useAccordion.ts         # Accordion state management
│   │   └── useMetaTags.ts          # Meta tags helper
│   │
│   ├── content/                    # Static content
│   │   ├── site-config.yaml        # Site config (author info, etc)
│   │   ├── latest-changes.md       # Latest changes content
│   │   ├── projects.yaml           # Student projects list
│   │   └── faq.yaml                # FAQ data
│   │
│   ├── layouts/                    # Nuxt layouts
│   │   └── default.vue             # Default layout
│   │
│   ├── locales/                    # i18n translations
│   │   └── ru.ts                   # Russian translations (TypeScript)
│   │
│   ├── pages/                      # File-based routing
│   │   ├── index.vue               # Home/Landing page
│   │   ├── modules/
│   │   │   ├── index.vue           # Modules overview
│   │   │   └── [moduleId]/
│   │   │       ├── index.vue       # Module detail
│   │   │       └── [topicId]/
│   │   │           └── index.vue   # Topic detail
│   │   ├── latest-changes.vue      # Latest changes page
│   │   ├── statistics.vue          # Statistics page
│   │   ├── projects.vue            # Student projects page
│   │   ├── faq.vue                 # FAQ page
│   │   └── collaboration.vue       # Collaboration page
│   │
│   ├── public/                     # Static public files
│   │   ├── favicon.ico
│   │   └── robots.txt
│   │
│   ├── types/                      # TypeScript types
│   │   ├── course.ts               # Course data models
│   │   ├── site-config.ts          # Site config types
│   │   └── content.ts              # Content types
│   │
│   ├── utils/                      # Utility functions
│   │   ├── yaml-loader.ts          # YAML file loader
│   │   ├── course-parser.ts        # Course data parser
│   │   └── stats-calculator.ts     # Statistics calculations
│   │
│   ├── .gitignore
│   ├── nuxt.config.ts              # Nuxt configuration
│   ├── package.json
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── README.md
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deploy workflow
│
└── README.md                       # Project root README
```

---

## 5. Data Model & Content Structure

### TypeScript Interfaces (matching Python models):

```typescript
// types/course.ts

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

### Site Configuration Model:

```typescript
// types/site-config.ts

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

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  author: AuthorInfo;
  course: CourseInfo;
  statistics: {
    numberOfStudents: number;
  };
}
```

### FAQ Model:

```typescript
// types/content.ts

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

---

## 6. Component Design

### Page Components:

#### 6.1 Home Page (`pages/index.vue`)

**Sections:**
1. **Hero Section** - Author info + Course intro
2. **Course Overview** - Main features/benefits
3. **Modules Accordion** - Full course structure
4. **Statistics** - Quick stats
5. **CTA Section** - Sign-up or contact

**Components Used:**
- `HeroSection.vue`
- `ModuleAccordion.vue` (with expand/collapse all)
- `StatsSection.vue`

**Note:** FAQ and Projects are standalone pages (`/faq` and `/projects`), not included on the home page to keep it focused.

#### 6.2 Module Page (`pages/modules/[moduleId]/index.vue`)

**Content:**
- Module name and description (markdown rendered)
- List of topics with lesson counts
- Breadcrumb navigation
- Total module statistics

**Components Used:**
- `TopicCard.vue`
- Breadcrumb component

#### 6.3 Topic Page (`pages/modules/[moduleId]/[topicId]/index.vue`)

**Content:**
- Topic name and description
- List of lessons with duration and tasks
- Module breadcrumb
- Progress indicators

**Components Used:**
- `LessonList.vue`
- Breadcrumb component

**Note:** Using topic-level pages provides better granularity for SEO and sharing. Each topic gets its own URL and can be indexed/shared independently.

#### 6.4 Statistics Page (`pages/statistics.vue`)

**Content:**
- Total lessons count
- Total videos count
- Total duration (formatted as hours/minutes)
- Number of students
- Additional metrics (modules, topics, tasks)
- Visual charts/progress bars

#### 6.5 Projects Page (`pages/projects.vue`) - Standalone Page

**Content:**
- Full list of student projects (not a preview)
- Each project: title, description, link, author
- Dedicated page accessible via `/projects`
- Filter/sort options (future enhancement)

**Design Note:** This is a completely separate page, not embedded in home page.

#### 6.6 Latest Changes Page (`pages/latest-changes.vue`)

**Content:**
- Markdown content from `content/latest-changes.md`
- Reverse chronological order
- Date-based sections

#### 6.7 FAQ Page (`pages/faq.vue`) - Standalone Page

**Content:**
- Full FAQ with accordion-style Q&A
- Includes async learning info
- Module order flexibility
- Expandable answers
- Dedicated page accessible via `/faq`

**Design Note:** This is a completely separate page, not embedded in home page.

#### 6.8 Collaboration Page (`pages/collaboration.vue`)

**Content:**
- Information about corporate contracts
- Group consultation options
- Contact information

### Reusable Components:

#### Accordion Component (`components/ui/Accordion.vue`)

**Props:**
- `items: AccordionItem[]`
- `allowMultiple: boolean`
- `defaultExpanded: boolean`

**Features:**
- Expand/collapse animation
- Keyboard navigation
- ARIA attributes for accessibility

#### Module Accordion (`components/course/ModuleAccordion.vue`)

**Props:**
- `modules: Module[]`
- `showControls: boolean`

**Features:**
- Nested structure (module → topics → lessons)
- Expand all / Collapse all controls
- Visual hierarchy
- Lesson metadata display (duration, tasks)

#### Card Components

- `ModuleCard.vue` - For module overview
- `TopicCard.vue` - For topic display
- `LessonList.vue` - For lessons within a topic

---

## 7. Styling Strategy

### Tailwind CSS Configuration

**Design Tokens:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... blue scale
          900: '#0c4a6e'
        },
        accent: {
          // Complementary color for CTAs
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Custom spacing if needed
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'), // For markdown content
    require('@tailwindcss/forms'),      // For form styling
  ]
}
```

### Design Principles:

1. **Light Color Palette:** Whites, light grays, soft blues
2. **Modern & Clean:** Minimalist, plenty of whitespace
3. **Responsive First:** Mobile-first approach
4. **Consistent Spacing:** Use Tailwind's spacing scale
5. **Readable Typography:** Large font sizes, proper line height
6. **Subtle Interactions:** Smooth transitions, hover effects

### Responsive Breakpoints:

- **sm:** 640px - Small tablets
- **md:** 768px - Tablets
- **lg:** 1024px - Laptops
- **xl:** 1280px - Desktops
- **2xl:** 1536px - Large screens

---

## 8. Internationalization (i18n)

### Setup: @nuxtjs/i18n

**Configuration:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', file: 'ru.ts', name: 'Русский' }
    ],
    langDir: 'locales/',
    strategy: 'no_prefix', // No language prefix in URLs
    detectBrowserLanguage: false // Always use default
  }
})
```

### Translation Structure (`locales/ru.ts`):

**Why TypeScript over JSON/YAML:**
- Type safety and autocompletion in IDE
- Compile-time error detection
- Better refactoring support
- No runtime parsing overhead
- Can add comments for translators

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

### Alternative: YAML Format

If you prefer YAML for consistency with content files, you can use YAML:

```yaml
# locales/ru.yaml
nav:
  home: Главная
  modules: Модули
  statistics: Статистика
  projects: Проекты
  faq: Вопросы
  latest: Обновления
  collaboration: Сотрудничество

course:
  modules: Модули курса
  topics: Темы
  lessons: Уроки
  duration: Длительность
  tasks: Задач
  minutes: мин
  module: Модуль
  topic: Тема

accordion:
  expandAll: Развернуть всё
  collapseAll: Свернуть всё

stats:
  title: Статистика курса
  totalLessons: Всего уроков
  totalVideos: Всего видео
  totalDuration: Общая длительность
  students: Студентов
  modules: Модулей
  topics: Тем
  tasks: Задач

faq:
  title: Часто задаваемые вопросы

projects:
  title: Проекты студентов
  viewProject: Посмотреть проект

latest:
  title: Последние обновления

collaboration:
  title: Сотрудничество

footer:
  copyright: Все права защищены
```

**Recommendation:** Use TypeScript format (`.ts`) for better developer experience and type safety.

### Content Localization:

- All course content (module descriptions, lesson names) remains in Russian
- Only UI elements translated
- Future: English translations can be added by creating `en.ts` file with the same structure

---

## 9. SEO Strategy

### Meta Tags (per page):

```typescript
// Using useHead composable
useHead({
  title: 'Page Title - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Page description' },
    { property: 'og:title', content: 'Page Title' },
    { property: 'og:description', content: 'Page description' },
    { property: 'og:url', content: 'https://domain.com/page' },
    { property: 'og:type', content: 'website' }
  ]
})
```

### Sitemap Generation:

**Module:** `@nuxtjs/sitemap`

**Configuration:**
```typescript
// nuxt.config.ts
sitemap: {
  hostname: 'https://yourdomain.com',
  gzip: true,
  routes: async () => {
    // Dynamically generate routes from course data
    const modules = await loadCourseData();
    return generateAllRoutes(modules);
  }
}
```

### URL Structure:

```
/                                  → Home
/modules                           → Modules index
/modules/11-osnovyi-frontend       → Module page
/modules/11-osnovyi-frontend/01-html → Topic page
/statistics                        → Statistics
/projects                          → Projects
/latest-changes                   → Latest changes
/faq                              → FAQ
/collaboration                    → Collaboration
```

### robots.txt:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### Semantic HTML:

- Proper heading hierarchy (h1 → h2 → h3)
- Semantic tags (`<nav>`, `<main>`, `<article>`, `<section>`)
- ARIA labels for accessibility
- Alt text for images (if any)

---

## 10. Build & Deployment Pipeline

### Local Development:

```bash
# Install dependencies
cd website
npm install

# Development server
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Build for production
npm run generate
```

### Build Process:

1. **Parse Content:** Load all YAML files from `../course-data/`
2. **Generate Routes:** Create static routes for all modules/topics
3. **Pre-render Pages:** Build HTML for each route
4. **Optimize Assets:** Minify CSS/JS, optimize images
5. **Generate Sitemap:** Create sitemap.xml
6. **Output:** Static files in `.output/public/`

### GitHub Actions Workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
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

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/.output/public
          cname: yourdomain.com  # Custom domain
```

### GitHub Pages Configuration:

1. **Repository Settings:**
   - Enable GitHub Pages
   - Source: `gh-pages` branch (created by action)
   - Custom domain: Configure in settings

2. **DNS Configuration:**
   - Add CNAME record pointing to `username.github.io`
   - GitHub will handle SSL certificate

---

## 11. Content Update Workflow

### Regular Content Updates:

```bash
# 1. Export new content to course-data/ (external process)
python export_course.py

# 2. Review changes
git status
git diff course-data/

# 3. Commit and push
git add course-data/
git commit -m "Update course content: add new lessons"
git push origin main

# 4. GitHub Actions automatically builds and deploys
# Wait ~2-3 minutes for deployment
```

### Adding Latest Changes:

```bash
# Edit the markdown file
vim website/content/latest-changes.md

# Add entry at the top
# ## 2024-01-15
# - Added new module on Django
# - Updated FastAPI lessons

git add website/content/latest-changes.md
git commit -m "Add latest changes entry"
git push
```

### Adding Student Projects:

```bash
# Edit projects YAML
vim website/content/projects.yaml

# Add new project entry
git add website/content/projects.yaml
git commit -m "Add student project: My Awesome App"
git push
```

### Updating Site Configuration:

```bash
# Edit site config
vim website/content/site-config.yaml

# Update author bio, student count, etc.
git add website/content/site-config.yaml
git commit -m "Update student count"
git push
```

---

## 12. Performance Optimization

### Build-Time Optimizations:

1. **Code Splitting:** Nuxt automatically splits code per page
2. **Tree Shaking:** Remove unused Tailwind classes
3. **Minification:** JS/CSS minified in production
4. **Image Optimization:** Use WebP format if images added

### Runtime Optimizations:

1. **Static HTML:** No JS required for initial render
2. **Lazy Loading:** Images and components lazy-loaded
3. **Caching Headers:** Set via GitHub Pages/CloudFlare
4. **Preload Critical Resources:** Font, critical CSS

### Monitoring:

- Google Lighthouse audits (target 90+ scores)
- Core Web Vitals monitoring
- PageSpeed Insights testing

---

## 13. Accessibility

### WCAG 2.1 AA Compliance:

1. **Keyboard Navigation:** All interactive elements accessible via keyboard
2. **Screen Readers:** Proper ARIA labels and semantic HTML
3. **Color Contrast:** Minimum 4.5:1 ratio for text
4. **Focus Indicators:** Visible focus states
5. **Alt Text:** All images have descriptive alt text
6. **Heading Hierarchy:** Logical h1-h6 structure

### Testing Tools:

- axe DevTools
- WAVE browser extension
- Lighthouse accessibility audit

---

## 14. Future Enhancements (Out of Scope)

1. **Search Functionality:** Full-text search across lessons
2. **Dark Mode:** Theme toggle
3. **Progress Tracking:** Student progress (requires backend)
4. **Comments:** Lesson comments (requires backend)
5. **Video Embedding:** Direct video player integration
6. **Newsletter:** Email subscription form
7. **Multi-language:** English version
8. **Analytics:** Google Analytics or privacy-friendly alternative

---

## 15. Risk Mitigation

### Potential Risks:

1. **YAML Parsing Errors:**
   - **Mitigation:** Validate YAML at build time, fail fast
   - Add schema validation with proper error messages

2. **Build Failures:**
   - **Mitigation:** Local build testing before push
   - GitHub Actions notifications on failure

3. **Content Encoding Issues:**
   - **Mitigation:** Ensure UTF-8 encoding throughout
   - Test with Cyrillic characters

4. **Routing Edge Cases:**
   - **Mitigation:** Proper URL slugification
   - Handle special characters in folder names

5. **Large Content Growth:**
   - **Mitigation:** Optimize build process
   - Consider pagination if needed

---

## 16. Success Metrics

### Technical Metrics:

- **Build Time:** < 2 minutes
- **Page Load Time:** < 2 seconds (LCP)
- **Lighthouse Score:** 90+ in all categories
- **Bundle Size:** < 100KB initial JS

### Content Metrics:

- All modules/topics/lessons rendered correctly
- No broken links
- All meta tags populated
- Sitemap includes all pages

---

This design document serves as the technical blueprint for implementation. All decisions are based on the requirements in `idea.md` and optimized for GitHub Pages static hosting with Nuxt 3.
