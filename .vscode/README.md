# VS Code Configuration

This folder contains VS Code configuration for the Python Breakthrough Landing project.

## Files

### settings.json
Project-specific settings optimized for:
- **Vue 3 & Nuxt 3** development with Volar
- **TypeScript** with proper path resolution
- **ESLint** integration with auto-fix on save
- **Tailwind CSS** IntelliSense
- **File associations** and exclusions

### extensions.json
Recommended extensions for this project:
- **Vue - Official (Volar)** - Vue 3 language support
- **Nuxt MDC** - Nuxt-specific features
- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - Tailwind autocompletion
- **Path Intellisense** - Path autocompletion
- **YAML** - YAML language support
- **GitLens** - Enhanced Git features
- **Error Lens** - Inline error messages
- **Pretty TypeScript Errors** - Better TS error formatting

### launch.json
Debug configurations for:
- Starting Nuxt dev server
- Generating static site
- Running ESLint fixes

### tasks.json
Quick tasks for:
- `dev` - Start development server
- `build` - Build for production
- `generate` - Generate static site
- `lint` - Run ESLint
- `lint:fix` - Auto-fix ESLint issues

## Usage

### First Time Setup

1. Open the project in VS Code
2. Install recommended extensions when prompted
3. Reload VS Code after installing extensions

### Running Tasks

- Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
- Type "Tasks: Run Task"
- Select the task you want to run

Or use keyboard shortcuts:
- `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows/Linux) - Run build task

### Debugging

1. Go to Run and Debug panel (Cmd+Shift+D)
2. Select configuration from dropdown
3. Press F5 to start

## Key Features

### Auto-formatting
- Code auto-formats on save using ESLint
- Consistent 2-space indentation
- No semicolons (ASI)
- Trailing commas enforced

### Path Resolution
- Aliases `~` and `@` resolve to `website/` folder
- Auto-import suggestions work correctly
- Path IntelliSense for file paths

### Tailwind IntelliSense
- Class name suggestions
- CSS preview on hover
- Color preview

### TypeScript
- Uses workspace TypeScript version
- Auto-import suggestions
- Path mapping for Nuxt aliases

## Troubleshooting

### Extensions not working?
- Reload VS Code window
- Check if extensions are enabled
- Restart TypeScript server: `Cmd+Shift+P` > "TypeScript: Restart TS Server"

### ESLint not fixing on save?
- Check ESLint output panel for errors
- Make sure `dbaeumer.vscode-eslint` extension is installed
- Verify `eslint.config.mjs` exists in `website/` folder

### Tailwind IntelliSense not working?
- Make sure `bradlc.vscode-tailwindcss` extension is installed
- Check that `tailwind.config.js` exists in `website/` folder
- Reload VS Code window

### Path intellisense not working?
- Verify `website/tsconfig.json` has proper path mappings
- Check `.nuxt/tsconfig.json` for generated paths
- Restart TypeScript server

## Customization

Feel free to modify these settings for your personal preferences:
- Change `editor.tabSize` if you prefer different indentation
- Adjust `editor.autoSave` behavior
- Add/remove recommended extensions

## Syncing Across Machines

These settings are committed to git, so they'll be available on any machine where you clone the repository.

To override settings locally without committing:
1. Use User settings instead of Workspace settings
2. Add to `.git/info/exclude` if needed
