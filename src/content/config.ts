import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/**
 * Note collection configuration
 * Represents main blog articles with comprehensive metadata
 */
const note = defineCollection({
	// Load all markdown files except those starting with underscore (but allow _index.md)
	loader: glob({ pattern: "**/*.md", base: "./src/content/note" }),
	schema: z.object({
		title: z.string(),								// Post title (required)
		timestamp: z.date(),							// Publication date (required)
		series: z.string().optional(),					// Series name for grouped posts
		category: z.string().optional(),				// Category (e.g., dsp, wireless, software)
		subcategory: z.string().optional(),				// Subcategory for organizing within category
		is_category_index: z.boolean().default(false),	// Marks this as a category index page
		subcategories: z.array(z.object({				// Subcategories list for category index pages
			name: z.string(),
			slug: z.string(),
			description: z.string().optional()
		})).optional(),
		tags: z.array(z.string()).optional(),			// Array of topic tags
		description: z.string().optional(),				// Post description/excerpt
		sensitive: z.boolean().default(false),			// Marks content as sensitive
		toc: z.boolean().default(false),				// Whether to show table of contents
		top: z.number().int().nonnegative().default(0),	// Top priority for sorting (higher is more important)
		draft: z.boolean().default(false)				// Draft status (excludes from public listing)
	})
});

/**
 * Jotting collection configuration
 * Represents shorter posts, quick thoughts, or micro-blog entries
 */
const jotting = defineCollection({
	// Load all markdown files except those starting with underscore
	loader: glob({ pattern: ["**/*.md", "!**/_*.md", "!**/_*/*.md"], base: "./src/content/jotting" }),
	schema: z.object({
		title: z.string(),								// Jotting title (required)
		timestamp: z.date(),							// Publication date (required)
		tags: z.array(z.string()).optional(),			// Array of topic tags
		description: z.string().optional(),				// Brief description
		sensitive: z.boolean().default(false),			// Marks content as sensitive
		top: z.number().int().nonnegative().default(0),	// Top priority for sorting (higher is more important)
		draft: z.boolean().default(false)				// Draft status
	})
});

/**
 * Preface collection configuration
 * Represents introductory content, site announcements, or special pages
 */
const preface = defineCollection({
	// Load all markdown files
	loader: glob({ pattern: "**/*.md", base: "./src/content/preface" }),
	schema: z.object({
		timestamp: z.date()		// Creation timestamp
	})
});

export const collections = { note, jotting, preface };
