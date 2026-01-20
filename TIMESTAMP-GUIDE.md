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

## Integration with Obsidian

If you're using Obsidian, you have a few options:

### Option 1: Obsidian Shell Commands Plugin

1. Install the [Shell Commands](https://github.com/Taitava/obsidian-shell-commands) plugin
2. Add a new shell command:
   ```bash
   npm run timestamp "{{file_path:absolute}}"
   ```
3. Set it to run on file save or bind it to a hotkey

### Option 2: Run Watch Script Alongside Obsidian

1. Open a terminal in your project directory
2. Run: `npm run watch:timestamps`
3. Keep it running while you work in Obsidian
4. Timestamps will update automatically when you save files

### Option 3: Templater Plugin (For New Files)

Use Obsidian's Templater plugin to insert timestamps when creating new files:

```markdown
---
title: <% tp.file.title %>
timestamp: <% tp.date.now("YYYY-MM-DD HH:mm:ssZZ") %>
---
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
