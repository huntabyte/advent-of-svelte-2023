import { Persisted } from '$lib/persisted.svelte';
import { generateId } from '$lib/utils';
import type { PersonData } from './types';

export class NaughtyOrNice {
	personData = $state<PersonData>({});
	#page = $state(0);
	#persistedPersons: Persisted<PersonData>;
	#persistedPage: Persisted<number>;
	#personArr = $state(Object.entries(this.personData).map(([k, v]) => ({ id: k, ...v })));
	#naughty = $derived(this.#personArr.filter((p) => p.tally < 0));
	#nice = $derived(this.#personArr.filter((p) => p.tally > 0));
	#pagePersons = $derived(this.#personArr.slice(this.#page * 10, this.#page * 10 + 10));
	#totalPages = $derived(Math.ceil(this.#personArr.length / 10));

	constructor(initialValue: PersonData) {
		this.#persistedPersons = new Persisted('naughtyNiceList', initialValue);
		this.#persistedPage = new Persisted('naughtyNicePage', 0);
		this.personData = this.#persistedPersons.value;
		this.#page = this.#persistedPage.value;

		$effect(() => {
			this.#persistedPersons.value = this.personData;
		});
		$effect(() => {
			this.#persistedPage.value = this.#page;
		});

		$effect(() => {
			this.#personArr = Object.entries(this.personData).map(([k, v]) => ({ id: k, ...v }));
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
		this.personData[newPerson.id] = newPerson;
	}

	removePerson(name: string) {
		delete this.personData[name];
	}

	updateTally(id: string, amount: number) {
		this.personData[id].tally += amount;
	}

	#sortByTallyType: 'asc' | 'desc' | undefined = undefined;

	toggleSortByTally = () => {
		this.#sortByTallyType = this.#sortByTallyType === 'asc' ? 'desc' : 'asc';

		this.#personArr.sort((a, b) => {
			const comparison = this.#sortByTallyType === 'asc' ? a.tally - b.tally : b.tally - a.tally;
			return comparison === 0 ? a.tally - b.tally : comparison;
		});
	};

	#sortByNameType: 'asc' | 'desc' | undefined = undefined;

	toggleSortByName = () => {
		this.#sortByNameType = this.#sortByNameType === 'asc' ? 'desc' : 'asc';

		this.#personArr.sort((a, b) => {
			return this.#sortByNameType === 'asc'
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		});
	};

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
