<script lang="ts">
	import { Cookie } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';

	let count = $state(0);
	const mood = $derived(getSantasMood());

	function getSantasMood() {
		if (count * 10 > 100) return 100;
		return count * 10;
	}
</script>

<div class="flex flex-col w-full gap-4">
	<h2>Santa's Mood:</h2>
	<Progress value={mood} />
	<div class="flex items-center gap-0.5 h-6">
		{#each Array(count) as _}
			<Button size="icon" variant="ghost" onclick={() => count--}>
				<Cookie class="h-6 w-6" />
			</Button>
		{/each}
	</div>
	<div class="flex items-center gap-2">
		<Button onclick={() => count++}>Add Cookie</Button>
		<Button onclick={() => count--}>Remove Cookie</Button>
		<Button onclick={() => (count = 0)}>Reset Cookies</Button>
	</div>
</div>
