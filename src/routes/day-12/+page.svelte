<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Label from "$lib/components/ui/label/label.svelte";
	import { Frame } from "./state.svelte";
	import Sticker from "./sticker.svelte";
	const frame = new Frame();

	let bgColor = $state("#cdcdcd");
</script>

<div class="flex justify-between w-[1280px] mx-auto pb-4 items-center">
	<div class="flex items-center">
		<div>
			<span class="text-base font-medium">Add a sticker:</span>
			<div class="flex items-center pt-2">
				{#each Array(11) as _, i}
					{@const stickerId = i + 1}
					<Button
						size="icon"
						variant="ghost"
						class="size-12 hover:bg-transparent group"
						onclick={() => frame.addSticker(stickerId)}
					>
						<img
							onpointerdown={(e) => e.preventDefault()}
							src={frame.getImgURL(stickerId)}
							alt="christmas sticker {stickerId}"
							class="h-auto object-contain group-hover:opacity-50"
						/>
					</Button>
				{/each}
			</div>
		</div>
		<div>
			<Label>Change Background Color</Label>
			<input type="color" class="w-12 h-12" bind:value={bgColor} />
		</div>
	</div>
	<Button onclick={frame.exportImage}>Export</Button>
</div>
<div
	class="relative w-[1280px] h-[720px] border-white border-2 rounded-lg overflow-hidden mx-auto"
	style:background-color={bgColor}
	bind:this={frame.frameEl}
	onpointerup={frame.onPointerUp}
	onpointermove={frame.onPointerMove}
	onpointerleave={frame.onPointerLeave}
>
	{#each frame.stickers as src}
		<Sticker {frame} {src} />
	{/each}
</div>
