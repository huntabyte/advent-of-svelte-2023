import type { PageLoad } from "./$types";

export type Present = {
	name: string;
	weight: number;
};

export type SleighLoad = {
	weight: number;
	presents: Present[];
	id: number;
};

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-thirteen.json");
	const presents = (await res.json()) as Present[];
	presents.sort((a, b) => b.weight - a.weight);

	return {
		loads: getSleighLoads(presents)
	};
};

function getSleighLoads(presents: Present[]) {
	const sleighLoads: SleighLoad[] = [];

	let id = 0;
	let currLoad: Present[] = [];
	let currWeight = 0;

	for (const present of presents) {
		let foundMatch = false;

		if (currWeight + present.weight > 100) {
			if (sleighLoads.length) {
				for (let i = sleighLoads.length - 1; i >= 0; i--) {
					const load = sleighLoads[i]!;
					if (load.weight + present.weight <= 100) {
						foundMatch = true;
						load.presents.push(present);
						load.weight += present.weight;
						break;
					}
				}
			}

			if (!foundMatch) {
				sleighLoads.push({
					weight: currWeight,
					presents: [...currLoad],
					id
				});
				id++;
				currLoad = [present];
				currWeight = present.weight;
			}
		} else {
			currLoad.push(present);
			currWeight += present.weight;
		}
	}

	if (currLoad.length) {
		sleighLoads.push({
			weight: currWeight,
			presents: [...currLoad],
			id
		});
		id++;
	}

	sleighLoads.sort((a, b) => b.weight - a.weight);

	return sleighLoads;
}
