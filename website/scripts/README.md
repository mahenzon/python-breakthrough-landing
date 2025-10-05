# Scripts

## generate-stats.ts

Generates comprehensive course statistics from the course data YAML files.

### What it does:

1. **Parses all course data** from `../course-data/` folder
2. **Calculates statistics**:
   - Total modules
   - Total topics
   - Total lessons
   - Total tasks
   - Total video duration (in minutes and formatted)
   - Number of students
3. **Generates detailed breakdown** for each module and topic
4. **Saves to `public/stats.json`** for quick access without parsing YAML files every time

### Usage:

```bash
# Generate stats manually
npm run stats

# Stats are automatically generated before build/generate
npm run build     # Runs stats first
npm run generate  # Runs stats first
```

### Output:

The script creates `public/stats.json` with the following structure:

```json
{
  "totalLessons": 263,
  "totalVideos": 263,
  "totalDurationMinutes": 2530,
  "totalDurationFormatted": "42 ч 10 мин",
  "numberOfStudents": 100,
  "totalTasks": 335,
  "modulesCount": 8,
  "topicsCount": 42,
  "modules": [
    {
      "id": "01-введение",
      "name": "Введение",
      "order": 1,
      "topicsCount": 1,
      "lessonsCount": 2,
      "totalDuration": 0,
      "totalTasks": 0,
      "topics": [...]
    },
    ...
  ],
  "generatedAt": "2024-10-05T22:00:00.000Z"
}
```

### Console Output:

The script prints a summary to the console:

```
📊 Course Statistics Summary:

✅ Total Modules: 8
✅ Total Topics: 42
✅ Total Lessons: 263
✅ Total Tasks: 335
✅ Total Duration: 42 ч 10 мин (2530 minutes)
✅ Number of Students: 100

💾 Stats saved to: /path/to/public/stats.json

📋 Module Breakdown:

  1. Введение
     Topics: 1 | Lessons: 2 | Duration: 0ч 0мин
  ...
```

### Why use this?

- **Performance**: Parsing YAML files during SSR can be slow. Pre-generated stats are fast to load.
- **Validation**: Ensures course data is valid and can be parsed correctly.
- **Overview**: Provides a quick overview of course content without manually counting.
- **API**: The `stats.json` file can be used as a simple API endpoint for external tools.

### When to run:

- **Automatically**: Before every build and generate (configured in package.json)
- **Manually**: When you update course data and want to see new stats
- **Development**: Anytime you want to validate course structure
