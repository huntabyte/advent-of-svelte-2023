<script lang="ts">
	import { Pagination } from "bits-ui";
	import * as Table from "$lib/components/ui/table";
	import { Button } from "$lib/components/ui/button";

	import type { SleighLoad } from "./+page";
	import { TableState } from "./state.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import { CaretDoubleLeft, CaretLeft, CaretRight, CaretDoubleRight } from "phosphor-svelte";
	import { cn } from "$lib/utils";

	type Props = { loads: SleighLoad[] };
	let { loads } = $props<Props>();

	const tData = new TableState({ loads });

	$inspect(tData.currentPageLoads);
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.TableHead>Id</Table.TableHead>
			<Table.TableHead>Total Presents</Table.TableHead>
			<Table.TableHead>Total Weight</Table.TableHead>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#key tData.currentPage}
			{#each tData.currentPageLoads as load (load.id)}
				<Table.Row>
					<Table.Cell>{load.id}</Table.Cell>
					<Table.Cell>{load.presents.length}</Table.Cell>
					<Table.Cell>{load.weight}</Table.Cell>
				</Table.Row>
			{/each}
		{/key}
	</Table.Body>
</Table.Root>

<Pagination.Root
	let:pages
	count={tData.loads.length}
	bind:page={tData.currentPage}
	perPage={tData.loadsPerPage}
	class="flex items-center gap-1"
>
	<Button variant="outline" size="icon" {...tData.firstPageButton} class="size-8 text-xs">
		<CaretDoubleLeft class="size-4" />
	</Button>
	<Pagination.PrevButton
		class={cn(buttonVariants({ size: "icon", variant: "outline" }), "size-8 text-xs")}
	>
		<CaretLeft class="size-4" />
	</Pagination.PrevButton>
	{#each pages as page (page.key)}
		<Pagination.Page
			{page}
			class={cn(
				buttonVariants({ size: "icon", variant: "outline" }),
				"size-8 text-xs data-[selected]:bg-primary data-[selected]:text-primary-foreground"
			)}
		>
			{#if page.type === "ellipsis"}
				...
			{:else}
				{page.value}
			{/if}
		</Pagination.Page>
	{/each}
	<Pagination.NextButton
		class={cn(buttonVariants({ size: "icon", variant: "outline" }), "size-8 text-xs")}
	>
		<CaretRight class="size-4" />
	</Pagination.NextButton>
	<Button variant="outline" size="icon" {...tData.lastPageButton} class="size-8 text-xs">
		<CaretDoubleRight class="size-4" />
	</Button>
</Pagination.Root>
