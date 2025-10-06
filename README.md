# Python Breakthrough Landing Site

A static landing site for the Python Breakthrough web development course, built with Nuxt 3 and deployed to GitHub Pages.

## Project Structure

```
python-breakthrough-landing/
├── course-data/          # Course content (modules, topics, lessons)
├── example-data/         # Example data models
├── project-plan/         # Planning documents
│   ├── design.md         # Technical design
│   ├── requirements.md   # Functional requirements
│   └── tasks.md          # Implementation tasks
├── website/              # Nuxt 3 application
├── DEPLOYMENT.md         # Deployment guide
└── README.md             # This file
```

## Quick Start

### Prerequisites

- Node.js v20 or higher
- npm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/mahenzon/python-breakthrough-landing.git
cd python-breakthrough-landing

# Install dependencies
cd website
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
cd website
npm run generate
```

Static files will be in `.output/public/`

### Test Static Build Locally

After generating the static site, test it locally to ensure everything works correctly:

**Option 1: Using Nuxt Preview (Recommended)**
```bash
cd website
npm run preview
```
Visit `http://localhost:3000` - This uses Nuxt's built-in preview server.

**Option 2: Using npx serve**
```bash
cd website
npx serve .output/public
```
Visit `http://localhost:3000` - Serves static files exactly as they'll appear on GitHub Pages.

**Option 3: Using Python's HTTP Server**
```bash
cd website/.output/public
python3 -m http.server 8000
```
Visit `http://localhost:8000`

#### What to Verify

After starting the local server, check:

- ✅ **All pages load**: Home, Modules, Statistics, Projects, FAQ, Latest Changes, Collaboration
- ✅ **Navigation works**: Click all menu links and module/topic links
- ✅ **Sitemap accessible**: Visit `/sitemap.xml` - should show all pages
- ✅ **Robots.txt accessible**: Visit `/robots.txt` - should reference sitemap
- ✅ **Images load**: Check course image, author photo
- ✅ **No console errors**: Open browser DevTools (F12) and check console
- ✅ **Responsive design**: Test on different screen sizes (DevTools device toolbar)
- ✅ **Meta tags present**: View page source, check `<head>` section for meta tags
- ✅ **Structured data**: Search for `application/ld+json` in homepage source

**Common Issues:**
- If styles are broken, regenerate with `npm run generate`
- If links use absolute URLs incorrectly, check `site.url` in `nuxt.config.ts`
- If pages 404, ensure all routes are properly pre-rendered

## Features

- ✅ **Static Site Generation** - Pre-rendered HTML for optimal performance
- ✅ **Responsive Design** - Mobile-first with Tailwind CSS
- ✅ **SEO Optimized** - Meta tags, sitemap, semantic HTML
- ✅ **Multi-page** - Home, Modules, Statistics, Projects, FAQ, etc.
- ✅ **i18n Ready** - Russian interface with TypeScript translations
- ✅ **Content-driven** - YAML-based course content
- ✅ **GitHub Pages** - Automated deployment via GitHub Actions

## Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[project-plan/design.md](./project-plan/design.md)** - Technical architecture
- **[project-plan/requirements.md](./project-plan/requirements.md)** - Functional requirements
- **[project-plan/tasks.md](./project-plan/tasks.md)** - Implementation breakdown

## Tech Stack

- **Framework:** Nuxt 3
- **Styling:** Tailwind CSS
- **i18n:** @nuxtjs/i18n
- **SEO:** @nuxtjs/sitemap
- **Content:** YAML + Markdown
- **Hosting:** GitHub Pages

## Content Management

### Update Course Data

1. Export course data to `course-data/` folder
2. Commit and push changes
3. Site automatically rebuilds via GitHub Actions

### Edit Site Content

All content files are in `website/content/`:
- `site-config.yaml` - Author info, course details
- `faq.yaml` - FAQ questions and answers
- `projects.yaml` - Student projects
- `latest-changes.md` - Latest updates (changelog)

### Update Changelog

The changelog page (`/changelog`) displays content from `website/content/latest-changes.md`.

**Important:** After editing the markdown file, you must regenerate the data files:

```bash
cd website

# Option 1: Regenerate all data files (recommended)
npm run stats

# Option 2: Full rebuild (includes data generation)
npm run generate

# Option 3: Just for development
npm run dev
# Then visit http://localhost:3000/changelog
```

**How it works:**
1. Edit `website/content/latest-changes.md` - Add your changelog entries in Markdown
2. Run `npm run stats` - Converts Markdown to HTML and generates `public/data/latest-changes.json`
3. The `/changelog` page reads from the generated JSON file

**For deployment:**
- The GitHub Actions workflow automatically runs `npm run generate` which includes data generation
- All JSON files (including `latest-changes.json`) are regenerated on every deployment
- Just commit and push your markdown changes - the rest happens automatically

## Deployment

### Automated (Recommended)

Push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Update content"
git push origin main
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

## Development Commands

```bash
npm run dev          # Start dev server (auto-regenerates data on restart)
npm run build        # Build for production
npm run generate     # Generate static site (includes data generation)
npm run preview      # Preview production build
npm run typecheck    # TypeScript type checking
npm run stats        # Regenerate data files only (course.json, stats.json, faq.json, projects.json, latest-changes.json)
```

**Note:** `npm run generate` automatically runs `npm run stats` first, so data files are always up-to-date in production builds.

## Project Status

🚧 **In Development** - Core features implemented, refinement ongoing.

### Completed
- ✅ Project setup and configuration
- ✅ TypeScript types and data models
- ✅ Content loading utilities
- ✅ Layout and navigation
- ✅ Core pages (home, modules, statistics, etc.)
- ✅ Deployment documentation

### Todo
- ⏳ Complete server-side data loading
- ⏳ Module and topic detail pages
- ⏳ Advanced components (accordions, etc.)
- ⏳ Final testing and optimization

## Contributing

This is a personal project for the Python Breakthrough course. Contributions are not currently accepted.

## License

All rights reserved.

## Contact

For questions about the course or site, contact via:
- Links provided in the site footer
- Course platform

---

**Built with ❤️ for Python learners**
