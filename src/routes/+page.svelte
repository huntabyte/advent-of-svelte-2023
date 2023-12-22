<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { days } from "$lib/days";
</script>

<div class="mx-auto py-16">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each days as { day, title }}
			<a href="/day/{day}" class="group">
				<Card.Root class="transition-colors ease-linear group-hover:bg-muted/40">
					<Card.Header>
						<Card.Title>Day {day}</Card.Title>
						<Card.Description>{title}</Card.Description>
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>
