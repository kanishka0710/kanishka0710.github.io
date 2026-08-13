<style lang="less">
	.projects {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		scroll-margin-top: 4.5rem;
	}

	h2 {
		color: var(--accent-color);
		font-size: 1.15rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.subtitle {
		color: var(--secondary-color);
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.projects-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;

		@media (min-width: 640px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.25rem;
		text-align: left;
		border: 1px solid color-mix(in srgb, var(--foam-color) 28%, transparent);
		border-radius: 1.1rem 1.1rem 1.4rem 0.55rem;
		background: color-mix(in srgb, var(--block-color) 42%, transparent);
		color: inherit;
		cursor: pointer;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition:
			background-color 0.15s ease,
			color 0.15s ease,
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;

		&:hover,
		&:focus-visible {
			background: var(--primary-color);
			color: var(--background-color);
			transform: translateY(-2px);
			border-color: var(--foam-color);
			box-shadow: 0 12px 32px color-mix(in srgb, var(--tide-color) 28%, transparent);
			outline: none;

			.tools,
			.blurb {
				color: inherit;
				opacity: 0.9;
			}
		}
	}

	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		color: var(--secondary-color);
		font-size: 0.8rem;
	}

	.tool {
		padding: 0.15rem 0.5rem;
		border: 1px solid currentColor;
		border-radius: 0.25rem;
		opacity: 0.85;
	}

	.blurb {
		color: var(--remark-color);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.project-dialog {
		position: fixed;
		inset: 0;
		margin: auto;
		width: min(70vw, 920px);
		max-width: calc(100vw - 1.5rem);
		height: fit-content;
		max-height: min(75vh, 900px);
		padding: 0;
		border: 2px solid var(--primary-color);
		border-radius: 0.75rem;
		background: var(--background-color);
		color: var(--primary-color);
		box-shadow: 0 24px 60px #00000055;
		overflow: hidden;

		&::backdrop {
			background: #00000066;
			backdrop-filter: blur(2px);
		}

		@media (max-width: 640px) {
			width: calc(100vw - 1rem);
			max-height: 85vh;
		}
	}

	.dialog-body {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-height: inherit;
		padding: 1.25rem 1.5rem 1.5rem;
		overflow-y: auto;
	}

	.dialog-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		position: sticky;
		top: 0;
		padding-bottom: 0.75rem;
		background: var(--background-color);
		border-bottom: 1px solid var(--weak-color);
		z-index: 1;
	}

	.close-btn {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.35rem;
		background: transparent;
		color: var(--primary-color);
		cursor: pointer;
		transition: background-color 0.15s ease;

		&:hover,
		&:focus-visible {
			background: var(--block-color);
			outline: none;
		}
	}

	.meta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
	}

	.github-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--accent-color);
		text-decoration: underline transparent 0.05em;
		text-underline-offset: 0.15em;
		transition: text-decoration-color 0.15s ease;

		&:hover {
			text-decoration-color: currentColor;
		}
	}

	.media-block {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.video-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: 0.5rem;
		background: var(--block-color);

		iframe,
		video {
			width: 100%;
			height: 100%;
			border: 0;
		}
	}

	.image-row {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr;

		@media (min-width: 640px) {
			grid-template-columns: repeat(2, 1fr);
		}

		img {
			width: 100%;
			height: auto;
			border-radius: 0.5rem;
			object-fit: cover;
		}
	}
</style>

<section id="projects" class="projects">
	<header class="flex flex-col gap-2">
		<h2>{heading}</h2>
		{#if subtitle}
			<p class="subtitle">{subtitle}</p>
		{/if}
	</header>

	{#if projects.length === 0}
		<p class="c-secondary">No projects yet. Add a markdown file under <code>src/content/project</code>.</p>
	{:else}
		<div class="projects-grid">
			{#each projects as project (project.id)}
				<button type="button" class="project-card" onclick={() => openProject(project.id)} aria-haspopup="dialog">
					<h2 class="text-5 font-bold">{project.title}</h2>
					{#if project.tools.length}
						<div class="tools">
							{#each project.tools as tool}
								<span class="tool">{tool}</span>
							{/each}
						</div>
					{/if}
					<p class="blurb">{project.blurb}</p>
				</button>
			{/each}
		</div>
	{/if}
</section>

{#if active}
	<dialog
		bind:this={dialog}
		class="project-dialog"
		onclose={closeProject}
		onmousedown={event => {
			if (event.target === dialog) closeProject();
		}}
	>
		<div class="dialog-body">
			<header class="dialog-header">
				<div class="flex flex-col gap-2 min-w-0">
					<h2 class="text-6 font-bold">{active.title}</h2>
					{#if active.tools.length}
						<div class="tools">
							{#each active.tools as tool}
								<span class="tool">{tool}</span>
							{/each}
						</div>
					{/if}
				</div>
				<button type="button" class="close-btn" onclick={closeProject} aria-label="Close project details">
					{@render closeIcon?.()}
				</button>
			</header>

			<div class="meta-row">
				{#if active.github}
					<a class="github-link" href={active.github} target="_blank" rel="noopener noreferrer">
						{@render githubIcon?.()}
						<span>View on GitHub</span>
					</a>
				{/if}
			</div>

			{#if active.video || (active.images && active.images.length)}
				<div class="media-block">
					{#if active.video}
						<div class="video-frame">
							{#if isYouTube(active.video)}
								<iframe
									src={youtubeEmbed(active.video)}
									title={`${active.title} video`}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
									loading="lazy"
								></iframe>
							{:else}
								<video controls src={active.video}>
									<track kind="captions" />
								</video>
							{/if}
						</div>
					{/if}

					{#if active.images?.length}
						<div class="image-row">
							{#each active.images as image}
								<img src={image} alt={`${active.title} screenshot`} loading="lazy" />
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<section class="markdown" id="markdown-content">
				{@html active.html}
			</section>
		</div>
	</dialog>
{/if}

<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	export type ProjectCard = {
		id: string;
		slug: string;
		title: string;
		tools: string[];
		blurb: string;
		github?: string;
		video?: string;
		images?: string[];
		html: string;
	};

	let {
		heading = "Projects",
		subtitle = "",
		projects,
		closeIcon,
		githubIcon
	}: {
		heading?: string;
		subtitle?: string;
		projects: ProjectCard[];
		closeIcon?: Snippet;
		githubIcon?: Snippet;
	} = $props();

	let dialog: HTMLDialogElement | null = $state(null);
	let activeId: string | null = $state(null);

	let active = $derived(projects.find(project => project.id === activeId) ?? null);

	function openProject(id: string) {
		activeId = id;
		const project = projects.find(item => item.id === id);
		if (project && typeof history !== "undefined") {
			history.replaceState(null, "", `#${project.slug}`);
		}
	}

	function closeProject() {
		activeId = null;
		dialog?.close();
		const hash = location.hash.slice(1);
		if (hash && hash !== "projects" && projects.some(project => project.slug === hash)) {
			history.replaceState(null, "", location.pathname + location.search);
		}
	}

	function isYouTube(url: string) {
		return /youtu\.be\/|youtube\.com\//.test(url);
	}

	function youtubeEmbed(url: string) {
		try {
			const parsed = new URL(url);
			if (parsed.hostname.includes("youtu.be")) {
				return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
			}
			const id = parsed.searchParams.get("v");
			if (id) return `https://www.youtube.com/embed/${id}`;
		} catch {
			/* fall through */
		}
		return url;
	}

	$effect(() => {
		if (active && dialog && !dialog.open) {
			dialog.showModal();
			window.zoom?.();
		}
	});

	onMount(() => {
		const syncHash = () => {
			const hash = location.hash.slice(1);
			if (!hash || hash === "about" || hash === "work" || hash === "projects") {
				if (activeId) closeProject();
				return;
			}
			const match = projects.find(project => project.slug === hash);
			if (match) openProject(match.id);
		};

		syncHash();

		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && activeId) closeProject();
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("hashchange", syncHash);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("hashchange", syncHash);
		};
	});
</script>
