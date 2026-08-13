# Timestamp Auto-Update Guide

This guide explains how to automatically update timestamps in your markdown files.

## Quick Start

### Option 1: Manual Update (Single File)

Update the timestamp of a specific file:

```bash
npm run timestamp src/content/note/en/wireless-communications/noma.md
```

### Option 2: Auto-Watch (All Files)

Automatically update timestamps whenever you save any markdown file in the `src/content` directory:

```bash
npm run watch:timestamps
```

This will run in the background and update timestamps as you edit. Keep it running in a separate terminal while you work.

## How It Works

Both scripts look for the `timestamp` field in your markdown frontmatter:

```yaml
---
title: My Article
timestamp: 2025-07-07 00:00:00+00:00
tags: [example]
---
```

When you save or run the update command, the timestamp automatically updates to the current time:

```yaml
timestamp: 2026-01-13 15:30:45+00:00
```

## Notes

- The timestamp format follows ISO 8601 with timezone offset (e.g., `2026-01-13 15:30:45+00:00`)
- Only files with a `timestamp:` field in their frontmatter will be updated
- The watch script debounces updates by 1 second to prevent multiple rapid updates

## Troubleshooting

**"No timestamp field found"**: Your markdown file's frontmatter doesn't have a `timestamp:` field. Add one manually:

```yaml
---
title: Your Title
timestamp: 2026-01-13 00:00:00+00:00
---
```

**Script doesn't run**: Make sure you've installed dependencies with `npm install`
