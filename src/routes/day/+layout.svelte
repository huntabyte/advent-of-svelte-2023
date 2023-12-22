<script lang="ts">
	import { page } from "$app/stores";
	import { dayNumbers, days } from "$lib/days";
	import { Button } from "$lib/components/ui/button";
	import { CaretLeft, CaretRight } from "phosphor-svelte";

	let { children } = $props();

	// eslint-disable-next-line svelte/valid-compile
	$page;
</script>

<div class="flex items-center justify-between py-16">
	{#if Number($page.url.pathname.split("/")[2]) === dayNumbers[0]}
		<Button size="icon" variant="outline" disabled>
			<CaretLeft class="size-4" />
		</Button>
	{:else}
		<Button
			size="icon"
			variant="outline"
			href="/day/{Number($page.url.pathname.split('/')[2]) - 1}"
		>
			<CaretLeft class="size-4" />
		</Button>
	{/if}

	<h2 class="text-3xl font-medium tracking-tight">
		Day {$page.url.pathname.split("/")[2]}: {days.find(
			(d) => d.day === Number($page.url.pathname.split("/")[2])
		)?.title}
	</h2>
	{#if Number($page.url.pathname.split("/")[2]) === dayNumbers[dayNumbers.length - 1]}
		<Button size="icon" variant="outline" disabled>
			<CaretLeft class="size-4" />
		</Button>
	{:else}
		<Button
			size="icon"
			variant="outline"
			href="/day/{Number($page.url.pathname.split('/')[2]) + 1}"
		>
			<CaretRight class="size-4" />
		</Button>
	{/if}
</div>

<div>
	{@render children()}
</div>
