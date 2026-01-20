#!/usr/bin/env tsx

import { watch } from "node:fs";
import { exec } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * File watcher that automatically updates timestamps when markdown files are modified
 * Usage: tsx scripts/watch-timestamps.ts
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "content");

console.log("👀 Watching for file changes in:", contentDir);
console.log("📝 Timestamps will be auto-updated when you save files");
console.log("Press Ctrl+C to stop\n");

// Track last update time to prevent duplicate updates
const lastUpdate = new Map<string, number>();
const DEBOUNCE_MS = 1000; // Wait 1 second before updating

watch(contentDir, { recursive: true }, (eventType, filename) => {
	if (!filename || !filename.endsWith(".md")) return;
	
	const now = Date.now();
	const last = lastUpdate.get(filename) || 0;
	
	// Debounce: ignore if updated recently
	if (now - last < DEBOUNCE_MS) return;
	
	lastUpdate.set(filename, now);
	
	const filePath = join(contentDir, filename);
	
	// Run the update-timestamp script
	exec(`tsx "${join(__dirname, "update-timestamp.ts")}" "${filePath}"`, (error, stdout, stderr) => {
		if (error) {
			// Only show errors if they're not about missing timestamp fields
			if (!stderr.includes("No timestamp field found")) {
				console.error(`❌ Error updating ${filename}:`, stderr);
			}
			return;
		}
		if (stdout) {
			console.log(stdout.trim());
		}
	});
});
