<section id="work" class="experience">
	<h2>{t("home.experience")}</h2>

	<ol>
		{#each experience as item}
			<li>
				<time>{item.dates}</time>
				<div class="copy">
					<p class="who">
						{#if item.href}
							<a href={item.href} target="_blank" rel="noopener noreferrer">{item.org}</a>
						{:else}
							<span>{item.org}</span>
						{/if}
						<span class="sep">·</span>
						<span class="role">{item.role}{#if item.detail}, {item.detail}{/if}</span>
					</p>
					<p class="blurb">{item.blurb}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<script lang="ts">
	import i18nit from "$i18n";
	import { experience } from "../data/experience";

	let { locale }: { locale: string } = $props();

	const t = i18nit(locale);
</script>

<style lang="less">
	.experience {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 0.25rem;
		scroll-margin-top: 4.5rem;
	}

	h2 {
		color: var(--accent-color);
		font-size: 1.15rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	ol {
		display: flex;
		flex-direction: column;
		list-style: none;
	}

	li {
		display: grid;
		gap: 0.2rem 1.25rem;
		padding: 0.85rem 0;
		border-top: 1px dashed color-mix(in srgb, var(--remark-color) 45%, transparent);
		user-select: text;

		&:last-child {
			padding-bottom: 0;
		}
	}

	time {
		font-family: var(--monospace);
		font-size: 0.78rem;
		letter-spacing: 0.01em;
		color: var(--secondary-color);
		white-space: nowrap;
		line-height: 1.5;
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	.who {
		font-size: 0.98rem;
		line-height: 1.45;
		color: var(--primary-color);
	}

	.who a {
		color: var(--accent-color);
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 0.16em;
		transition: text-decoration-color 0.15s ease;

		&:hover {
			text-decoration-color: currentColor;
		}
	}

	.sep {
		margin: 0 0.35rem;
		color: var(--weak-color);
	}

	.role {
		color: var(--secondary-color);
	}

	.blurb {
		color: var(--remark-color);
		font-size: 0.92rem;
		line-height: 1.5;
	}

	@media (min-width: 640px) {
		li {
			grid-template-columns: 11.25rem minmax(0, 1fr);
			align-items: start;
		}

		time {
			padding-top: 0.12rem;
		}
	}
</style>
