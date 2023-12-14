<script lang="ts">
	import '../app.pcss';
	let { children } = $props();
	import SiteHeader from '$lib/components/site-header.svelte';
</script>

<div class="relative flex min-h-screen flex-col" id="page">
	<SiteHeader />
	<div class="flex-1 h-full self-stretch container">
		{@render children()}
	</div>
	<div class="w-full text-center py-6 container">
		Advent of Svelte 2023 - by <a
			href="https://x.com/huntabyte"
			target="_blank"
			class="hover:text-sky-400 transition-colors ease-linear">@huntabyte</a
		>
	</div>
</div>
