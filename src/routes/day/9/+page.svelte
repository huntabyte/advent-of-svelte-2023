<script lang="ts">
	import * as Card from "$lib/components/ui/card";

	const currentYear = getCurrentYear();

	const christmas = new Date(`December 25, ${currentYear} 00:00:00`);
	let today = $state(new Date());

	const diff = $derived(christmas.getTime() - today.getTime());
	const days = $derived(Math.floor(diff / (1000 * 60 * 60 * 24)));
	const months = $derived(Math.floor(diff / (1000 * 60 * 60 * 24 * 30)));
	const hours = $derived(Math.floor((diff / (1000 * 60 * 60)) % 24));
	const minutes = $derived(Math.floor((diff / (1000 * 60)) % 60));
	const seconds = $derived(Math.floor((diff / 1000) % 60));

	const times = $derived({
		days,
		months,
		hours,
		minutes,
		seconds
	});

	let interval = 0;

	$effect(() => {
		interval = window.setInterval(() => {
			today = new Date();
		}, 1000);

		return () => {
			window.clearInterval(interval);
		};
	});

	/**
	 * Check if it's already past Christmas for this year,
	 * and if so, use next year for the countdown instead.
	 */
	function getCurrentYear() {
		const date = new Date();
		const currentYear = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();

		if (month === 11 && day > 25) {
			return currentYear + 1;
		}

		return currentYear;
	}
</script>

<div class="mx-auto max-w-screen-md">
	<h1 class="mb-8 w-full text-center text-5xl font-semibold">Countdown to Christmas 🎄</h1>
	<div class="grid grid-cols-5 gap-4">
		{#each Object.entries(times) as [key, value]}
			<Card.Root class="border-2 p-6">
				<Card.Content class="flex flex-col items-center gap-2 p-0">
					{@const k = value === 1 ? key.substring(0, key.length - 1) : key}
					<p class="text-4xl">{value}</p>
					<p class="text-2xl capitalize">{k}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
