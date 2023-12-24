<script lang="ts">
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { Button } from "$lib/components/ui/button";
	import { CaretLeft, CaretRight } from "phosphor-svelte";
	import { dayNumbers, days } from "$lib/days";

	type Props = {
		path: string;
	};

	let { path } = $props<Props>();

	const currentDay = $derived(Number(path.split("/")[2]));
	const nextDay = $derived(currentDay + 1);
	const prevDay = $derived(currentDay - 1);
	const title = $derived(getTitle());

	function getTitle() {
		return `Day ${currentDay}: ${days.find((d) => d.day === currentDay)?.title}`;
	}
</script>

<div class="flex items-center justify-between py-16">
	{#if currentDay === dayNumbers[0]}
		<Button size="icon" variant="outline" disabled>
			<CaretLeft class="size-4" />
		</Button>
	{:else}
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} size="icon" variant="outline" href="/day/{prevDay}">
					<CaretLeft class="size-4" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content align="start">Previous day</Tooltip.Content>
		</Tooltip.Root>
	{/if}

	<h2 class="text-3xl font-medium tracking-tight">
		{title}
	</h2>
	{#if currentDay === dayNumbers[dayNumbers.length - 1]}
		<Button size="icon" variant="outline" disabled>
			<CaretRight class="size-4" />
		</Button>
	{:else}
		<Tooltip.Root openDelay={200}>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} size="icon" variant="outline" href="/day/{nextDay}">
					<CaretRight class="size-4" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content align="end">Next day</Tooltip.Content>
		</Tooltip.Root>
	{/if}
</div>
