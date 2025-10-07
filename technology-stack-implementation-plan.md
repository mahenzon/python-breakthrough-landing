# Technology Stack Implementation Plan

## Overview
Add a "Technology Stack" section to the homepage that highlights what students will learn. Content lives in YAML, is transformed into JSON by the data generator, and is rendered through a dedicated Vue component placed right after the author block and before the statistics section.

## Implementation Steps

### Step 1: Define Technology Stack YAML
**File:** `website/content/technology-stack.yaml`

```yaml
title: "Технологический стек курса"
subtitle: "Практические инструменты, которыми вы овладеете"
categories:
  - title: "Frameworks"
    icon: "⚡"
    items:
      - title: "FastAPI"
        icon: "🚀"
      - title: "Pydantic"
      - title: "SQLAlchemy"
      - title: "Django"
      - title: "DRF"
      - title: "FastStream"
      - title: "Celery"
      - title: "Taskiq"
  - title: "Languages"
    icon: "🗣️"
    items:
      - title: "Python"
      - title: "SQL"
      - title: "JavaScript"
      - title: "HTML"
      - title: "CSS"
      - title: "Jinja"
  - title: "Technologies"
    icon: "🧰"
    items:
      - title: "Docker"
        icon: "🐳"
      - title: "Docker Compose"
      - title: "Podman"
      - title: "Redis"
      - title: "SQLite"
      - title: "Postgres"
      - title: "S3"
  - title: "Instruments"
    icon: "🛠️"
    items:
      - title: "Black"
      - title: "ruff"
      - title: "pre-commit"
      - title: "uv"
      - title: "Poetry"
      - title: "gh-cli"
  - title: "Deploying"
    icon: "🚀"
    items:
      - title: "GitHub Actions"
      - title: "GitLab CI/CD"
  - title: "Testing"
    icon: "🧪"
    items:
      - title: "Unittest"
      - title: "Pytest"
      - title: "Coverage"
      - title: "Codecov"
  - title: "Queues"
    icon: "📨"
    items:
      - title: "RabbitMQ"
      - title: "NATS"
```

Keep item icons optional so some entries can render text-only.

### Step 2: Extend TypeScript Types
**File:** `website/types/content.ts`

```typescript
export interface TechnologyStackItem {
  title: string;
  icon?: string;
}

export interface TechnologyStackCategory {
  title: string;
  icon: string;
  items: TechnologyStackItem[];
}

export interface TechnologyStackData {
  title: string;
  subtitle?: string;
  categories: TechnologyStackCategory[];
}
```

### Step 3: Update Data Generation Script
**File:** `website/scripts/generate-data.ts`

Keep the existing import, load the YAML as `TechnologyStackData`, and write it to `public/data/technology-stack.json`:

```typescript
const technologyStackPath = join(process.cwd(), 'content', 'technology-stack.yaml')
const technologyStackData = loadYamlFile<TechnologyStackData>(technologyStackPath)
writeFileSync(join(publicDir, 'technology-stack.json'), JSON.stringify(technologyStackData, null, 2))
console.log('✅ technology-stack.json generated')
```

### Step 4: Create Composable
**File:** `website/composables/useTechnologyStackData.ts`

Expose a `getTechnologyStackData` helper that fetches `/data/technology-stack.json`, returns typed data, and falls back to an empty structure on failure:

```typescript
export const useTechnologyStackData = () => {
  const getTechnologyStackData = async (): Promise<TechnologyStackData> => {
    try {
      const response = await fetch('/data/technology-stack.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Failed to load technology stack data:', error)
      return { title: '', categories: [] }
    }
  }

  return {
    getTechnologyStackData,
  }
}
```

### Step 5: Build Section Component
**File:** `website/components/sections/TechnologyStackSection.vue`

- Accept the loaded `TechnologyStackData` via props.
- Render section heading and optional subtitle.
- Display categories in a responsive grid.
- For each item show its text and, when provided, the icon within a badge or prefix.

Skeleton:

```vue
<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <header class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">{{ data.title }}</h2>
          <p v-if="data.subtitle" class="text-gray-600">{{ data.subtitle }}</p>
        </header>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="category in data.categories"
            :key="category.title"
            class="bg-gray-50 rounded-xl p-6 h-full"
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">{{ category.icon }}</span>
              <h3 class="text-xl font-semibold text-primary-600">{{ category.title }}</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="item in category.items"
                :key="item.title"
                class="flex items-center gap-3 text-gray-700"
              >
                <span v-if="item.icon" class="text-lg">{{ item.icon }}</span>
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TechnologyStackData } from '~/types/content'

defineProps<{ data: TechnologyStackData }>()
</script>
```

### Step 6: Integrate Into Homepage
**File:** `website/pages/index.vue`

- Import the composable and the new section component.
- Fetch the data during page setup: `const technologyStackData = await getTechnologyStackData()`.
- Insert `<SectionsTechnologyStack :data="technologyStackData" />` immediately after the author section and before the statistics block.
- Guard rendering with `v-if="technologyStackData.categories.length"` to avoid an empty section.

### Step 7: Update i18n Strings
**File:** `website/i18n/locales/ru.ts`

Add translations for the new section heading and subtitle, for example:

```typescript
home: {
  // ...existing keys
  technologyStackTitle: 'Технологический стек',
  technologyStackSubtitle: 'Что вы изучите на курсе',
},
```

Use these strings inside the section component if you prefer localised titles.

### Step 8: Verify Implementation
- Re-run the data generation script (`pnpm generate:data` or the project equivalent) to refresh `technology-stack.json`.
- Execute the usual linting/tests to ensure no regressions.
- Perform a quick UI check to confirm the section renders correctly and respects optional icons.

## Visual Design
- Neutral white background to align with neighbour sections.
- Responsive three-column grid on large screens, stacking on smaller devices.
- Category cards with subtle shadow and rounded corners for separation.
- Icons displayed inline with text for quick scanning while keeping typography readable.

## Benefits
- Content managed via YAML for quick updates.
- Type-safe data flow from generation script to Vue components.
- Section placement aligns with the intended storytelling, surfacing the learning stack before statistics.
- Optional icons keep the design flexible for future additions.
