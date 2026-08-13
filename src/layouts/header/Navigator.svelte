<nav class="float-nav" aria-label="Page sections">
	{#each items as item}
		<a
			href={`${homeUrl}#${item.id}`}
			class:active={section === item.id}
			aria-current={section === item.id ? "location" : undefined}
			onclick={() => activate(item.id)}
		>
			<span class="bar"></span>
			<span class="label">{item.label}</span>
		</a>
	{/each}
</nav>

<script lang="ts">
	import { getRelativeLocaleUrl } from "astro:i18n";
	import { onMount } from "svelte";
	import i18nit from "$i18n";

	let { locale }: { locale: string } = $props();

	const t = i18nit(locale);
	const homeUrl = getRelativeLocaleUrl(locale);
	const items = [
		{ id: "about", label: t("navigation.about") },
		{ id: "work", label: t("navigation.work") },
		{ id: "projects", label: t("navigation.project") }
	] as const;

	let section = $state("about");
	let pinnedUntil = 0;

	function activate(id: string) {
		section = id;
		pinnedUntil = Date.now() + 1000;
	}

	function spy() {
		if (Date.now() < pinnedUntil) return;

		const hash = window.location.hash.replace(/^#/, "");
		const anchor = window.innerHeight * 0.28;
		let current = "";

		for (const item of items) {
			const el = document.getElementById(item.id);
			if (el && el.getBoundingClientRect().top <= anchor) current = item.id;
		}

		if (!current) {
			if (hash && items.some(item => item.id === hash)) current = hash;
			else if (document.getElementById("about")) current = "about";
		}

		if (current) section = current;
	}

	onMount(() => {
		const hash = window.location.hash.replace(/^#/, "");
		if (items.some(item => item.id === hash)) section = hash;

		spy();
		window.addEventListener("scroll", spy, { passive: true });
		window.addEventListener("resize", spy);
		window.addEventListener("hashchange", spy);

		const update = () => requestAnimationFrame(spy);
		document.addEventListener("astro:page-load", update);
		if (window.swup) window.swup.hooks.on("page:load", update);
		else document.addEventListener("swup:enable", () => window.swup?.hooks.on("page:load", update));

		return () => {
			window.removeEventListener("scroll", spy);
			window.removeEventListener("resize", spy);
			window.removeEventListener("hashchange", spy);
			document.removeEventListener("astro:page-load", update);
		};
	});
</script>

<style lang="less">
	.float-nav {
		position: sticky;
		top: 1.35rem;
		align-self: flex-start;
		flex-shrink: 0;
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		margin-top: 1.15rem;
	}

	a {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		gap: 0.4rem;
		color: var(--secondary-color);
		transition: color 0.15s ease;

		&:hover {
			color: var(--primary-color);
		}

		&.active {
			color: var(--accent-color);

			.bar {
				background: var(--accent-color);
			}
		}
	}

	.bar {
		width: 2px;
		background: transparent;
		transition: background-color 0.15s ease;
	}

	.label {
		writing-mode: vertical-rl;
		text-orientation: mixed;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		font-size: 0.78rem;
		font-weight: 600;
	}

	@media screen and (max-width: 640px) {
		.float-nav {
			top: 1rem;
			gap: 1.15rem;
			margin-top: 0.85rem;
		}

		.label {
			font-size: 0.7rem;
			letter-spacing: 0.14em;
		}
	}
</style>
