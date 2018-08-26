import { Component } from './component';

export class Sprite extends Component {
	private img: HTMLImageElement;
	private x: number;
	private y: number;

	constructor(ctx: CanvasRenderingContext2D, path: string, offx: number = 0, offy: number = 0) {
		super(ctx);
		if (!(window as any).loader.sprites[path]) throw new Error('sprite not loaded' + path);
		this.img = (window as any).loader.sprites[path];
		this.x = offx;
		this.y = offy;
	}

	public render(a: number) {
		this.ctx.drawImage(this.img, -this.img.width / 2 + this.x, -this.img.height / 2 + this.y, this.img.width, this.img.height);
	}
}
