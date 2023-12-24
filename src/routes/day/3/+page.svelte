<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import type { Present } from "./+page.js";
	import { Button } from "$lib/components/ui/button";
	import { Progress } from "$lib/components/ui/progress";
	import { Gift } from "phosphor-svelte";
	let { data } = $props();

	let backlogPresents = $state([...data.presents]);
	let sleighPresents = $state<Present[]>([]);

	const MAX_LOAD = 100;
	const currentLoad = $derived(sleighPresents.reduce((acc, item) => acc + item.weight, 0));

	$effect(() => {
		backlogPresents.sort((a, b) => b.weight - a.weight);
	});
</script>

<div class="mx-auto flex max-w-screen-sm flex-col gap-2 pb-4">
	<span class="font-medium">Current Load: {currentLoad}</span>
	<Progress max={MAX_LOAD} value={currentLoad} />
</div>
<div class="flex w-full items-start gap-4">
	<Card.Root class="min-w-1/2 w-full">
		<Card.Header class="px-6 pb-2 pt-6">
			<Card.Title>Backlog</Card.Title>
		</Card.Header>
		<div class="grid w-full grid-cols-3 gap-2 p-4">
			{#each backlogPresents as present, i (`${present.name}-${present.weight}`)}
				{#if currentLoad + present.weight <= MAX_LOAD}
					<Button
						variant="ghost"
						onclick={() => sleighPresents.push(backlogPresents.splice(i, 1)[0]!)}
						class="h-12 justify-start border border-green-400/40 hover:bg-green-900"
					>
						<Gift class="mr-2 h-4 w-4" />
						<span class="sr-only">Gift</span>
						<p>{present.name} - {present.weight}</p>
					</Button>
				{/if}
			{/each}
		</div>
	</Card.Root>
	<Card.Root class="min-w-1/2 w-full">
		<Card.Header class="px-6 pb-2 pt-6">
			<Card.Title>Sleigh</Card.Title>
		</Card.Header>
		<div class="grid w-full grid-cols-3 gap-2 p-4">
			{#each sleighPresents as present, i (`${present.name}-${present.weight}`)}
				<Button
					variant="ghost"
					onclick={() => backlogPresents.push(sleighPresents.splice(i, 1)[0]!)}
					class="h-12 justify-start border border-red-400/40 hover:bg-red-900"
				>
					<Gift class="mr-2 h-4 w-4" />
					<span class="sr-only">Gift</span>
					<p>
						{present.name} - {present.weight}
					</p>
				</Button>
			{/each}
		</div>
	</Card.Root>
</div>
