import { arrayToObject } from "$lib/utils";
import type { PageLoad } from "./$types";
import type { PersonData } from "./types";

export const load: PageLoad = async ({ fetch }) => {
	async function getNaughtyNiceList() {
		return fetch("https://advent.sveltesociety.dev/data/2023/day-one.json")
			.then((res) => res.json())
			.then((res) => {
				return arrayToObject(res);
			});
	}

	return {
		naughtyNiceList: (await getNaughtyNiceList()) as PersonData
	};
};
