import { loader } from '..';
import { Entity } from '../entities/entity';
import { IScene } from '../interfaces/IScene';

export class Background extends Entity implements IScene {
	public can: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public r = false;

	constructor(can: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(undefined as any);
		this.s = this;

		this.can = can;
		this.ctx = ctx;
		for (let i = 0; i < 200; i++) {
			this.instSprite(loader.s[0], {
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
