# Python Breakthrough Website

Nuxt 3 application for the Python Breakthrough course landing site.

## Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev
```

Visit `http://localhost:3000`

## Development

### Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
npm run typecheck    # TypeScript type checking
npm run lint         # Lint code
```

### Project Structure

```
website/
├── assets/          # Global assets (CSS)
├── components/      # Vue components
│   ├── layout/      # Header, footer, nav
│   ├── course/      # Course-specific components
│   ├── ui/          # Reusable UI components
│   └── sections/    # Page sections
├── composables/     # Vue composables
├── content/         # Static content (YAML, MD)
├── i18n/
│   └── locales/     # Translation files
├── layouts/         # Nuxt layouts
├── pages/           # File-based routing
├── public/          # Static public files
├── types/           # TypeScript types
├── utils/           # Utility functions
├── app.vue          # Root component
├── nuxt.config.ts   # Nuxt configuration
└── tailwind.config.js # Tailwind configuration
```

## Configuration

### Nuxt Config (`nuxt.config.ts`)

Key configuration:
- Modules: Tailwind, i18n, Sitemap
- i18n: Russian locale, no prefix strategy
- Nitro preset: `github_pages` for GitHub Pages deployment

### Tailwind Config (`tailwind.config.js`)

- Custom primary color palette (blue)
- Typography plugin for markdown
- Forms plugin for form styling
- Inter font family

## Content Management

### Course Data

Course content loaded from `../course-data/`:
- Modules: `NN-module-name/` folders
- Topics: `NN-topic-name.yaml` files
- Lessons: Inside topic YAML files

### Site Content

Editable content in `content/`:
- **site-config.yaml** - Author info, course details, student count
- **faq.yaml** - FAQ questions and answers
- **projects.yaml** - Student projects list
- **latest-changes.md** - Latest updates (markdown)

### Translations

Russian translations in `i18n/locales/ru.ts`:
- Navigation labels
- UI text
- Section titles
- All interface elements

TypeScript format provides type safety and autocompletion.

## Data Flow

```
course-data/ (YAML)
    ↓
utils/course-parser.ts
    ↓
composables/useCourseData.ts
    ↓
pages/*.vue (Vue components)
    ↓
Static HTML (generated)
```

## Pages

### Implemented Pages

- `/` - Home page (hero, stats, CTA)
- `/modules` - Modules listing
- `/statistics` - Course statistics
- `/projects` - Student projects
- `/faq` - Frequently asked questions
- `/latest-changes` - Latest updates
- `/collaboration` - Collaboration info

### To Implement

- `/modules/[moduleId]` - Module detail
- `/modules/[moduleId]/[topicId]` - Topic detail

## Components

### Layout Components
- `Header.vue` - Site header with navigation
- `Footer.vue` - Site footer
- `Navigation.vue` - Navigation menu

### Course Components
- `ModuleAccordion.vue` - Module accordion with topics/lessons
- `ModuleCard.vue` - Module card
- `TopicCard.vue` - Topic card
- `LessonList.vue` - Lessons list

### UI Components
- `Accordion.vue` - Generic accordion
- `Card.vue` - Card component
- `Button.vue` - Button component

### Section Components
- `HeroSection.vue` - Hero section
- `StatsSection.vue` - Statistics section
- `FaqSection.vue` - FAQ section

## Composables

### Data Access

- **useCourseData** - Course structure and statistics
- **useSiteConfig** - Site configuration
- **useFaqData** - FAQ items
- **useProjectsData** - Student projects
- **useLatestChanges** - Latest updates

### Usage

```vue
<script setup>
const { getCourseData, getStatistics } = useCourseData();
const { getSiteConfig } = useSiteConfig();

const config = getSiteConfig();
const course = getCourseData();
const stats = getStatistics(config.statistics.numberOfStudents);
</script>
```

## TypeScript Types

All types defined in `types/`:
- **course.ts** - Course, Module, Topic, Lesson, Statistics
- **site-config.ts** - SiteConfig, AuthorInfo, CourseInfo
- **content.ts** - FaqItem, StudentProject

Types match Python models in `../example-data/models.py`.

## Styling

### Tailwind CSS

Utility-first CSS framework with custom configuration:
- Primary color: Blue (#0ea5e9)
- Light color palette
- Modern, clean design
- Responsive breakpoints: sm, md, lg, xl, 2xl

### Design Principles

1. Light colors and whitespace
2. Modern but not overcomplicated
3. Mobile-first responsive design
4. Consistent spacing
5. Subtle interactions and transitions

## SEO

### Meta Tags

Every page has:
- Title
- Description
- Open Graph tags (title, description, url, type)

### Sitemap

Automatically generated at build time:
- All static pages
- All dynamic module/topic pages
- Submitted to search engines

### robots.txt

Allows all search engines, includes sitemap reference.

## i18n

### Current Setup

- Default locale: Russian (ru)
- No language selector
- All UI text translated
- Course content remains in Russian

### Adding New Language

1. Create `i18n/locales/en.ts`
2. Copy structure from `ru.ts`
3. Translate all strings
4. Update `nuxt.config.ts`:

```typescript
locales: [
  { code: 'ru', file: 'ru.ts', name: 'Русский' },
  { code: 'en', file: 'en.ts', name: 'English' }
]
```

## Building

### Development Build

```bash
npm run build
```

Creates optimized build in `.output/`.

### Static Generation

```bash
npm run generate
```

Pre-renders all pages to static HTML in `.output/public/`.

### Preview Build

```bash
npm run preview
```

Serves the generated static site locally.

## Deployment

See parent [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment guide.

### Quick Deploy

```bash
# Generate static site
npm run generate

# Output in .output/public/
# Deploy this folder to GitHub Pages
```

## Environment

### Node.js

Requires Node.js v20 or higher.

### Dependencies

Key dependencies:
- `nuxt` ^3.x - Framework
- `vue` ^3.x - UI library
- `@nuxtjs/tailwindcss` ^6.x - Styling
- `@nuxtjs/i18n` ^8.x - Internationalization
- `@nuxtjs/sitemap` ^6.x - SEO sitemap
- `js-yaml` ^4.x - YAML parsing
- `marked` ^14.x - Markdown rendering

## Troubleshooting

### Build Issues

**YAML parsing errors:**
- Validate YAML syntax
- Check UTF-8 encoding
- Verify file structure

**Type errors:**
- Run `npm run typecheck`
- Ensure types match data structure

**Module not found:**
- Run `npm install`
- Check import paths

### Development Issues

**Port in use:**
```bash
PORT=3001 npm run dev
```

**Cache issues:**
```bash
rm -rf .nuxt .output
npm run dev
```

## Best Practices

1. **TypeScript** - Use types for all data
2. **Composables** - Share logic with composables
3. **Components** - Keep components small and focused
4. **Commits** - Make meaningful commits
5. **Testing** - Test build before deploying

## Resources

- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

## Support

For issues or questions:
1. Check [DEPLOYMENT.md](../DEPLOYMENT.md)
2. Review [project-plan/](../project-plan/) docs
3. Check Nuxt documentation
4. Create GitHub issue

---

**Happy coding! 🚀**
