<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import { Play, Stop } from "phosphor-svelte";
	import { morseMap } from "./morseMap";

	let inputVal = $state("Hello World");
	let morseCode: string[] = $derived(convertToMorse());

	function convertToMorse() {
		const inputArr = inputVal.toUpperCase().split("");
		const morseArr: string[] = [];

		inputArr.forEach((item) => {
			const morseChar = morseMap.get(item);
			if (morseChar) {
				morseArr.push(morseChar);
			}
		});
		return morseArr;
	}

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	let context: AudioContext;
	let gain: GainNode;
	let oscillator: OscillatorNode;
	let stopped = false;
	let started = $state(false);

	$effect(() => {
		context = new AudioContext();
	});

	async function beep(ms: number) {
		gain = context.createGain();
		oscillator = context.createOscillator();
		oscillator.connect(gain);
		gain.connect(context.destination);
		oscillator.start(0);
		await sleep(ms);
		gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
		await sleep(300);
	}

	function stop() {
		stopped = true;
		gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
	}

	async function playMorse() {
		started = true;
		for (const item of morseCode.join(" ")) {
			if (stopped) {
				started = false;
				stopped = false;
				break;
			}
			if (item === ".") {
				await beep(400);
			} else if (item === "-") {
				await beep(800);
			} else if (item === " ") {
				await sleep(600);
			}
		}
	}
</script>

<div class="mx-auto max-w-screen-sm">
	<Card.Root>
		<Card.Header>
			<Card.Title>Morse Code Generation</Card.Title>
			<Card.Description>Convert a message of your choice to morse code</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-2 pb-4">
				<Label for="message">Enter your message</Label>
				<Textarea id="message" bind:value={inputVal} />
			</div>
			<p class="text-sm font-medium">Generated Morse Code:</p>
			<p class="min-h-6">
				{morseCode.join(" ")}
			</p>
			<div class="flex items-center gap-2 pt-4">
				<Button disabled={started} onclick={async () => await playMorse()} variant="success">
					<Play class="mr-2 h-4 w-4" />
					Play
				</Button>
				<Button onclick={stop} disabled={!started} variant="destructive">
					<Stop class="mr-2 h-4 w-4" />
					Stop
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
