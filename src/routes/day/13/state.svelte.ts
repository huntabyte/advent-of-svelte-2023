import type { SleighLoad } from "./+page";

type TableStateParams = {
	loads: SleighLoad[];
	loadsPerPage?: number;
	page?: number;
};

export class TableState {
	loads = $state<SleighLoad[]>([]) as SleighLoad[];
	loadsPerPage = $state(10);
	totalPages = $derived(Math.ceil(this.loads.length / this.loadsPerPage));
	currentPage = $state(1);
	currentPageLoads = $derived(this.getCurrPageLoads());

	getCurrPageLoads() {
		const start = (this.currentPage - 1) * this.loadsPerPage;
		const end = start + this.loadsPerPage;
		const sliced = this.loads.slice(start, end);
		return sliced;
	}

	constructor(params: TableStateParams) {
		this.loads = [...params.loads];
		this.loadsPerPage = params.loadsPerPage ?? 10;
		this.currentPage = params.page ?? 1;
		this.totalPages = Math.ceil(this.loads.length / this.loadsPerPage);

		$inspect(this.currentPageLoads);
	}

	firstPageButton = $derived({
		disabled: this.currentPage === 1,
		"aria-label": "First page",
		onclick: () => {
			this.currentPage = 1;
		}
	});

	lastPageButton = $derived({
		disabled: this.currentPage === this.totalPages,
		"aria-label": "Last page",
		onclick: () => {
			this.currentPage = this.totalPages;
		}
	});
}
