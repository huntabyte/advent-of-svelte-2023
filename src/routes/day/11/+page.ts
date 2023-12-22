import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-eleven.json");
	const data = (await res.json()) as Record<"firstNames" | "lastNames", string[]>;
	return {
		firstNames: data.firstNames,
		lastNames: data.lastNames
	};
};
