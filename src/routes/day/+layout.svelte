<script lang="ts">
	import { page } from "$app/stores";
	import { DayNav } from "$lib/components";

	let { children } = $props();

	// eslint-disable-next-line svelte/valid-compile
	$page;
</script>

<DayNav path={$page.url.pathname} />

<div>
	{@render children()}
</div>
