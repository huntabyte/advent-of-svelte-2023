<script lang="ts">
	import '../app.pcss';
	let { children } = $props();
</script>

<div class="flex flex-col justify-between container h-full min-h-full">
	<div class="flex-1 h-full">
		{@render children()}
	</div>
	<div class="w-full text-center py-4">
		Advent of Svelte 2023 - by <a
			href="https://x.com/huntabyte"
			target="_blank"
			class="hover:text-sky-400 transition-colors ease-linear">@huntabyte</a
		>
	</div>
</div>
