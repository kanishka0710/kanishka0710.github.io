<style lang="less">
	article {
		footer {
			button {
				display: flex;
				align-items: center;
				justify-content: center;

				width: 30px;
				height: 30px;

				margin-top: 0.25rem 0rem 0.5rem;
				border-bottom: 2px solid;

				font-style: var(--monospace);
				font-size: 0.875rem;

				transition: color 0.15s ease-in-out;

				&:hover,
				&.location {
					color: var(--primary-color);
				}
			}
		}
	}

</style>

<main class="flex flex-col grow">
	<article class="flex flex-col grow">
		<header class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
			{#each list as jotting (jotting.id)}
				<section animate:flip={{ duration: 150 }} class="flex flex-col justify-between gap-1 b-1 b-solid b-secondary rd-2 py-2 px-3">
					<span class="flex items-center gap-1">
						{#if jotting.data.top > 0}<span>{@render top()}</span>{/if}
						{#if jotting.data.sensitive}<span>{@render sensitive()}</span>{/if}
						<a href={getRelativeLocaleUrl(locale, `/jotting/${jotting.id.split("/").slice(1).join("/")}`)} class="c-primary font-600 link">{jotting.data.title}</a>
					</span>
					<span class="text-xs c-secondary">
						{new Date(jotting.data.timestamp).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
					</span>
				</section>
			{/each}
		</header>

		{#if pages > 1}
			<footer class="sticky bottom-0 flex items-center justify-center gap-3 mt-a pb-1 c-weak bg-background font-mono">
				<button onclick={() => (page = Math.max(1, page - 1))}>{@render left()}</button>
				<button class:location={1 == page} onclick={() => (page = 1)}>{1}</button>

				{#if pages > 7 && page > 4}{@render dots()}{/if}

				{#each Array.from({ length: Math.min(5, pages - 2) }, (_, i) => i + Math.max(2, Math.min(pages - 5, page - 2))) as P (P)}
					<button class:location={P == page} onclick={() => (page = P)} animate:flip={{ duration: 150 }} transition:fade={{ duration: 150 }}>{P}</button>
				{/each}

				{#if pages > 7 && page < pages - 3}{@render dots()}{/if}

				<button class:location={pages == page} onclick={() => (page = pages)}>{pages}</button>
				<button onclick={() => (page = Math.min(pages, page + 1))}>{@render right()}</button>
			</footer>
		{/if}
	</article>
</main>

<script lang="ts">
	import { getRelativeLocaleUrl } from "astro:i18n";
	import { onMount, type Snippet } from "svelte";
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";
	import i18nit from "$i18n";

	let { locale, jottings, top, sensitive, left, right, dots }: { locale: string; jottings: any[]; top: Snippet; sensitive: Snippet; left: Snippet; right: Snippet; dots: Snippet } = $props();

	let initial = $state(false); // Track initial load to prevent unexpected effects
	let filtered: any[] = $derived.by(() => {
		let list: any[] = jottings
			// Sort by timestamp (newest first)
			.sort((a, b) => b.data.top - a.data.top || b.data.timestamp - a.data.timestamp);

		if (!initial) return list;

		// Build URL with current page
		let url = getRelativeLocaleUrl(locale, `/jotting?page=${page}`);

		// Match https://github.com/swup/swup/blob/main/src/helpers/history.ts#L22
		window.history.replaceState({ url, random: Math.random(), source: "swup" }, "", url);

		return list;
	});

	// Calculate pagination
	const size: number = 20;
	let pages: number = $derived(Math.ceil(filtered.length / size));

	// Ensure page is within valid range
	let page: number = $state(1);
	$effect(() => {
		page = Math.max(1, Math.min(Math.floor(page), pages));
	});

	// Apply pagination by slicing the array
	let list: any[] = $derived(filtered.slice((page - 1) * size, page * size));

	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		page = Number(params.get("page")) || 1;

		initial = true;
	});
</script>
