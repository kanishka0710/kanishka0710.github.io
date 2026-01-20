# Obsidian Templates

This folder contains templates for creating different types of content in your Obsidian vault.

## How to Use These Templates in Obsidian

### 1. Copy Templates to Your Vault

1. In Obsidian, create a folder called `templates` in your vault root (or anywhere you prefer)
2. Copy the `.md` files from this folder into your Obsidian `templates` folder

### 2. Enable Templates Plugin

1. Open Obsidian Settings (gear icon or `Ctrl/Cmd + ,`)
2. Go to **Core plugins**
3. Enable **Templates**
4. Go to **Templates** settings under "Plugin Options"
5. Set "Template folder location" to `templates` (or wherever you put them)
6. Optionally set a hotkey for "Insert template"

### 3. Install Templater Plugin (Recommended)

For better template functionality with dynamic dates:

1. Go to Settings → Community plugins
2. Browse community plugins and search for "Templater"
3. Install and enable Templater
4. Go to Templater settings
5. Set "Template folder location" to `templates`
6. Enable "Trigger Templater on new file creation" if desired

## Available Templates

### `technical-note-template.md`
Use this for technical notes in categories like DSP, Wireless, Software, etc.

**When to use:**
- Writing technical documentation
- Creating notes on algorithms, theories, or implementations
- Any note that goes in the Technical Notes section

**Fields to fill:**
- `title`: The title of your note
- `category`: The main category (dsp, wireless, software, etc.)
- `subcategory`: The subcategory/topic area
- `tags`: Array of relevant tags
- `description`: Brief summary (shows up in listings)
- `toc`: Set to `true` if you want a table of contents
- `draft`: Set to `false` when ready to publish

### `writing-template.md`
Use this for creative writing, essays, blog posts, etc.

**When to use:**
- Writing creative content
- Personal essays
- Blog posts
- Any content that goes in the Writing section

**Fields to fill:**
- `title`: The title of your writing
- `tags`: Array of relevant tags
- `description`: Brief summary
- `draft`: Set to `false` when ready to publish

### `category-index-template.md`
Use this to create a new category landing page.

**When to use:**
- Creating a new main category (e.g., Machine Learning, Math, etc.)
- The file should be named `_index.md` in the category folder

**Fields to fill:**
- `title`: Display name of the category
- `category`: URL-friendly slug (matches folder name)
- `subcategories`: List of subcategories with names, slugs, and descriptions
- `description`: What this category is about

## Using Templates

### Method 1: With Core Templates Plugin
1. Create a new note
2. Press `Ctrl/Cmd + P` to open command palette
3. Type "Templates: Insert template"
4. Select the template you want

### Method 2: With Templater Plugin
1. Create a new note
2. Press `Ctrl/Cmd + P` to open command palette
3. Type "Templater: Insert template"
4. Select the template you want
5. Templater will automatically fill in `{{date}}` and `{{title}}` placeholders

### Method 3: Keyboard Shortcut
1. Set a hotkey in Settings → Hotkeys
2. Search for "Insert template"
3. Assign a key combination
4. Use the hotkey whenever you create a new note

## Tips

- Keep `draft: true` while working on notes
- Set `draft: false` only when ready to publish
- Use consistent category and subcategory slugs (lowercase, hyphens)
- Fill in descriptions - they help with SEO and navigation
- Use `top: 1` or higher for important notes you want featured
- Enable `toc: true` for longer technical notes with many sections
