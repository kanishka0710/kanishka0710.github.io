#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from "node:fs";
import { DateTime } from "luxon";

/**
 * Updates the timestamp in the frontmatter of a markdown file
 * Usage: tsx scripts/update-timestamp.ts <path-to-file>
 */

const filePath = process.argv[2];

if (!filePath) {
	console.error("❌ Error: Please provide a file path");
	console.log("Usage: tsx scripts/update-timestamp.ts <path-to-file>");
	process.exit(1);
}

try {
	// Read the file
	const content = readFileSync(filePath, "utf-8");
	
	// Check if file has frontmatter
	if (!content.startsWith("---")) {
		console.error("❌ Error: File does not have frontmatter");
		process.exit(1);
	}
	
	// Generate new timestamp
	const newTimestamp = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ssZZ");
	
	// Replace the timestamp in frontmatter
	// Matches: timestamp: YYYY-MM-DD HH:MM:SS+XX:XX
	const updatedContent = content.replace(
		/^(timestamp:\s*)(.+)$/m,
		`$1${newTimestamp}`
	);
	
	// Check if timestamp was found and updated
	if (updatedContent === content) {
		console.warn("⚠️  Warning: No timestamp field found in frontmatter");
		process.exit(1);
	}
	
	// Write the updated content back to the file
	writeFileSync(filePath, updatedContent, "utf-8");
	
	console.log(`✅ Timestamp updated successfully in ${filePath}`);
	console.log(`   New timestamp: ${newTimestamp}`);
} catch (error) {
	console.error("❌ Error:", (error as Error).message);
	process.exit(1);
}
