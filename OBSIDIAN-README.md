# 📝 Obsidian Integration for Your Astro Website

Welcome! Your website now has seamless Obsidian integration for content management. This README provides an overview and quick navigation to all documentation.

## 🎯 What This Integration Provides

### For Technical Notes
- **Category-based organization**: DSP, Wireless, Software (and easily add more)
- **Hierarchical navigation**: Categories → Subcategories → Notes
- **Table of contents**: Automatic TOC generation for long notes
- **Rich content support**: LaTeX math, code blocks, images
- **Filtering**: By category, series, and tags

### For Creative Writing
- **Sequential listing**: Chronological display of your writing
- **Simple structure**: No complex organization needed
- **Rich formatting**: Full markdown support

### For Both
- **Write in Obsidian**: Use the best markdown editor
- **Automatic timestamps**: Track when content was created
- **Draft mode**: Work privately before publishing
- **Priority pinning**: Feature important content
- **Mobile-friendly**: Responsive design

## 📚 Documentation Guide

### Start Here
1. **[QUICK-START.md](QUICK-START.md)** - Get up and running in minutes
   - 3-step setup process
   - Create your first note
   - Publish workflow

### Detailed Guides
2. **[OBSIDIAN-SETUP-GUIDE.md](OBSIDIAN-SETUP-GUIDE.md)** - Complete setup instructions
   - Obsidian configuration
   - Folder structure
   - Frontmatter templates
   - Workflow details
   - Troubleshooting

3. **[OBSIDIAN-INTEGRATION-SUMMARY.md](OBSIDIAN-INTEGRATION-SUMMARY.md)** - What's been implemented
   - New features
   - File structure
   - Schema changes
   - Migration notes

### Practical Tools
4. **[OBSIDIAN-CHECKLIST.md](OBSIDIAN-CHECKLIST.md)** - Track your progress
   - Setup checklist
   - Content creation tasks
   - Publishing workflow
   - Verification steps

5. **[obsidian-templates/README.md](obsidian-templates/README.md)** - Using templates
   - Template installation
   - Available templates
   - Usage instructions

## 🚀 Quick Start (TL;DR)

```bash
# 1. Open Obsidian and create vault in src/content
# 2. Configure Obsidian settings (disable wikilinks!)
# 3. Create your first note

# For technical notes:
# File: src/content/note/en/wireless/my-note.md
# ---
# title: "My Note"
# timestamp: 2026-01-13T10:00:00.000Z
# category: wireless
# subcategory: foundations
# tags: [wireless]
# description: ""
# toc: true
# draft: false
# ---

# For writing:
# File: src/content/jotting/en/my-writing.md
# ---
# title: "My Writing"
# timestamp: 2026-01-13T10:00:00.000Z
# tags: [essay]
# description: ""
# draft: false
# ---

# 4. Preview and publish
npm run dev          # Preview at localhost:4321
npm run build        # Build for production
git add .
git commit -m "Add content"
git push
```

## 📂 Content Structure

```
src/content/
├── note/en/                    # Technical Notes
│   ├── dsp/                   # Category: Digital Signal Processing
│   │   ├── _index.md          # Category landing page
│   │   ├── assets/            # Images
│   │   └── *.md               # Notes
│   ├── wireless/              # Category: Wireless Communications
│   │   ├── _index.md
│   │   ├── visuals/
│   │   ├── fading_capacity.md
│   │   └── noma.md
│   └── software/              # Category: Software Engineering
│       ├── _index.md
│       └── *.md
├── jotting/en/                # Creative Writing
│   └── *.md
└── information/en/            # Static pages
    └── *.md
```

## 🎨 Website Pages

After building, these pages will be available:

| Page | URL | Description |
|------|-----|-------------|
| Technical Notes | `/note` | All notes with category cards |
| Browse Categories | `/note/categories` | Category overview |
| Category Page | `/note/category/wireless` | Notes in specific category |
| Individual Note | `/note/en/wireless/fading_capacity` | Single note view |
| Writing | `/jotting` | All creative writing |
| Individual Writing | `/jotting/en/my-post` | Single writing piece |

## ⚡ Key Features

### LaTeX Math
```markdown
Inline: $E = mc^2$

Block:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

### Code Blocks
````markdown
```python
def hello(name):
    print(f"Hello, {name}!")
```
````

### Images
```markdown
![Description](./assets/image.png)
```
*Images are automatically optimized by Astro*

### Internal Links
```markdown
[Other Note](./other-note.md)
```
*Use standard markdown, not Obsidian wikilinks*

## 🔧 Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run check            # Check for TypeScript errors
npm run timestamp        # Update timestamps
npm run watch:timestamps # Watch and auto-update timestamps
```

## 📦 What's Been Added

### New Files
- Documentation: 5 markdown guides
- Templates: 3 Obsidian templates + README
- Category indices: DSP, Wireless, Software
- Page routes: Categories page, Category detail pages

### Updated Files
- `src/content/config.ts` - Added category fields
- `src/pages/[...locale]/note/index.astro` - Added category browsing
- `src/components/note/Note.svelte` - Added category filtering
- `.gitignore` - Added `.obsidian/` folder

### Dependencies
No new dependencies! Uses existing Astro + KaTeX + Shiki setup.

## ⚠️ Important Notes

### Wikilinks Don't Work
Obsidian's wikilinks (`[[Page]]`, `![[image.png]]`) won't render on the website.
- ✅ Use: `[Page](./page.md)` and `![Alt](./image.png)`
- ❌ Avoid: `[[Page]]` and `![[image.png]]`

### Relative Paths
Always use relative paths for images and links:
- ✅ `./assets/image.png`
- ❌ `/assets/image.png`

### Folder Names = Categories
Category in frontmatter must match folder name:
- Folder: `note/en/wireless/`
- Frontmatter: `category: wireless`

### Timestamps
Use ISO 8601 format: `2026-01-13T10:00:00.000Z`

## 🎯 Recommended Workflow

### Daily Writing
1. Open Obsidian
2. Use templates to create new notes
3. Write with `draft: true`
4. Preview locally when ready
5. Set `draft: false` and push

### Weekly Review
1. Review all drafts
2. Update descriptions and tags
3. Check image paths and links
4. Test build locally
5. Publish batch of content

### Monthly Organization
1. Review category structure
2. Update category index pages
3. Add new categories if needed
4. Reorganize subcategories
5. Update documentation

## 🐛 Troubleshooting

### Build errors?
```bash
npm run check        # Check TypeScript
npm run build        # Test build
```

### Images not showing?
- Check relative paths start with `./`
- Verify image is in content folder
- Check filename case matches exactly

### Math not rendering?
- Use `$` for inline, `$$` for block
- Check for unescaped special chars
- View browser console for errors

### Links not working?
- Use markdown format, not wikilinks
- Check file exists at relative path
- Verify `.md` extension included

## 📖 External Resources

- [Obsidian Documentation](https://help.obsidian.md/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [KaTeX Math](https://katex.org/docs/supported.html)
- [Markdown Guide](https://www.markdownguide.org/)
- [Original Integration Guide](https://www.hungrimind.com/articles/obsidian-with-astro)

## ✅ Getting Help

If you encounter issues:

1. **Check the guides**: Read the documentation in order
2. **Verify setup**: Use the checklist
3. **Test locally**: Run `npm run dev` to preview
4. **Check logs**: Look at console output for errors
5. **Rebuild**: Try `npm run build` to catch issues

## 🎉 You're Ready!

Everything is set up and ready to go. Start by reading [QUICK-START.md](QUICK-START.md) and create your first note!

**Next Steps:**
1. ✍️ Open Obsidian and create a new vault in `src/content`
2. 📝 Write your first note using the templates
3. 👀 Preview with `npm run dev`
4. 🚀 Publish with `git push`

Happy writing! 📝

---

**Last Updated**: 2026-01-13
**Integration Version**: 1.0
