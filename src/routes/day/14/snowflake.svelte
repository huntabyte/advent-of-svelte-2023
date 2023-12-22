<script lang="ts">
	import { Snowflake } from "phosphor-svelte";
	import type { SVGAttributes } from "svelte/elements";

	type Props = SVGAttributes<SVGElement> & {
		color?: string;
	};

	let { ...props } = $props<Props>();

	function action(node: HTMLElement) {
		const body = document.body;
		let lastTop: number = Math.floor(Math.random() * 100);
		node.style.left =
			Math.floor(Math.random() * document.body.clientWidth - node.offsetWidth - 50) + "px";
		node.style.top = -1 * lastTop + "px";
		node.style.opacity = "0";
		body.appendChild(node);

		let start: number | undefined = undefined;
		let prevTimestamp: number = 0;
		let done: boolean = false;

		function reset() {
			node.style.opacity = "0";
			start = undefined;
			lastTop = Math.floor(Math.random() * 100);
			node.style.top = -1 * lastTop + "px";
			done = false;
			setTimeout(() => {
				requestAnimationFrame(fall);
			}, Math.random() * 10000);
		}

		function fall(timestamp: number) {
			node.style.opacity = "1";
			if (start === undefined) {
				start = timestamp;
			}

			const elapsed = timestamp - start;

			if (prevTimestamp !== timestamp) {
				const finish = document.body.clientHeight + lastTop - node.offsetHeight - 100;
				const count = Math.min(0.075 * elapsed, finish);
				node.style.transform = `translateY(${count}px)`;
				if (count === finish) {
					done = true;
				}
			}

			if (!done) {
				prevTimestamp = timestamp;
				requestAnimationFrame(fall);
			}

			if (done) {
				requestAnimationFrame(reset);
			}
		}

		setTimeout(
			() => {
				requestAnimationFrame(fall);
			},
			Math.floor(Math.random() * 10000)
		);
	}
</script>

<div use:action class="absolute -top-[50px]">
	<Snowflake class="size-4" {...props} />
</div>
