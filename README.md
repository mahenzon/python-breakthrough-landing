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
git clone https://github.com/yourusername/python-breakthrough-landing.git
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
- `latest-changes.md` - Latest updates

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
npm run dev          # Start dev server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
npm run typecheck    # TypeScript type checking
```

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
