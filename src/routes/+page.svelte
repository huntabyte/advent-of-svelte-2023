<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	type Day = {
		day: number;
		title: string;
	};

	const days: Day[] = [
		{
			day: 1,
			title: "Naughty or Nice"
		},
		{
			day: 2,
			title: "Merry Munch-o-Meter"
		},
		{
			day: 3,
			title: "Jingle Bell Balancer"
		},
		{
			day: 4,
			title: "Heart of Christmas"
		},
		{
			day: 5,
			title: "Present Progress"
		},
		{
			day: 6,
			title: "Mistletoe Metronome"
		},
		{
			day: 7,
			title: "Morse Mischief"
		},
		{
			day: 8,
			title: "Santa's Mysterious Deck of Doubles"
		},
		{
			day: 9,
			title: "Santa's Final Countdown"
		}
	];
</script>

<div class="container mx-auto py-16">
	<div class="grid grid-cols-4 gap-4">
		{#each days as { day, title }}
			<a href="/day-{day}" class="group">
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
