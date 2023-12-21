<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	let beats = $state(0);
	let started = $state(false);
	let time = $state(0);
	let bpm = $derived(beats / (time / 60) || 0);

	let interval: number = 0;

	$effect(() => {
		if (started) {
			interval = window.setInterval(() => {
				time += 1;
			}, 1000);
		} else {
			time = 0;
			beats = 0;
		}

		return () => window.clearInterval(interval);
	});
</script>

<p>Time elapsed: {time}</p>
<p>Total beats: {beats}</p>
<p>BPM: {bpm.toFixed(2)}</p>
<Button onclick={() => (started = true)}>Start</Button>
<Button onclick={() => (started = false)}>Stop</Button>
<Button
	onclick={() => {
		started = false;
	}}>Reset</Button
>
<div class="pt-8">
	<Button disabled={!started} onclick={() => beats++} class="h-[200px] w-[200px] active:scale-98"
		>Beat</Button
	>
</div>
