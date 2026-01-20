# Obsidian Integration Guide

This guide will help you set up your Obsidian vault to seamlessly integrate with your Astro website.

## 1. Obsidian Vault Structure

Create your Obsidian vault in the `src/content` directory of your Astro project. Your vault structure should look like this:

```
src/content/
├── note/              # Technical Notes (already exists)
│   └── en/
│       ├── dsp/       # Digital Signal Processing
│       │   ├── _index.md           # Category landing page
│       │   ├── topic1.md
│       │   └── topic2.md
│       ├── wireless/  # Wireless Communications
│       │   ├── _index.md
│       │   ├── fading-models/
│       │   │   ├── rayleigh.md
│       │   │   └── rician.md
│       │   └── foundations/
│       │       └── basics.md
│       └── software/  # Software Engineering
│           ├── _index.md
│           └── algorithms.md
└── jotting/           # Creative Writing (already exists)
    └── en/
        ├── essay1.md
        └── story1.md
```

## 2. Create Obsidian Vault

1. Open Obsidian
2. Click "Open folder as vault"
3. Navigate to `src/content` in your project
4. Select the folder and open it

**Important**: Add `.obsidian` folder to your `.gitignore` file:
```
.obsidian/
```

## 3. Configure Obsidian Settings

### Files & Links Settings:
1. Go to Settings → Files and links
2. Set "Default location for new attachments" to "In subfolder under current folder"
3. Create a folder named `assets` or `images` in each category
4. Set "Subfolder name" to `./assets`
5. **IMPORTANT**: Disable "Use [[Wikilinks]]" - Set to OFF
   - Wikilinks like `[[Page Name]]` won't work on the website
   - Use standard markdown links instead: `[Page Name](./page-name.md)`
6. Set "New link format" to "Relative path to file"

### Important: Wikilinks vs Markdown Links

Obsidian supports wikilinks like `[[Page Name]]` and `![[image.png]]`, but these won't work on your Astro website. You must use standard markdown:

**For internal links:**
- ❌ Obsidian wikilink: `[[Fading Models]]`
- ✅ Standard markdown: `[Fading Models](./fading-models.md)`

**For images:**
- ❌ Obsidian format: `![[image.png]]`
- ✅ Standard markdown: `![Alt text](./assets/image.png)`

**For external links:**
- Both work the same: `[Google](https://google.com)`

### Images:
- Store images in an `assets` or `images` folder within each category
- Use relative paths in markdown: `![alt text](./assets/image.png)`
- Astro will automatically optimize these images during build

## 4. Frontmatter Templates

### Technical Notes (note collection):

```yaml
---
title: "Your Note Title"
timestamp: 2026-01-13 10:00:00+00:00
category: dsp                    # Category: dsp, wireless, software, etc.
subcategory: filters            # Optional: for organizing within category
tags: [signal-processing, fft]
description: Brief description of the note
toc: true                       # Enable table of contents for long posts
draft: false                    # Set to true to hide from public
top: 0                          # Higher number = appears first in category
---
```

### Category Index Page (_index.md):

```yaml
---
title: "Digital Signal Processing"
timestamp: 2026-01-13 10:00:00+00:00
category: dsp
description: "Comprehensive notes on DSP theory and applications"
is_category_index: true         # Marks this as a category landing page
subcategories:
  - name: "Foundations"
    slug: "foundations"
  - name: "Filters"
    slug: "filters"
  - name: "Transforms"
    slug: "transforms"
draft: false
toc: false
---

## Overview

Introduction to the DSP section...

## Topics Covered

- Foundations
- Filters
- Transforms
```

### Creative Writing (jotting collection):

```yaml
---
title: "Your Writing Title"
timestamp: 2026-01-13 10:00:00+00:00
tags: [fiction, essay, poetry]
description: Brief description
sensitive: false
draft: false
top: 0
---
```

## 5. Obsidian Plugins (Recommended)

### Essential Plugins:
1. **Templater** - For automatic frontmatter insertion
2. **Update Time on Edit** - Auto-update timestamps
3. **Frontmatter Tag Wrangler** - Manage tags easily

### Templates:

Create a `templates` folder in your vault and add these:

**Technical Note Template:**
```markdown
---
title: "{{title}}"
timestamp: {{date:YYYY-MM-DD HH:mm:ss}}+00:00
category: 
subcategory: 
tags: []
description: 
toc: true
draft: true
top: 0
---

## Introduction

## Main Content

## References
```

**Writing Template:**
```markdown
---
title: "{{title}}"
timestamp: {{date:YYYY-MM-DD HH:mm:ss}}+00:00
tags: []
description: 
draft: true
---

Content here...
```

## 6. Workflow

### For Technical Notes:
1. Create a new note in the appropriate category folder (e.g., `note/en/wireless/`)
2. Use the Technical Note template
3. Fill in the frontmatter:
   - Set `category` to match folder name
   - Set `subcategory` if organizing into sub-topics
   - Add relevant `tags`
   - Set `draft: false` when ready to publish
4. Write your content with LaTeX math (`$inline$` or `$$block$$`) and code blocks
5. Add images to `./assets/` and reference with relative paths
6. Save and commit to git

### For Creative Writing:
1. Create a new note in `jotting/en/`
2. Use the Writing template
3. Fill in frontmatter
4. Set `draft: false` when ready to publish
5. Save and commit to git

## 7. LaTeX Math Support

The website already supports LaTeX math via KaTeX:

**Inline math:**
```markdown
The equation $E = mc^2$ is famous.
```

**Block math:**
```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## 8. Code Blocks

Use standard markdown code blocks with language specification:

````markdown
```python
def hello():
    print("Hello, world!")
```
````

## 9. Publishing Workflow

1. Write in Obsidian
2. Set `draft: false` in frontmatter
3. Save the file
4. Commit to git: `git add .` and `git commit -m "Add new note"`
5. Push to deploy: `git push`

## 10. Tips

- **Preview in browser**: Run `npm run dev` to preview your site locally
- **Private notes**: Start filename with `_` (e.g., `_private.md`) or keep `draft: true`
- **Organization**: Use folders for categories and subcategories
- **Links**: Use standard markdown links, not Obsidian wikilinks
- **Images**: Keep images in same folder or subfolder for portability

## Common Issues

### Images not showing:
- Ensure images are in the content folder structure
- Use relative paths: `./assets/image.png` not `/assets/image.png`
- Check that Sharp is installed: `npm install sharp`

### Math not rendering:
- Ensure you're using `$` for inline and `$$` for block math
- Check for special characters that need escaping

### Timestamps:
- Use ISO 8601 format with timezone: `2026-01-13 10:00:00+00:00`
- Or use the format: `2026-01-13T10:00:00.000Z`
