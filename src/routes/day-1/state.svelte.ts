import { Persisted } from "$lib/persisted.svelte";
import { generateId } from "$lib/utils";
import type { PersonData } from "./types";

export class NaughtyOrNice {
	personData = $state<PersonData>({});
	#page = $state(0);
	#persistedPersons: Persisted<PersonData>;
	#personArr = $state(Object.entries(this.personData).map(([k, v]) => ({ id: k, ...v })));
	#pagePersons = $derived(this.#personArr.slice(this.#page * 10, this.#page * 10 + 10));
	#totalPages = $derived(Math.ceil(this.#personArr.length / 10));

	constructor(initialValue: PersonData) {
		this.#persistedPersons = new Persisted("naughtyNiceList", initialValue);
		this.personData = this.#persistedPersons.value;
		this.#page = 0;

		$effect(() => {
			this.#persistedPersons.value = this.personData;
		});

		$effect(() => {
			this.#personArr = Object.entries(this.personData).map(([k, v]) => ({ id: k, ...v }));
		});

		$effect(() => {
			if (this.#page >= this.#totalPages && this.#totalPages > 0) {
				this.#page = this.#totalPages - 1;
			}
		});
	}

	prevPage = () => {
		if (this.#page <= 0) return;
		this.#page = this.#page - 1;
	};

	lastPage = () => {
		this.#page = this.#totalPages - 1;
	};

	nextPage = () => {
		if (this.#page >= this.#totalPages - 1) return;
		this.#page = this.#page + 1;
	};

	firstPage = () => {
		this.#page = 0;
	};

	addPerson(name: string) {
		const newPerson = { name, tally: 0, id: generateId() };
		this.personData = { ...this.personData, [newPerson.id]: newPerson };
	}

	updateTally(id: string, amount: number) {
		this.personData[id].tally += amount;
	}

	get persons() {
		return this.#pagePersons;
	}

	get personArr() {
		return this.#personArr;
	}

	get page() {
		return this.#page + 1;
	}

	get totalPages() {
		return this.#totalPages;
	}
}
