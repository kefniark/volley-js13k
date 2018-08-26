import { IScene } from '../interfaces/IScene';
import { Component } from './component';

export class Character extends Component {
	public readonly radius = 30;
	private readonly min: number;
	private readonly max: number;
	private defaultY = -1;
	private next = 0;
	private vv = 0;
	private jumped = 0;
	public jumpCb: (() => void) | undefined;

	constructor(s: IScene, min: number, max: number) {
		super(s);
		this.min = min;
		this.max = max;
	}

	public setup() {
		if (this.e) this.defaultY = this.e.t.y;
	}

	public move(x: number) {
		this.next = x;
	}

	public moveStop() {
		this.next = 0;
	}

	public jump() {
		const e = this.e;
		if (!e || this.jumped >= 1) return;
		this.vv += 10;
		this.jumped += 1;
		if (this.jumpCb) this.jumpCb();
		if (this.vv > 10) this.vv = 10;
	}

	public update(time: number, dt: number) {
		const e = this.e;
		if (!e) return;
		if (this.next !== 0) {
			e.t.x += this.next * dt * 0.35;
			if (e.t.x < this.min) e.t.x = this.min;
			if (e.t.x > this.max) e.t.x = this.max;
		}

		if (e.t.y < this.defaultY || this.vv !== 0) {
			e.t.y -= this.vv;
			if (e.t.y >= this.defaultY) {
				e.t.y = this.defaultY;
				this.vv = 0;
				this.jumped = 0;
			} else {
				this.vv -= 0.02 * dt;
			}
		}
	}

	// Debug
	// public render(a: number) {
	// 	super.render(a);

	// 	this.ctx.beginPath();
	// 	this.ctx.arc(0, 0, 2, 0, 2 * Math.PI, false);
	// 	this.ctx.fillStyle = 'green';
	// 	this.ctx.fill();
	// 	this.ctx.lineWidth = this.radius * 2;
	// 	this.ctx.strokeStyle = '#003300';
	// 	this.ctx.stroke();
	// }
}
