Produce a clear, actionable plan to build a pre-rendered static multi‑page landing site for an online course about web development in Python.
Follow these exact requirements and constraints; be concrete about technologies, folder structure, file formats, rendering pipeline, build/hosting steps, and quick update workflows.

Project goal and content source

- The site will be published to GitHub Pages using my existing custom domain.
- Content source: export files from my notes source. You can read 'course-data' folder content to get familiar with format. also there's 'example-data/models.py' file with models that are used for content export. the idea is: modules -> topics -> lessons. module is top level folder, it contains files. each file is topic. it contains topic description and lessons data. also module contains index file that contains module description. this description is multiline and is in markdown format.
- When new lessons / topics / modules are added or existing get updated, I will run the export script, so all the files in the 'course-data' folder will be updated. after that I'll push new data to github, and there should be some build process to create static site to be deployed to github pages.


Functional requirements (must be implemented)

1. Multi‑page, pre-rendered pages (each page separately linkable):
   - Home / Landing page (main page, index). should contain info about me, info about course (both should be configurable in some main yaml config file), and also accordeon with modules data, which contain topics, which contain lessons.
   - Modules index (or combined index with accordion)
   - Module page (per module)
   - Topic page (per topic) or lesson page (per lesson) — propose the best granularity and why
   - "Latest changes" page or section that I can append to from my notes. single page with latest changes, I need some way to add there content, this data should be stored in static files in repo too.
   - "Statistics" page with: lessons count, videos count, total duration, number of students
   - separate page with list of projects made by students. list of projects with titles, descriptions and a link to project page
   - "Links" section (social links, platform links, link to my personal landing page, etc)
   - FAQ section. Please add these subjects to questions and answers: 
        - tell students that the course is asynchronous, they can learn in their own pace
        - info text explaining modules can be completed in any order if they prefer some subject
   - "Collaboration" section about contracting with organizations (legal entity) with private/group consultations
2. The modules/topics list should be shown as accordions with “collapse all” and “expand all” controls.
3. Open Graph meta tags on every page (title, description, no image, url) so social previews work.
4. Tailwind CSS must be used for styling. Light colors and lightweight interface, something modern, but not overcomplicated.
5. Site must be rendered to static files, so it's compatible with GitHub Pages hosting.
6. Use translations for the interface. Don't add any language selection button. For now default to Russian locale, provide translation file(s) for Russian interface. I will update all the translations later

Technology stack recommendation:

I'm familiar with Nuxt 3, so please use it.
Use Tailwind CSS for styles.


Constraints and assumptions

- The site must be published on GitHub Pages.
- pre-rendering content so it can be served as static from github pages.
- SEO optimisation: sitemap, etc.
- Use Tailwind CSS.
- No dynamic SSR; use static generation only.
- Avoid client-side routing for SEO; pre-render all.
