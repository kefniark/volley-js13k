import { Entity } from '../entities/entity';

export class Background extends Entity {

	public can: HTMLCanvasElement;
	public get context() { return this.ctx; }
	public r = false;

	constructor(can: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.can = can;
		for (let i = 0; i < 200; i++) {
			this.instSprite('assets/background.svg', {
				x: 320,
				y: 180
			});
		}
	}

	public render(alpha: number): void {
		if (this.r) return;

		this.ctx.clearRect(0, 0, this.can.width, this.can.height);
		super.render(alpha);
		this.r = true;
	}
}
