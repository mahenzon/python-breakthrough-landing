# Git Hooks Configuration

This project uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) to run automated checks before commits.

## Pre-commit Hook

The pre-commit hook automatically runs the following:

1. **ESLint with auto-fix** - Lints and fixes JavaScript/TypeScript/Vue files that are staged for commit
2. **Stats generation** - Runs `npm run stats` to update course statistics

## Configuration

### Modifying lint-staged behavior

Edit the `lint-staged` section in `website/package.json`:

```json
"lint-staged": {
  "*.{js,ts,vue}": [
    "eslint --fix"
  ]
}
```

You can add more file patterns and commands as needed.

### Modifying the pre-commit hook

Edit `.husky/pre-commit` to add or remove commands.

### Skipping hooks temporarily

To skip pre-commit hooks for a specific commit (not recommended):

```bash
git commit --no-verify -m "your message"
```

### Disabling hooks completely

Set the `HUSKY` environment variable to 0:

```bash
HUSKY=0 git commit -m "your message"
```

Or globally:

```bash
export HUSKY=0
```

## Installation for new contributors

When someone clones the repository, hooks are automatically installed via the `prepare` script in `package.json`.

If needed, you can manually install hooks by running:

```bash
cd website
npm install
```

## Best Practices

- The hook runs `eslint --fix` automatically, so fixable issues will be corrected
- If there are lint errors that can't be auto-fixed, the commit will be blocked
- The stats file is regenerated on each commit to ensure it's always up-to-date
- Commit only the files you intend to change - lint-staged only processes staged files
