import { loader } from '..';
import { IScene } from '../interfaces/IScene';
import { Component } from './component';

export class Sprite extends Component {
	private readonly img: HTMLImageElement;
	private readonly x: number;
	private readonly y: number;

	constructor(s: IScene, path: string, offx: number = 0, offy: number = 0) {
		super(s);
		this.img = loader.sprites[path];
		this.x = offx;
		this.y = offy;
	}

	public render(a: number) {
		this.s.ctx.drawImage(this.img, -this.img.width / 2 + this.x, -this.img.height / 2 + this.y, this.img.width, this.img.height);
	}
}
