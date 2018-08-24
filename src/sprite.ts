import { IEntity } from './interfaces/IEntity';

export class Sprite implements IEntity {
	private img: HTMLImageElement;
	private ctx: CanvasRenderingContext2D;
	private ready = false;
	public x = 0;
	public y = 0;
	public z = 0;
	public scale = 1;
	public angle = 0;
	public alpha = 1;
	public updates: ((time: number, dt: number) => void)[] = [];

	constructor(ctx: CanvasRenderingContext2D, path: string) {
		this.ctx = ctx;
		this.img = new Image();
		this.img.onload = () => this.ready = true;
		this.img.src = path;
	}

	public addUpdate(cb: (time: number, dt: number) => void) {
		this.updates.push(cb);
	}

	public update(time: number, dt: number): void {
		this.updates.forEach((cb) => cb(time, dt));
	}

	public render() {
		if (!this.ready || this.alpha <= 0 || this.scale <= 0) return;
		this.ctx.translate(this.x, this.y);
		if (this.angle !== 0) this.ctx.rotate(this.angle);
		if (this.alpha < 1) this.ctx.globalAlpha = this.alpha;
		this.ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2, this.img.width * this.scale, this.img.height * this.scale);
		if (this.alpha < 1) this.ctx.globalAlpha = 1;
		if (this.angle !== 0) this.ctx.rotate(-this.angle);
		this.ctx.translate(-this.x, -this.y);
	}
}
