import { IScene } from '../interfaces/IScene';
import { Component } from './component';

export class Ball extends Component {
	public radius = 10;

	// events
	public eBounceCb: (() => void) | undefined;
	public eGround: (() => void) | undefined;

	private readonly floor: number;
	private vv = 0;
	private hv = 1;
	private play: boolean;
	private grounded = false;
	private wasGrounded = false;

	constructor(s: IScene, floor: number) {
		super(s);
		this.floor = floor;
		this.play = false;
		this.wasGrounded = false;
	}

	public reset(x: number, y: number) {
		const e = this.e;
		if (!e) return;
		e.t.x = x;
		e.t.y = y;
		this.play = false;
		this.grounded = false;
		this.wasGrounded = false;
		this.vv = 0;
		this.hv = 1;
	}

	public set(h: number, v: number) {
		this.play = true;
		if (this.grounded) return;
		if (this.eBounceCb) this.eBounceCb();
		this.hv = h * 0.26;
		this.vv = v * 0.27;
		const e = this.e;
		if (e) {
			e.t.x += this.hv;
			e.t.y -= this.vv;
		}
	}

	public update(time: number, dt: number) {
		const e = this.e;
		if (!e || !this.play) return;
		this.vv -= 0.012 * dt;
		e.t.x += this.hv;
		e.t.y -= this.vv;
		if (e.t.y >= this.floor && this.vv < 0) {
			this.vv = this.vv * -1 * 0.6;
			this.hv *= 0.5;

			this.grounded = true;
			if (this.eBounceCb && !this.wasGrounded) this.eBounceCb();
			if (this.eGround && !this.wasGrounded) this.eGround();
			this.wasGrounded = true;
		}
		if (e.t.x <= 0) {
			e.t.x = 0;
			this.hv *= -1;
			if (this.eBounceCb) this.eBounceCb();
		}
		if (e.t.x >= 640) {
			e.t.x = 640;
			this.hv *= -1;
			if (this.eBounceCb) this.eBounceCb();
		}
		if (e.t.x >= 300 && e.t.x <= 340 && e.t.y > 170) {
			if (e.t.y < 175) {
				this.vv *= -1;
			} else {
				this.hv = Math.abs(this.hv) * Math.sign(e.t.x - 320);
			}
			if (this.eBounceCb) this.eBounceCb();
		}
		if (e.t.y > this.floor) e.t.y = this.floor;
	}

	// Debug
	// public render(a: number) {
	// 	super.render(a);
	// 	this.ctx.beginPath();
	// 	this.ctx.arc(0, 0, this.radius * 2, 0, 2 * Math.PI, false);
	// 	this.ctx.fillStyle = 'green';
	// 	this.ctx.fill();
	// 	this.ctx.lineWidth = 5;
	// 	this.ctx.strokeStyle = '#003300';
	// 	this.ctx.stroke();
	// }
}
