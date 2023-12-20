<script lang="ts">
	import type { Present } from './+page.js';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	let { data } = $props();

	let backlogPresents = $state([...data.presents]);
	let sleighPresents = $state<Present[]>([]);

	const MAX_LOAD = 100;
	const currentLoad = $derived(sleighPresents.reduce((acc, item) => acc + item.weight, 0));

	$effect(() => {
		backlogPresents.sort((a, b) => b.weight - a.weight);
	});
</script>

<div class="pb-4">
	<p>Current Load: {currentLoad}</p>
	<Progress max={MAX_LOAD} value={currentLoad} />
</div>
<div class="flex items-start w-full gap-4">
	<div class="grid grid-cols-3 gap-2 border border-border rounded-md w-full p-4">
		{#each backlogPresents as present, i (`${present.name}-${present.weight}`)}
			{#if currentLoad + present.weight <= MAX_LOAD}
				<Button
					variant="ghost"
					onclick={() => sleighPresents.push(backlogPresents.splice(i, 1)[0]!)}
				>
					{present.name} - {present.weight}
				</Button>
			{/if}
		{/each}
	</div>
	<div class="grid grid-cols-3 border border-border rounded-md min-w-1/2 w-full p-4">
		{#each sleighPresents as present, i (`${present.name}-${present.weight}`)}
			<Button variant="ghost" onclick={() => backlogPresents.push(sleighPresents.splice(i, 1)[0]!)}>
				{present.name} - {present.weight}
			</Button>
		{/each}
	</div>
</div>
