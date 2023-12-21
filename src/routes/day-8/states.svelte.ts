export class Game {
	scores: number[] = $state([]);
	highScore: number | undefined = $derived([...this.scores].sort((a, b) => a - b)[0]);
	cards: number[] = $state([]);
	selected: number[] = $state([]);
	matches: number[] = $state([]);
	gameComplete: boolean = $derived(this.matches.length === this.cards.length / 2);
	status: 'ready' | 'in progress' | 'ended' = $state('ready');
	time: number = $state(0);

	constructor(numCards: number) {
		this.cards = createArray(numCards);

		$effect(() => {
			if (this.gameComplete) {
				this.status = 'ended';
				this.scores.push(this.time);
				this.resetGame();
			}
		});

		$effect(() => {
			let interval: number;
			if (this.status === 'in progress') {
				interval = window.setInterval(() => {
					if (this.status === 'ended') {
						window.clearInterval(interval);
						return;
					}
					this.time += 1;
				}, 1000);
			}
			return () => {
				window.clearInterval(interval);
			};
		});
	}

	startGame = () => {
		this.status = 'in progress';
	};

	checkMatch = (idx: number) => {
		if (this.selected.length === 2) {
			this.selected = [];
		}
		const currDay = this.cards[idx];
		this.selected.push(idx);
		if (this.selected.length !== 2) return;

		const prev = this.selected[0];
		if (prev === undefined) return;

		const prevDay = this.cards[prev];
		if (prevDay && currDay === prevDay) {
			this.matches.push(prevDay);
			this.selected = [];
		}
	};

	resetGame = () => {
		this.cards = shuffleArr(this.cards);
		this.selected = [];
		this.matches = [];
		this.time = 0;
		this.status = 'ready';
	};
}

function shuffleArr(arr: number[]) {
	const newArr = [...arr];
	let currentIndex = newArr.length;

	while (currentIndex !== 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		//@ts-expect-error typescript is stupid
		[newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]];
	}
	return newArr;
}

function createArray(numCards: number) {
	if (numCards > 24) throw new Error('Too many cards');
	const init = Array.from({ length: numCards }, (_, i) => i + 1);
	const merged = init.concat(init);
	return shuffleArr(merged);
}
