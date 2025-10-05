# Requirements Document
## Python Breakthrough Course Landing Site

---

## 1. Introduction

This document outlines all functional and non-functional requirements for the Python Breakthrough Course landing site. Requirements are derived from `idea.md` and expanded with technical details.

### 1.1 Document Purpose

- Define complete scope of the project
- Serve as acceptance criteria for implementation
- Guide testing and validation

### 1.2 Project Scope

**In Scope:**
- Static multi-page website
- Content sourced from YAML exports
- GitHub Pages deployment
- Russian language interface
- SEO optimization

**Out of Scope:**
- User authentication
- Dynamic server-side functionality
- Payment processing
- Student progress tracking
- Real-time features

---

## 2. Functional Requirements

### FR-1: Pages & Navigation

#### FR-1.1 Home / Landing Page (MUST HAVE)

**Requirements:**
- Display author information (configurable via YAML)
- Display course information (configurable via YAML)
- Show complete course structure in accordion format
  - Hierarchical structure: Modules → Topics → Lessons
  - Each level shows relevant metadata
- Include statistics overview section
- Include links section (social, platform, personal site)
- Responsive layout for all screen sizes

**Note:** FAQ and Projects are separate standalone pages (/faq and /projects), not included on home page.

**Acceptance Criteria:**
- Author info loaded from `website/content/site-config.yaml`
- Course info loaded from `website/content/site-config.yaml`
- Modules/topics/lessons loaded from `course-data/` folder
- All sections visible and properly styled
- Page loads in < 2 seconds

#### FR-1.2 Modules Index Page (MUST HAVE)

**Requirements:**
- List all course modules
- Show module name, description, and metadata
- Display module statistics (topics count, lessons count, total duration)
- Accordion or grid layout
- Link to individual module pages

**Acceptance Criteria:**
- All modules from `course-data/` displayed
- Modules sorted by order number
- Each module is clickable and navigates to module detail page

#### FR-1.3 Module Detail Page (MUST HAVE)

**Requirements:**
- Display module name and full description (markdown formatted)
- List all topics in the module
- Show topic metadata (lessons count, total duration)
- Display breadcrumb navigation (Home → Modules → Current Module)
- Show module statistics summary
- Link to individual topic pages

**Acceptance Criteria:**
- Module description rendered from markdown
- All topics in module displayed
- Breadcrumb navigation works correctly
- Topics sorted by order number
- Each topic is clickable

#### FR-1.4 Topic Detail Page (MUST HAVE)

**Requirements:**
- Display topic name and description
- List all lessons in the topic with:
  - Lesson name
  - Duration (minutes)
  - Number of tasks
  - Order number
- Display breadcrumb navigation (Home → Modules → Module → Topic)
- Show topic statistics summary

**Acceptance Criteria:**
- All lesson data displayed correctly
- Lessons sorted by order number
- Breadcrumb navigation works
- Duration displayed in human-readable format
- Task count visible for each lesson

**Design Decision:** Topic-level pages provide better SEO granularity than lesson-level pages while maintaining manageable page count. Each topic represents a cohesive learning unit.

#### FR-1.5 Latest Changes Page (MUST HAVE)

**Requirements:**
- Display latest updates and changes to course
- Content stored in `website/content/latest-changes.md`
- Markdown formatting supported
- Reverse chronological order
- Easy to update by editing markdown file

**Acceptance Criteria:**
- Markdown content rendered correctly
- Heading levels styled appropriately
- Links in content work
- File can be edited directly to add new entries

#### FR-1.6 Statistics Page (MUST HAVE)

**Requirements:**
- Calculate and display:
  - Total number of lessons
  - Total number of videos (equals lessons)
  - Total duration (sum of all lesson durations)
  - Total duration formatted (e.g., "24 hours 30 minutes")
  - Number of students (from site config)
  - Number of modules
  - Number of topics
  - Total number of tasks
- Visual presentation (cards, charts, or stats grid)
- Data calculated from course-data at build time

**Acceptance Criteria:**
- All metrics calculated correctly
- Duration math accurate
- Numbers match source data
- Formatted for readability

#### FR-1.7 Student Projects Page (MUST HAVE)

**Requirements:**
- List student-created projects
- Each project displays:
  - Title
  - Description
  - Link to project
  - Optional: Author name
- Content stored in `website/content/projects.yaml`
- Projects sorted by order or date
- Responsive card/grid layout

**Acceptance Criteria:**
- All projects from YAML displayed
- Links open in new tab
- Cards have consistent styling
- Empty state handled (no projects yet)

#### FR-1.8 FAQ Page (MUST HAVE)

**Requirements:**
- Display frequently asked questions
- Accordion-style expandable answers
- Must include these topics:
  - Course is asynchronous (learn at own pace)
  - Modules can be completed in any order
- Content stored in `website/content/faq.yaml`
- Keyboard accessible

**Acceptance Criteria:**
- Both required questions included
- All FAQs from YAML displayed
- Accordion expand/collapse works
- Keyboard navigation supported (Tab, Enter, Space)
- Only one answer expanded at a time (or configurable)

#### FR-1.9 Collaboration Page (MUST HAVE)

**Requirements:**
- Information about corporate/organization contracts
- Details about group consultations
- Private consultation options
- Contact information or form
- Content configurable via markdown or YAML

**Acceptance Criteria:**
- All collaboration information displayed
- Contact method clear
- Professional presentation
- Links work correctly

#### FR-1.10 Links Section (MUST HAVE)

**Requirements:**
- Display social media links
- Display platform links
- Link to personal landing page
- Icon-based presentation
- Links configurable in site config

**Acceptance Criteria:**
- All links from config displayed
- Icons render correctly
- Links open in new tab
- Responsive layout

### FR-2: Accordion Components

#### FR-2.1 Course Structure Accordion (MUST HAVE)

**Requirements:**
- Three-level hierarchy: Modules → Topics → Lessons
- Each level expandable/collapsible
- Show metadata at each level:
  - Module: topics count, total lessons, total duration
  - Topic: lessons count, duration
  - Lesson: duration, tasks count
- Smooth expand/collapse animation
- Keyboard accessible

**Acceptance Criteria:**
- All three levels work correctly
- Nested accordions function properly
- Animation smooth (< 300ms)
- No layout shift during animation
- ARIA attributes present

#### FR-2.2 Accordion Controls (MUST HAVE)

**Requirements:**
- "Expand All" button
- "Collapse All" button
- Buttons apply to current accordion context
- Visual feedback on click

**Acceptance Criteria:**
- Expand all opens all accordion items
- Collapse all closes all accordion items
- Works for nested accordions
- Button state updates appropriately

### FR-3: Content Management

#### FR-3.1 YAML Content Loading (MUST HAVE)

**Requirements:**
- Parse YAML files from `course-data/` directory
- Support module structure:
  - `{NN-module-name}/index.yaml` → Module metadata
  - `{NN-module-name}/{NN-topic-name}.yaml` → Topic and lessons
- Handle UTF-8 encoding (Cyrillic characters)
- Validate data against TypeScript interfaces
- Graceful error handling for malformed YAML

**Acceptance Criteria:**
- All YAML files loaded successfully
- Cyrillic text displays correctly
- Build fails with clear error if YAML invalid
- Data structure matches TypeScript types

#### FR-3.2 Site Configuration (MUST HAVE)

**Requirements:**
- Centralized config file: `website/content/site-config.yaml`
- Configure:
  - Author name, bio, avatar, social links
  - Course title, subtitle, description, features
  - Number of students
  - Any other site-wide settings
- Easy to edit without code changes

**Acceptance Criteria:**
- Config file parsed correctly
- All configurable items use config values
- Changes to config reflected after rebuild
- YAML structure documented

#### FR-3.3 Content Update Workflow (MUST HAVE)

**Requirements:**
- Content updates via pushing to GitHub
- Automated build and deployment via GitHub Actions
- No manual intervention required after git push
- Build time < 5 minutes

**Acceptance Criteria:**
- Push to main branch triggers build
- New content appears on site after deployment
- Failed builds send notifications
- Rollback possible via git revert

### FR-4: SEO & Meta Tags

#### FR-4.1 Open Graph Meta Tags (MUST HAVE)

**Requirements:**
- Every page has meta tags:
  - `og:title` - Page-specific title
  - `og:description` - Page-specific description
  - `og:url` - Full URL of page
  - `og:type` - "website"
- No image meta tag (as specified)
- Tags customized per page type

**Acceptance Criteria:**
- All pages have required meta tags
- Social media preview works (Twitter, Facebook, Telegram)
- Titles and descriptions relevant to page content
- URLs absolute and correct

#### FR-4.2 Sitemap Generation (MUST HAVE)

**Requirements:**
- Generate `sitemap.xml` at build time
- Include all pages:
  - Static pages (home, statistics, FAQ, etc.)
  - Dynamic pages (all modules, topics)
- Update automatically when content changes
- Proper priority and change frequency

**Acceptance Criteria:**
- Sitemap includes all pages
- Valid XML format
- Accessible at `/sitemap.xml`
- Submitted to search engines

#### FR-4.3 robots.txt (MUST HAVE)

**Requirements:**
- Allow all search engines
- Include sitemap reference
- No restricted directories

**Acceptance Criteria:**
- File accessible at `/robots.txt`
- Sitemap URL included
- No syntax errors

### FR-5: Internationalization

#### FR-5.1 Russian Interface (MUST HAVE)

**Requirements:**
- All UI text in Russian
- Translation file: `website/locales/ru.ts` (TypeScript format)
- No language selector (Russian only for now)
- Cover all interface elements:
  - Navigation
  - Buttons
  - Labels
  - Section titles
  - Error messages

**Acceptance Criteria:**
- No English text in UI (except proper nouns)
- All translations in ru.ts with proper types
- Type safety for translation keys
- Easy to update translations
- Content (course data) remains in Russian

#### FR-5.2 Translation Extensibility (SHOULD HAVE)

**Requirements:**
- i18n setup supports multiple languages
- Easy to add new locale files
- Structure allows future language switcher
- TypeScript format provides type safety across languages

**Acceptance Criteria:**
- Adding new language requires only new .ts file (e.g., en.ts)
- New locale follows same type structure as ru.ts
- No code changes needed for new language
- Type checking ensures all keys are present
- Documentation includes how to add language

### FR-6: Styling & Responsiveness

#### FR-6.1 Tailwind CSS Styling (MUST HAVE)

**Requirements:**
- Use Tailwind CSS for all styling
- Light color palette
- Modern, clean design
- Not overcomplicated
- Consistent spacing and typography
- Subtle animations and transitions

**Acceptance Criteria:**
- No custom CSS files (except Tailwind imports)
- All styles use Tailwind classes
- Design system consistent across pages
- Professional appearance

#### FR-6.2 Responsive Design (MUST HAVE)

**Requirements:**
- Mobile-first approach
- Support screen sizes:
  - Mobile: 320px - 640px
  - Tablet: 640px - 1024px
  - Desktop: 1024px+
- Touch-friendly interactive elements
- Readable text on all devices
- No horizontal scroll

**Acceptance Criteria:**
- Site works on iPhone SE (375px width)
- Site works on iPad (768px width)
- Site works on desktop (1920px width)
- All interactions work on touch devices
- Text readable without zooming

#### FR-6.3 Accessibility (SHOULD HAVE)

**Requirements:**
- Semantic HTML
- Keyboard navigation support
- ARIA labels where needed
- Sufficient color contrast (WCAG AA)
- Focus indicators visible

**Acceptance Criteria:**
- Lighthouse accessibility score > 90
- All interactive elements keyboard accessible
- Screen reader compatible
- Color contrast ratio > 4.5:1

---

## 3. Non-Functional Requirements

### NFR-1: Performance

#### NFR-1.1 Page Load Time (MUST HAVE)

**Requirements:**
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3s
- Total page size < 500KB (excluding videos)

**Acceptance Criteria:**
- Lighthouse performance score > 90
- PageSpeed Insights green rating
- Measured on 3G network connection

#### NFR-1.2 Build Time (SHOULD HAVE)

**Requirements:**
- Full site generation < 5 minutes
- Incremental builds not required (static site)

**Acceptance Criteria:**
- GitHub Actions workflow completes in < 5 min
- Build time predictable and consistent

### NFR-2: SEO

#### NFR-2.1 Search Engine Visibility (MUST HAVE)

**Requirements:**
- All pages indexable by search engines
- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions for all pages
- Fast load times (see NFR-1.1)

**Acceptance Criteria:**
- Lighthouse SEO score > 95
- No indexing blockers
- Structured data where applicable

#### NFR-2.2 URL Structure (MUST HAVE)

**Requirements:**
- Clean, descriptive URLs
- No query parameters
- Lowercase with hyphens
- Stable over time (no changes)

**Acceptance Criteria:**
- URLs human-readable
- URLs contain relevant keywords
- No broken links

### NFR-3: Maintainability

#### NFR-3.1 Code Quality (SHOULD HAVE)

**Requirements:**
- TypeScript for type safety
- ESLint for code linting
- Consistent code style
- Component reusability
- Clear file organization

**Acceptance Criteria:**
- No TypeScript errors
- No ESLint errors
- Code passes review

#### NFR-3.2 Documentation (SHOULD HAVE)

**Requirements:**
- README with setup instructions
- Code comments for complex logic
- Component prop documentation
- Content update guide

**Acceptance Criteria:**
- New developer can set up in < 15 minutes
- Content updates documented clearly

### NFR-4: Reliability

#### NFR-4.1 Build Stability (MUST HAVE)

**Requirements:**
- Deterministic builds (same input → same output)
- Error handling for missing data
- Graceful degradation for optional content

**Acceptance Criteria:**
- Build success rate > 95%
- Clear error messages on failure
- No random build failures

#### NFR-4.2 Browser Compatibility (MUST HAVE)

**Requirements:**
- Support modern browsers:
  - Chrome (last 2 versions)
  - Firefox (last 2 versions)
  - Safari (last 2 versions)
  - Edge (last 2 versions)
- Progressive enhancement approach

**Acceptance Criteria:**
- Site functional in all listed browsers
- No JavaScript errors in console
- Graceful fallbacks for unsupported features

### NFR-5: Security

#### NFR-5.1 Static Site Security (MUST HAVE)

**Requirements:**
- No server-side code execution
- HTTPS only (via GitHub Pages)
- No sensitive data in repository
- No client-side secrets

**Acceptance Criteria:**
- All traffic over HTTPS
- No security warnings in browser
- Code review for exposed secrets

### NFR-6: Deployment

#### NFR-6.1 GitHub Pages Hosting (MUST HAVE)

**Requirements:**
- Deploy to GitHub Pages
- Custom domain support
- Automatic SSL certificate
- CDN for global availability

**Acceptance Criteria:**
- Site accessible via custom domain
- SSL certificate valid
- Deployed automatically on push

#### NFR-6.2 Continuous Deployment (MUST HAVE)

**Requirements:**
- GitHub Actions workflow
- Automatic build and deploy on push to main
- Deploy preview for branches (optional)
- Rollback capability

**Acceptance Criteria:**
- Push to main triggers deployment
- Deployment completes in < 5 minutes
- Failed deploys don't affect production

---

## 4. Data Requirements

### DR-1: Course Data Structure

**Requirements:**
- Modules folder structure: `{NN-module-name}/`
- Module index file: `index.yaml`
- Topic files: `{NN-topic-name}.yaml`
- UTF-8 encoding for all files
- YAML syntax compliance

**Schema:**
```yaml
# Module index.yaml
name: string
description: string (multiline, markdown)
order: integer

# Topic {NN-topic-name}.yaml
name: string
order: integer
description: string
lessons:
  - name: string
    duration_minutes: integer
    tasks: integer
    order: integer
```

### DR-2: Site Configuration

**Schema:**
```yaml
# site-config.yaml
author:
  name: string
  bio: string (multiline)
  avatar: string (optional)
  links:
    - name: string
      url: string
      icon: string (optional)

course:
  title: string
  subtitle: string
  description: string (multiline)
  features:
    - string

statistics:
  numberOfStudents: integer
```

### DR-3: FAQ Data

**Schema:**
```yaml
# faq.yaml
- question: string
  answer: string (multiline, markdown)
  order: integer
```

### DR-4: Projects Data

**Schema:**
```yaml
# projects.yaml
- title: string
  description: string
  url: string
  author: string (optional)
  order: integer
```

### DR-5: Latest Changes

**Format:**
- Markdown file: `latest-changes.md`
- Structure: Date-based sections
- Example:
```markdown
## 2024-01-15
- Added new module on Django
- Updated FastAPI lessons with examples

## 2024-01-10
- Fixed typos in HTML lessons
- Added video links
```

---

## 5. Constraints

### Technical Constraints:

1. **Framework:** Must use Nuxt 3
2. **Styling:** Must use Tailwind CSS
3. **Hosting:** Must work on GitHub Pages (static only)
4. **Language:** Default to Russian, no language switcher
5. **Pre-rendering:** All pages statically generated

### Content Constraints:

1. **Source:** Content from YAML exports only
2. **Format:** YAML for structured data, Markdown for long text
3. **Encoding:** UTF-8 for Cyrillic support
4. **Updates:** Via git push only

### Design Constraints:

1. **Style:** Light colors, modern, not overcomplicated
2. **No Images:** No image meta tags for Open Graph
3. **Responsive:** Must work on mobile, tablet, desktop

---

## 6. Acceptance Criteria Summary

The project is complete when:

1. ✅ All 9 required pages implemented and functional
2. ✅ Course data loads from `course-data/` folder
3. ✅ Accordion components work with expand/collapse all
4. ✅ Open Graph meta tags on every page
5. ✅ Tailwind CSS styling implemented
6. ✅ Responsive design works on all devices
7. ✅ Russian translations complete
8. ✅ Sitemap and robots.txt generated
9. ✅ GitHub Actions deployment workflow working
10. ✅ Site accessible via custom domain
11. ✅ Lighthouse scores > 90 in all categories
12. ✅ All FAQ topics included
13. ✅ Statistics page calculates correctly
14. ✅ Content updates via git push work seamlessly

---

## 7. Future Enhancements (Out of Current Scope)

These are explicitly NOT required for initial release:

1. Search functionality
2. Dark mode
3. Language switcher
4. User authentication
5. Progress tracking
6. Comments system
7. Video embedding
8. Analytics integration
9. Newsletter signup
10. Payment integration

---

This requirements document serves as the contract for project completion. All requirements marked MUST HAVE are mandatory for launch. SHOULD HAVE requirements are highly recommended but can be deferred if needed.
