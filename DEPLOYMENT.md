# Deployment Guide
## Python Breakthrough Course Landing Site

This document provides comprehensive instructions for deploying the site to GitHub Pages.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Building the Site](#building-the-site)
4. [GitHub Pages Setup](#github-pages-setup)
5. [Automated Deployment with GitHub Actions](#automated-deployment-with-github-actions)
6. [Custom Domain Configuration](#custom-domain-configuration)
7. [Content Updates](#content-updates)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js** (v20 or higher)
- **npm** (comes with Node.js)
- **Git**

### Verify Installation

```bash
node --version  # Should be v20.x or higher
npm --version   # Should be 10.x or higher
git --version   # Any recent version
```

---

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/python-breakthrough-landing.git
cd python-breakthrough-landing/website
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Nuxt 3
- Tailwind CSS
- i18n module
- Sitemap module
- YAML parser
- Markdown renderer

### 3. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview

# TypeScript type checking
npm run typecheck

# Lint code
npm run lint
```

---

## Building the Site

### Generate Static Files

The site must be pre-rendered as static HTML for GitHub Pages:

```bash
cd website
npm run generate
```

This command:
1. Parses all course data from `../course-data/`
2. Loads content from `content/` folder
3. Pre-renders all pages to static HTML
4. Generates sitemap.xml
5. Outputs everything to `.output/public/`

### Build Output

After successful generation:
```
website/.output/public/
├── index.html          # Home page
├── modules/
│   └── index.html      # Modules listing
├── statistics.html
├── projects.html
├── faq.html
├── latest-changes.html
├── collaboration.html
├── _nuxt/              # JS, CSS assets
├── sitemap.xml
└── robots.txt
```

### Test Locally

```bash
npm run preview
```

Visit `http://localhost:3000` to test the static site.

---

## GitHub Pages Setup

### Method 1: Manual Deployment (Quick Test)

1. Build the site:
```bash
cd website
npm run generate
```

2. Create `gh-pages` branch:
```bash
git checkout --orphan gh-pages
```

3. Copy generated files:
```bash
cp -r .output/public/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

4. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`
   - Click Save

5. Visit: `https://yourusername.github.io/python-breakthrough-landing`

### Method 2: Automated Deployment (Recommended)

Use GitHub Actions for automatic deployment on every push to `main`.

---

## Automated Deployment with GitHub Actions

### 1. Create Workflow File

Create `.github/workflows/deploy.yml`:

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

### 2. Enable GitHub Actions Deployment

1. Go to repository **Settings → Pages**
2. **Source**: GitHub Actions
3. Click **Save**

### 3. Trigger Deployment

Simply push to `main` branch:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions will automatically:
1. Install dependencies
2. Generate static site
3. Deploy to GitHub Pages

### 4. Monitor Deployment

- Go to **Actions** tab in your repository
- Click on the latest workflow run
- Watch progress in real-time
- Deployment typically takes 2-3 minutes

---

## Custom Domain Configuration

### 1. Configure DNS

Add DNS records at your domain provider:

**For apex domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153
```

Add three more A records with:
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**For subdomain (www.example.com):**
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### 2. Update Nuxt Configuration

Edit `website/nuxt.config.ts`:

```typescript
site: {
  url: 'https://yourdomain.com',
},
```

### 3. Add CNAME File

Create `website/public/CNAME`:
```
yourdomain.com
```

### 4. Configure on GitHub

1. Go to **Settings → Pages**
2. **Custom domain**: Enter your domain
3. Click **Save**
4. Wait for DNS check (may take a few minutes)
5. Enable **Enforce HTTPS** (after DNS propagates)

### 5. Rebuild and Deploy

```bash
cd website
git add nuxt.config.ts public/CNAME
git commit -m "Configure custom domain"
git push origin main
```

### Verification

```bash
dig yourdomain.com +short
# Should show GitHub Pages IPs

curl -I https://yourdomain.com
# Should return 200 OK
```

---

## Content Updates

### Update Course Data

1. Export new course data to `course-data/` folder:
```bash
python export_course.py  # Your export script
```

2. Review changes:
```bash
git status
git diff course-data/
```

3. Commit and push:
```bash
git add course-data/
git commit -m "Update course content: add new lessons"
git push origin main
```

4. GitHub Actions automatically rebuilds and deploys

### Update Site Configuration

Edit `website/content/site-config.yaml`:

```bash
vim website/content/site-config.yaml
# Update author info, student count, etc.

git add website/content/site-config.yaml
git commit -m "Update student count"
git push
```

### Add Latest Changes

Edit `website/content/latest-changes.md`:

```bash
vim website/content/latest-changes.md
# Add entry at the top

git add website/content/latest-changes.md
git commit -m "Add latest changes entry"
git push
```

### Add Student Project

Edit `website/content/projects.yaml`:

```bash
vim website/content/projects.yaml
# Add new project entry

git add website/content/projects.yaml
git commit -m "Add student project: My Awesome App"
git push
```

### Update FAQ

Edit `website/content/faq.yaml`:

```bash
vim website/content/faq.yaml
# Add or modify questions

git add website/content/faq.yaml
git commit -m "Update FAQ"
git push
```

---

## Troubleshooting

### Build Fails on GitHub Actions

**Check Node.js version:**
```yaml
# In .github/workflows/deploy.yml
node-version: '20'  # Must match local version
```

**Check dependencies:**
```bash
cd website
npm ci  # Clean install
npm run generate  # Test locally
```

**View logs:**
- Go to Actions tab
- Click failed workflow
- Expand steps to see errors

### Site Not Updating

1. **Clear browser cache:**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

2. **Check deployment status:**
   - Actions tab → Latest workflow
   - Should show green checkmark

3. **Verify files deployed:**
```bash
curl -I https://yourusername.github.io/python-breakthrough-landing/
# Should return 200 OK
```

### Custom Domain Issues

1. **DNS not propagating:**
```bash
dig yourdomain.com
# Should show GitHub Pages IPs
```
Wait up to 24-48 hours for full propagation.

2. **SSL Certificate pending:**
- Can take 10-20 minutes after DNS setup
- Check Settings → Pages for status

3. **Mixed content warnings:**
- Ensure all links use HTTPS
- Update nuxt.config.ts `site.url` to use https://

### YAML Parsing Errors

**Symptom:** Build fails with YAML syntax error

**Solution:**
1. Validate YAML syntax:
```bash
npm install -g js-yaml
js-yaml course-data/*/index.yaml
```

2. Check for:
   - Consistent indentation (2 spaces)
   - Proper string quoting
   - Valid UTF-8 encoding

### Missing Course Data

**Symptom:** Empty modules or no data displayed

**Solution:**
1. Verify folder structure:
```
course-data/
└── NN-module-name/
    ├── index.yaml
    └── NN-topic-name.yaml
```

2. Check file names match pattern:
   - Folders: `11-module-name`
   - Files: `01-topic-name.yaml`

3. Validate YAML structure matches types in `website/types/course.ts`

### Port Already in Use

**Symptom:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Build Time Issues

**Symptom:** Build takes too long or times out

**Solutions:**
1. Reduce concurrent operations:
```typescript
// In nuxt.config.ts
vite: {
  build: {
    chunkSizeWarningLimit: 1000
  }
}
```

2. Enable caching in GitHub Actions:
```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

---

## Performance Optimization

### 1. Optimize Images

If adding images:
```bash
npm install -D @nuxt/image
```

```typescript
// nuxt.config.ts
modules: ['@nuxt/image']
```

### 2. Enable Compression

GitHub Pages automatically serves gzipped content.

### 3. Monitor Performance

Use Lighthouse:
```bash
npm install -g lighthouse
lighthouse https://yourdomain.com
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 95

---

## Security Best Practices

1. **Never commit secrets:**
   - No API keys
   - No passwords
   - No personal tokens

2. **Review `.gitignore`:**
```bash
cat .gitignore
# Should include node_modules, .env, etc.
```

3. **Use HTTPS only:**
   - Enable "Enforce HTTPS" in GitHub Pages settings

4. **Keep dependencies updated:**
```bash
cd website
npm outdated
npm update
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- Check for dependency updates
- Review GitHub Actions logs
- Test site functionality

**Monthly:**
- Update dependencies:
```bash
cd website
npm update
npm audit fix
```

- Check Lighthouse scores
- Review and update content

**As Needed:**
- Update Node.js version
- Update Nuxt version
- Refactor based on new features

### Backup

**Important files to backup:**
- All content in `content/` folder
- Course data in `course-data/`
- Site configuration
- Custom code and components

**Recommendation:** Git itself is your backup. Regularly push to GitHub.

---

## Support and Resources

### Documentation

- [Nuxt 3 Docs](https://nuxt.com)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Tailwind CSS Docs](https://tailwindcss.com)

### Community

- [Nuxt Discord](https://discord.com/invite/nuxt)
- [GitHub Discussions](https://github.com/yourusername/python-breakthrough-landing/discussions)

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm run generate         # Build static site
npm run preview          # Preview build

# Deployment
git add .
git commit -m "message"
git push origin main     # Triggers auto-deploy

# Maintenance
npm install              # Install dependencies
npm update               # Update dependencies
npm audit fix            # Fix security issues
```

### Important Files

```
.github/workflows/deploy.yml  # Deployment workflow
website/nuxt.config.ts        # Nuxt configuration
website/content/              # Editable content
course-data/                  # Course structure
```

### URLs

- **Development:** http://localhost:3000
- **Production:** https://yourusername.github.io/python-breakthrough-landing
- **Custom Domain:** https://yourdomain.com

---

## Changelog

### v1.0.0 - Initial Setup
- Nuxt 3 project initialized
- Tailwind CSS configured
- Basic pages created
- GitHub Actions workflow added
- Documentation completed

---

**Last Updated:** 2024-10-05  
**Maintained by:** [Your Name]
