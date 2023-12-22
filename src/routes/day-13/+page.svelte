<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import LoadTable from "./load-table.svelte";
	let { data } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sleigh Loads</Card.Title>
		<Card.Description>Upcoming present deliveries</Card.Description>
	</Card.Header>
	<Card.Content>
		<LoadTable loads={data.loads} />
	</Card.Content>
</Card.Root>
