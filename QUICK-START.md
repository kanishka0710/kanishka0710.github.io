# Quick Start: Obsidian + Astro Integration

## ✅ What's Been Done

Your website now has full Obsidian integration with:
- ✅ Category-based organization for technical notes
- ✅ Sequential listing for creative writing
- ✅ Hierarchical navigation with dropdown menus
- ✅ Full LaTeX math support
- ✅ Code syntax highlighting
- ✅ Image optimization

## 🚀 Get Started in 3 Steps

### Step 1: Set Up Obsidian (5 minutes)

1. **Open Obsidian** and create a new vault:
   - Click "Open folder as vault"
   - Navigate to your project folder
   - Select `src\content`

2. **Configure Settings** in Obsidian:
   - Go to Settings → Files and links
   - Set "Use [[Wikilinks]]" to **OFF** (important!)
   - Set "New link format" to "Relative path to file"
   - Set "Default location for new attachments" to "In subfolder under current folder"
   - Set "Subfolder name" to `./assets`

3. **Install Templates** (optional but recommended):
   - Create a `templates` folder in your vault
   - Copy files from `obsidian-templates/` into it
   - Go to Settings → Core plugins → Enable "Templates"
   - Set template folder location to `templates`

### Step 2: Create Your First Note (2 minutes)

**For Technical Notes:**
1. Create a file in `note/en/wireless/` (or any category)
2. Add frontmatter:
```yaml
---
title: "My First Note"
timestamp: 2026-01-13T10:00:00.000Z
category: wireless
subcategory: foundations
tags: [wireless, tutorial]
description: My first technical note
toc: true
draft: false
---
```
3. Write your content using markdown, LaTeX math, and code blocks

**For Creative Writing:**
1. Create folder: `jotting/en/` (if it doesn't exist)
2. Create a file: `my-first-post.md`
3. Add frontmatter:
```yaml
---
title: "My First Post"
timestamp: 2026-01-13T10:00:00.000Z
tags: [essay]
description: My first creative writing piece
draft: false
---
```
4. Write your content

### Step 3: Preview and Publish (1 minute)

1. **Preview locally:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:4321

2. **Publish when ready:**
   ```bash
   git add .
   git commit -m "Add new content"
   git push
   ```

## 📂 Your Content Structure

```
src/content/
├── note/en/                    # Technical Notes
│   ├── dsp/                   # Digital Signal Processing
│   │   ├── _index.md          # Category landing page
│   │   ├── assets/            # Images for DSP notes
│   │   └── *.md               # Your DSP notes
│   ├── wireless/              # Wireless Communications
│   │   ├── _index.md
│   │   ├── visuals/          # Images
│   │   ├── fading_capacity.md # Example note
│   │   └── noma.md           # Example note
│   └── software/              # Software Engineering
│       ├── _index.md
│       └── *.md
└── jotting/en/                # Creative Writing
    └── *.md                   # Your writing pieces
```

## 🎯 Key Pages on Your Website

After building, these pages will be available:

- `/note` - All technical notes with category cards
- `/note/categories` - Browse categories
- `/note/category/wireless` - All wireless notes with TOC
- `/note/category/dsp` - All DSP notes
- `/note/category/software` - All software notes
- `/jotting` - All creative writing pieces

## ⚡ Pro Tips

### Writing Math
Use LaTeX syntax:
- Inline: `$E = mc^2$`
- Block:
  ```
  $$
  \int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
  $$
  ```

### Adding Images
1. Put images in same folder or `assets/` subfolder
2. Use relative paths: `![Description](./assets/image.png)`
3. Astro will optimize them automatically

### Code Blocks
Use standard markdown with language:
````markdown
```python
def greet(name):
    return f"Hello, {name}!"
```
````

### Internal Links
Use standard markdown links (not wikilinks):
- ✅ `[Other Note](./other-note.md)`
- ❌ `[[Other Note]]` (won't work on website)

### Draft Mode
Keep `draft: true` while working, then set `draft: false` to publish.

### Priority Pinning
Set `top: 1` (or higher) to pin important notes to the top.

## 🎨 Adding New Categories

To add a new category (e.g., "Machine Learning"):

1. Create folder: `src/content/note/en/machine-learning/`
2. Create `_index.md`:
```yaml
---
title: "Machine Learning"
timestamp: 2026-01-13T10:00:00.000Z
category: machine-learning
is_category_index: true
description: "Notes on ML algorithms and techniques"
subcategories:
  - name: "Supervised Learning"
    slug: "supervised"
  - name: "Deep Learning"
    slug: "deep-learning"
draft: false
---

## Overview
Introduction to machine learning...
```
3. Start adding notes to that folder

## 🔧 Troubleshooting

### Build errors?
```bash
npm run check        # Check for type errors
npm run build        # Test production build
```

### Images not showing?
- Use relative paths starting with `./`
- Check filename matches exactly (case-sensitive)
- Ensure images are inside content folders

### Math not rendering?
- Use `$` for inline, `$$` for block
- Check for unescaped special characters

## 📚 Documentation

- **Full Setup Guide**: See `OBSIDIAN-SETUP-GUIDE.md`
- **Integration Summary**: See `OBSIDIAN-INTEGRATION-SUMMARY.md`
- **Template Usage**: See `obsidian-templates/README.md`
- **Original Guide**: https://www.hungrimind.com/articles/obsidian-with-astro

## 🎉 You're All Set!

Your Obsidian vault is now connected to your website. Start writing in Obsidian, and your content will appear beautifully formatted on your site!

**Next Steps:**
1. ✍️ Write your first note in Obsidian
2. 👀 Preview with `npm run dev`
3. 🚀 Publish with `git push`

Happy writing! 📝
