<script lang="ts">
	import "../app.pcss";
	import { dev } from "$app/environment";
	let { children } = $props();
	import { SiteHeader, TWIndicator } from "$lib/components";
</script>

<SiteHeader />
<div class="relative flex min-h-[calc(100vh-57px)] flex-col" id="page">
	<div class="container h-full flex-1 self-stretch">
		{@render children()}
	</div>
	<div class="container w-full py-6 text-center">
		Advent of Svelte 2023 - by <a
			href="https://x.com/huntabyte"
			target="_blank"
			class="transition-colors ease-linear hover:text-sky-400">@huntabyte</a
		>
	</div>
</div>

{#if dev}
	<TWIndicator />
{/if}
