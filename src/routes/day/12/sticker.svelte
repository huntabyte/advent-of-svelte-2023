<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements";
	import type { Frame } from "./state.svelte";

	type Props = HTMLImgAttributes & {
		frame: Frame;
	};

	let { frame, ...props } = $props<Props>();
	const sticker = frame.createSticker();
</script>

<img
	{...props}
	class="absolute top-5 left-5"
	bind:this={sticker.el}
	onpointerdown={sticker.onPointerDown}
/>
