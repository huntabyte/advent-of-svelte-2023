<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Cookie } from "phosphor-svelte";
	import { Button } from "$lib/components/ui/button";
	import { Progress } from "$lib/components/ui/progress";

	let count = $state(0);
	const mood = $derived(getSantasMood());

	function getSantasMood() {
		if (count * 10 > 100) return 100;
		return count * 10;
	}
</script>

<Card.Root class="mx-auto max-w-screen-md">
	<Card.Header>
		<Card.Title>Santa's Mood</Card.Title>
		<Card.Description
			>See how many cookies you need to leave out for the best gifts</Card.Description
		>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Progress value={mood} />
		<div class="flex h-6 items-center gap-0.5">
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
	</Card.Content>
</Card.Root>
