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
		},
		{
			day: 10,
			title: "Pop-up! Spreading the holiday cheer"
		},
		{
			day: 11,
			title: "Tinsel Transformers"
		},
		{
			day: 12,
			title: "Greetings & Salutations"
		}
	];
</script>

<div class="mx-auto">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
