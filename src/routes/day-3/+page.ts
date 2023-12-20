import type { PageLoad } from './$types';

export type Present = {
	name: string;
	weight: number;
};

export const load: PageLoad = async () => {
	async function getPresents() {
		const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
		const data = await res.json();
		return data as Present[];
	}

	return {
		presents: await getPresents()
	};
};
