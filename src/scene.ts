import { IEntity } from './interfaces/IEntity';
import { Sprite } from './sprite';

export interface ISpriteOptions {
	x?: number;
	y?: number;
	z?: number;
	scale?: number;
	alpha?: number;
	angle?: number;
	update?: (time: number, dt: number) => void;
}

export class Scene {
	private ctx: CanvasRenderingContext2D;
	private canvas: HTMLCanvasElement;
	private elements: IEntity[];

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.elements = [];

		const sprite1 = this.createSprite('assets/cloud.svg', {
			update: (time, dt) => {
				sprite1.x = 250 + Math.cos(time / 1000) * 250;
				sprite1.angle = (Math.cos(time / 1000) + 1) * Math.PI / 8;
			}
		});

		const sprite2 = this.createSprite('assets/cloud.svg', {
			update: (time, dt) => {
				sprite2.x = 250 + Math.sin(time / 5000) * 150;
				sprite2.y = 250 + Math.cos(time / 250) * 150;
				sprite2.scale = 1 + (Math.cos(time / 5000)) * 0.5;
			}
		});

		const sprite3 = this.createSprite('assets/cloud.svg', {
			x: 250,
			y: 250,
			scale: 0.25,
			update: (time, dt) => sprite3.alpha = (Math.cos(time / 1000)) * 0.5 + 0.5
		});

		this.createSprite('assets/cloud.svg', { x: 320, y: 240, z: -1, scale: 1.5 });

		for (let i = 0; i < 200; i++) {
			this.createSprite('assets/cloud.svg', {
				x: Math.random() * 640,
				y: Math.random() * 480,
				scale: 0.1,
				z: Math.random() * 5 - 10
			});
		}
	}

	private createSprite(path: string, options?: ISpriteOptions) {
		const sprite = new Sprite(this.ctx, path);
		if (options) {
			if (options.x !== undefined) sprite.x = options.x;
			if (options.y !== undefined) sprite.y = options.y;
			if (options.z !== undefined) sprite.z = options.z;
			if (options.scale !== undefined) sprite.scale = options.scale;
			if (options.alpha !== undefined) sprite.alpha = options.alpha;
			if (options.update !== undefined) sprite.addUpdate(options.update);
		}
		this.elements.push(sprite);
		return sprite;
	}

	public update(time: number, dt: number) {
		this.elements.forEach((el) => el.update(time, dt));
	}

	public render() {
		this.elements.sort((a: IEntity, b: IEntity) => a.z > b.z ? 1 : -1);
		this.elements.forEach((el) => el.render());
	}
}
