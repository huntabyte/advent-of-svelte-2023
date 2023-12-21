<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Game } from './states.svelte';

	const game = new Game(6);
</script>

<div class="py-6">
	<p>Match the days to win!</p>
	<p>Highscore: {game.highScore ?? 'N/A'}</p>
	<p>Current time: {game.time}</p>

	<Button onclick={() => game.startGame()}>Start Game</Button>
</div>

{#if game.status === 'ready'}
	<ul>
		{#each game.scores as score}
			<li>{score}</li>
		{/each}
	</ul>
{/if}

{#if game.status === 'in progress'}
	<div class="grid grid-cols-8 gap-4">
		{#each game.cards as day, i (`${day}-${i}`)}
			<button class="h-auto w-full relative" onclick={() => game.checkMatch(i)}>
				<img
					src="https://advent.sveltesociety.dev/data/2023/day-eight/{day}.png"
					alt=""
					class="h-full w-full object-cover"
					data-id={i}
					data-day={day}
				/>
				{#if !game.selected.includes(i) && !game.matches.includes(day)}
					<div class="bg-muted absolute inset-0" />
				{/if}
			</button>
		{/each}
	</div>
{/if}
