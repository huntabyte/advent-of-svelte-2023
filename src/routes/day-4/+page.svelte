<script lang="ts">
	type HeartRate = {
		heartRate: number;
		timestamp: number;
	};

	const modes = [
		{
			name: '5s',
			value: 5000
		},
		{
			name: '10s',
			value: 10000
		},
		{
			name: '15s',
			value: 15000
		}
	];

	let heartRateList = $state<HeartRate[]>([]);
	const currentHeartRate = $derived(heartRateList[heartRateList.length - 1]);
	const averageHeartRates = $derived(
		modes.map((mode) => ({ name: mode.name, heartRate: getAverageHeartRate(mode.value) }))
	);

	function getAverageHeartRate(ms: number) {
		const lastFiveSec = heartRateList.filter((item) => item.timestamp > Date.now() - ms);
		const sum = lastFiveSec.reduce((acc, item) => acc + item.heartRate, 0);
		return sum / lastFiveSec.length;
	}

	$effect(() => {
		const interval = setInterval(async () => {
			const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
			const data = await res.json();

			heartRateList.push({
				heartRate: data.heartRate,
				timestamp: Date.now()
			});
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div>
	<p>Current Heartrate: {currentHeartRate?.heartRate ?? '--'}</p>
	<p>Averages</p>
	<ul>
		{#each averageHeartRates as { name, heartRate }}
			<li>
				{name}: {heartRate}
			</li>
		{/each}
	</ul>
</div>
