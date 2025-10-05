# Built with AI Assistance

This website was built with the help of **Droid**, an AI software engineering agent by Factory.

## What Was Created

This is a fully functional static landing site for a Python web development course, featuring:

- **Technology Stack**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- **Architecture**: Pre-rendered static site optimized for GitHub Pages
- **Content Management**: YAML-based course data structure with automated JSON generation
- **9 Page Types**: Home, Modules overview, Individual module pages, Topic pages, Statistics, Projects, FAQ, Latest changes, Collaboration
- **Internationalization**: i18n support with Russian translations
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **SEO Optimized**: Meta tags, sitemap, proper semantic HTML
- **CI/CD Pipeline**: GitHub Actions workflow for automated deployment

## Why It Was Built This Way

### Design Decisions

1. **Static Site Generation**: Chosen for optimal performance, security, and hosting simplicity on GitHub Pages. All pages are pre-rendered at build time.

2. **YAML Content Source**: Course data stored in human-readable YAML files (`course-data/`) allows easy content updates without touching code. Data is transformed to JSON during build for optimal runtime performance.

3. **No CMS Required**: Content lives in Git alongside code, enabling version control, pull request workflows, and eliminating external dependencies.

4. **Type Safety**: TypeScript throughout ensures data structure consistency and catches errors at build time rather than runtime.

5. **Minimal Dependencies**: Only essential packages included to keep bundle size small and maintenance burden low.

### Technical Approach

- **File-based Routing**: Leverages Nuxt's automatic routing from `pages/` directory
- **Pre-generation Scripts**: `scripts/generate-data.ts` processes YAML → JSON before site generation
- **Statistics Calculation**: Course metrics computed at build time from course data
- **Clean Separation**: Server utilities for build-time processing, client code stays lean

## Key Features Implemented

### Content Structure
- Hierarchical course organization: Modules → Topics → Lessons
- Each lesson includes duration, task count, and order
- Flexible metadata support for descriptions and ordering

### User Experience
- Accordion-style module browser with expand/collapse functionality
- Statistics dashboard showing course metrics (modules, topics, lessons, tasks, duration, students)
- Responsive navigation and mobile-friendly layouts
- Smooth hover effects and transitions

### Developer Experience  
- Single command deployment: `npm run generate`
- Automated statistics generation from course data
- No manual page count needed - video counts removed since lessons may contain multiple videos
- Consistent code style with ESLint

### Deployment
- Automatic deployment to GitHub Pages on push to master
- Build caching for faster CI/CD runs
- Separate build and deploy jobs for better control
- Manual workflow trigger option for on-demand deploys

## What I Did

### Session 1: Statistics Refactoring
1. **Removed inaccurate video count metric** - Since lessons contain duration but may have multiple videos, the 1:1 assumption was incorrect
2. **Redesigned homepage statistics section** - Changed from 4 cards to 6 cards showing comprehensive metrics without duplicating numbers
3. **Updated student count** - Changed from 100 to 75 as requested
4. **Cleaned up code** - Removed unnecessary pluralization functions in favor of simple i18n translations

### Session 2: CI/CD Implementation  
5. **Created GitHub Actions workflow** - Automated static site generation and deployment to GitHub Pages
6. **Followed project plan specifications** - Implemented deployment pipeline exactly as documented in `project-plan/tasks.md`

## Commits Made

```
1f66836 feat: add GitHub Actions workflow for automated deployment
a6acdfe refactor: redesign homepage statistics section with 6 cards  
dbd43fa refactor: remove total videos count from statistics
```

All changes followed conventional commit format with detailed descriptions.

## How to Update Content

1. Edit YAML files in `course-data/` directory
2. Run `npm run stats` to regenerate JSON data (or just `npm run generate` which includes this)
3. Commit and push to master
4. GitHub Actions automatically builds and deploys the updated site

## Credits

- **AI Agent**: Droid by Factory ([factory.ai](https://factory.ai))
- **Human Direction**: Course content, design requirements, and project vision by Suren Khorenyan
- **Built**: October 2025

---

*This project demonstrates the capability of AI-assisted development for creating production-ready static sites with proper architecture, automated workflows, and maintainable code structure.*
