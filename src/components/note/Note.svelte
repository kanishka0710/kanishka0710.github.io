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

	aside {
		section {
			display: flex;
			flex-direction: column;
			gap: 5px;

			p {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				gap: 5px;

				button {
					border-bottom: 1px solid var(--primary-color);
					padding: 0rem 0.2rem;

					font-size: 0.9rem;
					transition:
						color 0.1s ease-in-out,
						background-color 0.1s ease-in-out;

					&.selected {
						color: var(--background-color);
						background-color: var(--primary-color);
					}

					@media (min-width: 640px) {
						&:hover {
							color: var(--background-color);
							background-color: var(--primary-color);
						}
					}
				}
			}
		}
	}
</style>

<main class="flex flex-col-reverse sm:flex-row gap-10 grow">
	<article class="flex flex-col gap-2 grow">
		{#each list as note (note.id)}
			<a 
				href={getRelativeLocaleUrl(locale, `/note/${note.id.split("/").slice(1).join("/")}`)}
				animate:flip={{ duration: 150 }}
				class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 p-3 rounded hover:shadow-lg transition-all text-sm"
				style="border: 2px solid #666; background-color: rgba(249, 250, 251, 0.5);"
			>
				<div class="flex-1 flex flex-col gap-1">
					<div class="flex items-center gap-1.5 flex-wrap">
						{#if note.data.top > 0}<span>{@render top()}</span>{/if}
						{#if note.data.sensitive}<span>{@render sensitive()}</span>{/if}
						{#if note.data.category}<button onclick={(e) => { e.preventDefault(); choose_category(note.data.category, true); }} class="text-xs text-secondary hover:text-primary">[{note.data.category}]</button>{/if}
						{#if note.data.series}<button onclick={(e) => { e.preventDefault(); choose_series(note.data.series, true); }} class="text-xs text-secondary hover:text-primary">{note.data.series}</button>{/if}
						<span class="font-medium text-primary">{note.data.title}</span>
					</div>
					{#if note.data.tags && note.data.tags.length > 0}
						<div class="flex items-center gap-1 flex-wrap">
							{#each note.data.tags as tag}
								<button onclick={(e) => { e.preventDefault(); switch_tag(tag, true); }} class="text-xs text-secondary hover:text-primary">#{tag}</button>
							{/each}
						</div>
					{/if}
				</div>
				<span class="text-xs text-secondary whitespace-nowrap">
					{new Date(note.data.timestamp).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
				</span>
			</a>
		{/each}

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

	<aside class="sm:flex-basis-200px flex flex-col gap-5">
		{#if series_list && series_list.length > 0}
			<section>
				<h3>{t("note.series")}</h3>
				<p>
					{#each series_list as series_item (series_item)}
						<button class:selected={series_item == series} onclick={() => choose_series(series_item)}>{series_item}</button>
					{/each}
				</p>
			</section>
		{/if}

		{#if category_list && category_list.length > 0}
			<section>
				<h3>Category</h3>
				<p>
					{#each category_list as category_item (category_item)}
						<button class:selected={category_item == category} onclick={() => choose_category(category_item)}>{category_item}</button>
					{/each}
				</p>
			</section>
		{/if}

		<section>
			<h3>{t("note.tag")}</h3>
			<p>
				{#each tag_list as tag (tag)}
					<button class:selected={tags.includes(tag)} onclick={() => switch_tag(tag)}>{tag}</button>
				{/each}
			</p>
		</section>
	</aside>
</main>

<script lang="ts">
	import { getRelativeLocaleUrl } from "astro:i18n";
	import { onMount, type Snippet } from "svelte";
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";
	import Time from "$utils/time";
	import i18nit from "$i18n";

	let { locale, notes, series: series_list, categories: category_list, tags: tag_list, top, sensitive, left, right, dots }: { locale: string; notes: any[]; series?: string[]; categories?: string[]; tags: string[]; top: Snippet; sensitive: Snippet; left: Snippet; right: Snippet; dots: Snippet } = $props();

	const t = i18nit(locale);

	let initial = $state(false); // Track initial load to prevent unexpected effects
	let series: string | null = $state(null);
	let category: string | null = $state(null);
	let tags: string[] = $state([]);
	let filtered: any[] = $derived.by(() => {
		let list: any[] = notes
			// Apply series, category, and tag filtering
			.filter(note => {
				// Check if note matches the specified series
				let match_series = !series || note.data.series == series;

				// Check if note matches the specified category
				let match_category = !category || note.data.category == category;

				// Check if note contains all specified tags
				let match_tags = tags.every(tag => note.data.tags?.includes(tag));

				return match_series && match_category && match_tags;
			})
			// Sort by timestamp (newest first)
			.sort((a, b) => b.data.top - a.data.top || b.data.timestamp - a.data.timestamp);

		if (!initial) return list;

		// Build URL with current page, series, category, and tag filters
		let url = getRelativeLocaleUrl(locale, `/note?page=${page}${series ? `&series=${series}` : ""}${category ? `&category=${category}` : ""}${tags.map(tag => `&tag=${tag}`).join("")}`);

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

	/**
	 * Toggle tag inclusion/exclusion in the filter list
	 * @param tag Tag to toggle
	 * @param turn whether to include or exclude the tag
	 */
	function switch_tag(tag: string, turn?: boolean) {
		let included = tags.includes(tag);
		if (turn === undefined) turn = !included;

		// Add tag if turning on and not included, or remove if turning off
		tags = turn ? (included ? tags : [...tags, tag]) : tags.filter(item => item !== tag);
	}

	/**
	 * Select or deselect a series filter (only one series can be active at a time)
	 * @param series_choice the series to select or deselect
	 * @param turn whether to include or exclude the series
	 */
	function choose_series(series_choice: string, turn?: boolean) {
		if (turn === undefined) turn = series !== series_choice;
		// Set series if turning on, or clear if turning off
		series = turn ? series_choice : null;
	}

	/**
	 * Select or deselect a category filter (only one category can be active at a time)
	 * @param category_choice the category to select or deselect
	 * @param turn whether to include or exclude the category
	 */
	function choose_category(category_choice: string, turn?: boolean) {
		if (turn === undefined) turn = category !== category_choice;
		// Set category if turning on, or clear if turning off
		category = turn ? category_choice : null;
	}

	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		page = Number(params.get("page")) || 1;
		series = params.get("series");
		category = params.get("category");
		tags = params.getAll("tag");

		initial = true;
	});
</script>
