import html2canvas from "html2canvas";

type FramePointerEvent = PointerEvent & { currentTarget: HTMLElement };

export class Frame {
	frameEl = $state<HTMLElement | null>(null);
	draggingEl = $state<HTMLElement | null>(null);
	offsetX = $state(0);
	offsetY = $state(0);
	stickers = $state<string[]>([]);

	createSticker = () => {
		return new Sticker(this);
	};

	#resetDraggingEl = () => {
		this.draggingEl = null;
		this.offsetX = 0;
		this.offsetY = 0;
	};

	onPointerUp = () => this.#resetDraggingEl();

	onPointerLeave = () => this.#resetDraggingEl();

	onPointerMove = (e: FramePointerEvent) => {
		e.preventDefault();
		if (!this.draggingEl) return;
		this.draggingEl.style.position = "absolute";

		const rect = e.currentTarget.getBoundingClientRect();

		const newX = e.clientX - rect.left - this.offsetX;
		const newY = e.clientY - rect.top - this.offsetY;

		this.draggingEl.style.left = `${newX}px`;
		this.draggingEl.style.top = `${newY}px`;
	};

	exportImage = async () => {
		if (!this.frameEl) return;
		const canvas = await html2canvas(this.frameEl, { useCORS: true });

		const link = document.createElement("a");
		link.download = "image.png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	};

	getImgURL = (num: number) => {
		return `https://advent.sveltesociety.dev/data/2023/day-twelve/${num}.png`;
	};

	addSticker = (num: number) => {
		this.stickers.push(this.getImgURL(num));
	};
}

type ImgPointerEvent = PointerEvent & { currentTarget: HTMLImageElement };

class Sticker {
	frame: Frame;
	el = $state<HTMLElement | null>(null);

	constructor(frame: Frame) {
		this.frame = frame;
	}

	onPointerDown = (e: ImgPointerEvent) => {
		e.preventDefault();
		this.frame.draggingEl = e.currentTarget;

		const rect = e.currentTarget.getBoundingClientRect();

		this.frame.offsetX = e.clientX - rect.left;
		this.frame.offsetY = e.clientY - rect.top;
	};
}
