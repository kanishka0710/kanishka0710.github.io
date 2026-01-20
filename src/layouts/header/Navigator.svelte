<style lang="less">
	header {
		a {
			position: relative;
			display: inline-block;
			padding: 5px 10px;
			text-align: center;
			color: var(--primary-color);
			border-bottom: 2px solid transparent;
			transition: border-color 0.15s ease;

			&.location {
				border-color: var(--secondary-color);
			}

			&:hover {
				border-color: var(--primary-color);
			}
		}
	}

	footer {
		a:not(footer > a) {
			display: flex;
			align-items: center;
			gap: 0.25rem;

			padding: 0.5rem 0.75rem;

			font-size: 0.875rem;
			font-weight: bold;
			white-space: nowrap;

			transition:
				color 0.15s ease-in-out,
				background-color 0.15s ease-in-out;

			&:hover {
				color: var(--background-color);
				background-color: var(--primary-color);
			}
		}
	}

	@media screen and (max-width: 640px) {
		nav {
			header {
				a {
					display: block;
					white-space: nowrap;

					&.location {
						font-weight: bold;
					}
				}
			}

			footer {
				a:not(footer > a) {
					padding: 0.25rem 0rem;
					font-weight: normal;
				}
			}
		}
	}
</style>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div role="button" onclick={() => (menu = false)} class:pointer-events-none={!menu} class:bg-transparent={!menu} class="fixed top-0 left-0 w-screen h-screen pointer-events-auto bg-#aaaaaa88 transition-background-color sm:hidden"></div>

<nav bind:this={navigator} class:transform-translate-x-full={!menu} class="fixed top-0 right-0 flex flex-col justify-between items-start gap-5 p-5 bg-background h-full sm:contents overflow-hidden transition-transform">
	<header class="grid gap-5 c-secondary grid-rows-[repeat(4,1fr)] sm:(grid-rows-none grid-cols-[repeat(3,1fr)])">
		<button onclick={() => (menu = false)} class="sm:hidden">{@render close()}</button>

		<a href={getRelativeLocaleUrl(locale)} class:location={route == getRelativeLocaleUrl(locale)}>
			{t("navigation.about")}
		</a>
		<a href={getRelativeLocaleUrl(locale, "/jotting")} class:location={route.startsWith(getRelativeLocaleUrl(locale, "/jotting"))}>
			{t("navigation.jotting")}
		</a>
		<a href={getRelativeLocaleUrl(locale, "/note")} class:location={route.startsWith(getRelativeLocaleUrl(locale, "/note"))}>
			{t("navigation.note")}
		</a>
	</header>

	<footer class="flex flex-col gap-2 sm:gap-5 sm:(flex-row gap-7)">
		<ThemeSwitcher {sun} {moon} />
	</footer>
</nav>

<button onclick={() => (menu = true)} class="sm:hidden">{@render bars()}</button>

<script lang="ts">
	import { i18n } from "astro:config/client";
	import { getRelativeLocaleUrl } from "astro:i18n";
	import { onMount, type Snippet } from "svelte";
	import i18nit from "$i18n";
	import ThemeSwitcher from "./ThemeSwitcher.svelte";

	let { locale, route, home, note, jotting, about, globe, sun, moon, bars, close }: { locale: string; route: string } & { [key: string]: Snippet } = $props();

	const t = i18nit(locale);

	// Control mobile menu visibility state
	let menu: boolean = $state(false);
	let navigator: HTMLElement | undefined = $state();

	// Extract path without locale prefix for language switching
	let path: string | undefined = $derived(route.slice(`/${locale == i18n?.defaultLocale ? "" : locale}`.length) || undefined);

	onMount(() => {
		// Close mobile menu when any navigation link is clicked
		for (const link of navigator!.getElementsByTagName("a")) {
			link.addEventListener("click", () => (menu = false));
		}

		// Set up route tracking for page navigation with Swup integration
		const update_route = () => (route = window.location.pathname);
		if (window.swup) {
			// Register route update hook if Swup is already available
			window.swup.hooks.on("page:load", update_route);
		} else {
			// Wait for Swup to be enabled and then register the hook
			document.addEventListener("swup:enable", () => window.swup?.hooks.on("page:load", update_route));
		}
	});
</script>
