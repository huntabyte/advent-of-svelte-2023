<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { sleep } from "$lib/utils";

	let open = $state(false);

	$effect(() => {
		sleep(1500).then(() => {
			open = true;
		});
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Merry Christmas & Happy Holidays! 🎄 🎁</Dialog.Title>
			<Dialog.Description>
				Thanks for playing along this year! I hope you enjoyed watching me struggle at the most
				basic of tasks. I'm looking forward to doing this again next year!
			</Dialog.Description>
		</Dialog.Header>
		<img src="/santa.png" alt="Santa greeting you" class="h-auto object-cover" />
	</Dialog.Content>
</Dialog.Root>
