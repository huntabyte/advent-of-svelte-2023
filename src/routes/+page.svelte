<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	type Day = {
		day: number;
		title: string;
	};

	const days: Day[] = [
		{
			day: 1,
			title: 'Naughty or Nice'
		}
	];
</script>

<div class="container mx-auto w-full py-16">
	<div class="grid grid-cols-3">
		{#each days as { day, title }}
			<a href="/day{day}" class="group">
				<Card.Root class="group-hover:bg-muted/40 transition-colors ease-linear">
					<Card.Header>
						<Card.Title>Day {day}</Card.Title>
						<Card.Description>{title}</Card.Description>
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>
