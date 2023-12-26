import type { PageLoad } from "./$types";

export type HeartRate = {
	heartRate: number;
	timestamp: number;
};

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-four.json");
	const data = await res.json();

	return {
		heartRateList: [{ heartRate: data.heartRate, timestamp: Date.now() }] as HeartRate[]
	};
};
