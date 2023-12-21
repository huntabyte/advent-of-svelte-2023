/**
 * Port of https://github.com/joshnuss/svelte-persisted-store
 * to Svelte 5 :)
 */

export type Serializer<T> = {
	parse(text: string): T;
	stringify(value: T): string;
};

export type StorageType = "local" | "session";

export type Options<T> = {
	serializer?: Serializer<T>;
	storage?: StorageType;
};

type StateMap<T> = Record<string, Persisted<T>>;

type States = {
	local: StateMap<unknown>;
	session: StateMap<unknown>;
};

const states: States = {
	local: {},
	session: {}
};

export class Persisted<T> {
	#serializer: Serializer<T> = JSON;
	#storageType: StorageType = "local";
	#key: string;
	#isBrowser: boolean = typeof window !== "undefined" && typeof document !== "undefined";
	#storage = this.#isBrowser ? getStorage(this.#storageType) : null;
	#value = $state<T | null>() as T | null;

	constructor(key: string, initialValue: T, options?: Options<T>) {
		this.#key = key;
		this.#value = initialValue;
		this.#storageType = options?.storage ?? "local";
		this.#serializer = options?.serializer ?? JSON;

		const store = states[this.#storageType][key];
		if (store) return states[this.#storageType][key] as Persisted<T>;

		states[this.#storageType][key] = this;

		const json = this.#storage?.getItem(this.#key);
		if (json) {
			this.#value = this.#serializer.parse(json);
		} else {
			this.value = initialValue;
		}

		$effect(() => {
			if (this.#isBrowser && this.#storageType == "local") {
				window.addEventListener("storage", this.#handleStorage);
			}

			return () => window.removeEventListener("storage", this.#handleStorage);
		});
	}

	#updateStorage(key: string, value: T) {
		this.#storage?.setItem(key, this.#serializer.stringify(value));
	}

	#handleStorage = (e: StorageEvent) => {
		if (e.key === this.#key) {
			this.#value = e.newValue ? this.#serializer.parse(e.newValue) : null;
		}
	};

	set value(v: T) {
		this.#updateStorage(this.#key, v);
		const json = this.#storage?.getItem(this.#key);
		if (json) {
			this.#value = this.#serializer.parse(json);
		}
	}

	get value() {
		return this.#value as T;
	}
}

function getStorage(type: StorageType) {
	return type === "local" ? localStorage : sessionStorage;
}
