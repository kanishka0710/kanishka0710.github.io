<script lang="ts">
	import { onMount } from "svelte";

	let { text = "", speed = 100, delay = 0 }: { text?: string; speed?: number; delay?: number } = $props();

	let displayText = $state("");
	let currentIndex = $state(0);
	let showCursor = $state(true);

	onMount(() => {
		// Start typing after initial delay
		const startTimeout = setTimeout(() => {
			const typeInterval = setInterval(() => {
				if (currentIndex < text.length) {
					displayText = text.slice(0, currentIndex + 1);
					currentIndex++;
				} else {
					clearInterval(typeInterval);
					// Keep cursor blinking for a bit, then hide it
					setTimeout(() => {
						showCursor = false;
					}, 1000);
				}
			}, speed);

			return () => clearInterval(typeInterval);
		}, delay);

		// Cursor blink effect
		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 500);

		return () => {
			clearTimeout(startTimeout);
			clearInterval(cursorInterval);
		};
	});
</script>

<style>
	.typewriter {
		display: inline;
	}

	.cursor {
		display: inline-block;
		width: 2px;
		height: 1.2em;
		background-color: currentColor;
		margin-left: 2px;
		vertical-align: text-bottom;
		animation: blink 1s step-end infinite;
	}

	.cursor.hidden {
		opacity: 0;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>

<span class="typewriter">
	{displayText}<span class="cursor" class:hidden={!showCursor}></span>
</span>

