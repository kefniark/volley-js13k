import { loader } from '..';
import { Ball } from '../components/ball';
import { Character } from '../components/character';
import { Text } from '../components/text';
import { Entity } from '../entities/entity';
import { IScene } from '../interfaces/IScene';
import { ITransform } from '../interfaces/ITransform';

const xl = 150;
const xr = 640 - 150;
const yl = 200;
const w = 800;

export class Scene extends Entity implements IScene {

	public can: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;

	private readonly audioHit: HTMLAudioElement;
	private readonly audioJump: HTMLAudioElement;
	private readonly cloud: Entity;
	private readonly cloud2: Entity;
	private readonly cloud3: Entity;

	private current: Character;
	private readonly player1: Character;
	private readonly player2: Character;
	private readonly ball: Ball;

	private readonly score1: Text;
	private readonly score2: Text;
	private s1 = 0;
	private s2 = 0;

	constructor(can: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(undefined as any);
		this.s = this;

		this.audioHit = loader.audio[loader.a[0]];
		this.audioJump = loader.audio[loader.a[1]];
		this.audioJump.volume = 0.001;

		this.can = can;
		this.ctx = ctx;

		this.cloud = this.instSprite(loader.s[2], { x: Math.random() * w, y: 30, s: 0.28, a: 0.9, r: 0 }) as Entity;
		this.cloud2 = this.instSprite(loader.s[2], { x: Math.random() * w, y: 28, s: 0.22, a: 0.75 }) as Entity;
		this.cloud3 = this.instSprite(loader.s[2], { x: Math.random() * w, y: 15, s: 0.13, a: 0.6 }) as Entity;

		const p1 = this.instSprite(loader.s[3], { x: xl, y: 265, z: 2, s: 0.75 }, -2, 6) as Entity;
		this.player1 = new Character(this.s, 5, 302);
		this.player1.jumpCb = () => this.audioJump.play();
		p1.add(this.player1);

		const p2 = this.instSprite(loader.s[3], { x: 450, y: 265, z: 2, s: 0.75 }, -2, 6) as Entity;
		this.player2 = new Character(this.s, 338, 640 - 5);
		this.player2.jumpCb = () => this.audioJump.play();
		p2.add(this.player2);
		this.player1.setup();
		this.player2.setup();

		this.current = this.player1;

		const b = this.instSprite(loader.s[1], { x: 320, y: 1000, z: 10, s: 0.75 }, 30, -50) as Entity;
		this.ball = new Ball(this.s, 290);
		b.add(this.ball);
		this.ball.eBounceCb = () => this.audioHit.play();
		this.ball.eGround = () => setTimeout(() => this.point(b.t.x > 320 ? this.player1 : this.player2), 1200);

		const s1 = this.instEntity({ x: 70, y: 235, s: 0.75, a: 0.6 });
		const s2 = this.instEntity({ x: 565, y: 235, s: 0.75, a: 0.6 });
		this.score1 = new Text(this.s, '0');
		s1.add(this.score1);
		this.score2 = new Text(this.s, '0');
		s2.add(this.score2);
	}

	public start() {
		document.addEventListener('keydown', (e) => this.inputD(e), false);
		document.addEventListener('keyup', (e) => this.inputU(e), false);

		this.current = Math.random() >= 0.5 ? this.player1 : this.player2;
		if (this.current === this.player1) this.ball.reset(xl, yl);
		else this.ball.reset(xr, yl);

		if (this.current === this.player1) this.score1.text += ' .';
		else this.score2.text += ' .';
	}

	private point(winner: Character) {
		if (winner === this.current) {
			if (this.current === this.player1) this.s1++;
			else this.s2++;
		} else {
			this.current = winner;
		}

		this.score1.text = this.s1 + '';
		this.score2.text = this.s2 + '';

		if (this.current === this.player1) this.score1.text += ' .';
		else this.score2.text += ' .';

		if (this.current === this.player1) this.ball.reset(xl, yl);
		else this.ball.reset(xr, yl);
	}

	private inputD(e: KeyboardEvent) {
		switch (e.keyCode) {
			case 65: this.player1.move(-1); break; // A
			case 68: this.player1.move(1); break; // D
			case 87: this.player1.jump(); break; // W

			case 37: this.player2.move(-1); break; // left
			case 39: this.player2.move(1); break; // right
			case 38: this.player2.jump(); break; // up
		}
	}

	private inputU(e: KeyboardEvent) {
		switch (e.keyCode) {
			case 65: // A
			case 68: this.player1.moveStop(); break; // D

			case 37: // left
			case 39: this.player2.moveStop(); break; // right
		}
	}

	public update(time: number, dt: number) {
		super.update(time, dt);

		this.cloud.t.x -= dt * 0.005;
		this.cloud.t.y = 30 + Math.sin(time / 10000) * 10;
		if (this.cloud.t.x < -100) this.cloud.t.x += w;
		this.cloud2.t.x -= dt * 0.003;
		this.cloud2.t.y = 28 + Math.sin(time / 20000) * 5;
		if (this.cloud2.t.x < -100) this.cloud2.t.x += w;
		this.cloud3.t.x -= dt * 0.0015;
		this.cloud3.t.y = 15 + Math.sin(time / 30000) * 3;
		if (this.cloud3.t.x < -100) this.cloud3.t.x += w;

		this.collision();
	}

	private distance(t1: ITransform, t2: ITransform) {
		const a = t1.x - t2.x;
		const b = t1.y - t2.y;
		return Math.sqrt(a * a + b * b);
	}

	private collision() {
		const b = this.ball.e;
		for (const p of [this.player1, this.player2]) {
			const p1 = p.e;
			if (!p1 || !b) return;

			if (this.distance(b.t, p1.t) < this.ball.radius + this.player1.radius) {
				this.ball.set(b.t.x - p1.t.x, p1.t.y - b.t.y);
			}
		}
	}

	public render(alpha: number) {
		this.ctx.clearRect(0, 0, this.can.width, this.can.height);
		super.render(alpha);
	}
}
