<script lang="ts">
	import Snowflake from "./snowflake.svelte";

	type Props = {
		numSnowflakes?: number;
	};
	let { numSnowflakes = 25 } = $props<Props>();
</script>

{#each Array(numSnowflakes) as _}
	<Snowflake />
{/each}
