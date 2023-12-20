<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { morseMap } from './morseMap';

	let inputVal = $state('Hello World');
	let morseCode: string[] = $derived(convertToMorse());

	function convertToMorse() {
		const inputArr = inputVal.toUpperCase().split('');
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

	async function beep(ms: number) {
		context = new AudioContext();
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
		for (const item of morseCode.join(' ')) {
			if (stopped) {
				started = false;
				stopped = false;
				break;
			}
			if (item === '.') {
				await beep(500);
			} else if (item === '-') {
				await beep(1000);
			} else if (item === ' ') {
				await sleep(1000);
			}
		}
	}
</script>

<Input type="text" bind:value={inputVal} />
{morseCode.join(' ')}
<Button disabled={started} onclick={async () => await playMorse()}>Start</Button>
<Button onclick={stop} disabled={!started}>Stop</Button>
