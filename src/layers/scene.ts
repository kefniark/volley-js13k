import { Ball } from '../components/ball';
import { Character } from '../components/character';
import { Text } from '../components/text';
import { Transform } from '../components/transform';
import { Entity } from '../entities/entity';

export class Scene extends Entity {

	public can: HTMLCanvasElement;
	private audioHit: HTMLAudioElement;
	private audioJump: HTMLAudioElement;
	private get context() { return this.ctx; }
	private cloud: Entity;
	private cloud2: Entity;
	private cloud3: Entity;

	private current: Character;
	private player1: Character;
	private player2: Character;
	private ball: Ball;
	// private b1: Entity;
	// private b2: Entity;
	// private b3: Entity;
	// private b4: Entity;
	// private b5: Entity;
	// private b6: Entity;

	private score1: Text;
	private score2: Text;
	private s1 = 0;
	private s2 = 0;

	constructor(can: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.audioHit = (window as any).loader.audio['assets/hit.wav'];
		this.audioJump = (window as any).loader.audio['assets/jump.wav'];
		this.audioJump.volume = 0.001;

		this.can = can;
		this.cloud = this.instSprite('assets/cloud.svg', { x: Math.random() * 800, y: 30, scale: 0.28, alpha: 0.9, angle: 0 }) as Entity;
		this.cloud2 = this.instSprite('assets/cloud.svg', { x: Math.random() * 800, y: 28, scale: 0.22, alpha: 0.75 }) as Entity;
		this.cloud3 = this.instSprite('assets/cloud.svg', { x: Math.random() * 800, y: 15, scale: 0.13, alpha: 0.6 }) as Entity;

		const p1 = this.instSprite('assets/player.svg', { x: 150, y: 265, z: 2, scale: 0.75 }, -2, 6) as Entity;
		this.player1 = new Character(this.ctx, 5, 302);
		this.player1.jumpCb = () => this.audioJump.play();
		p1.add(this.player1);

		const p2 = this.instSprite('assets/player.svg', { x: 450, y: 265, z: 2, scale: 0.75 }, -2, 6) as Entity;
		this.player2 = new Character(this.ctx, 338, 640 - 5);
		this.player2.jumpCb = () => this.audioJump.play();
		p2.add(this.player2);
		this.player1.setup();
		this.player2.setup();

		this.current = Math.random() >= 0.5 ? this.player1 : this.player2;
		const b = this.instSprite('assets/ball.svg', { x: 150, y: 200, z: 10, scale: 0.75 }, 30, -50) as Entity;
		// this.b1 = this.createSpriteEntity('assets/ball.svg', { x: 150, y: 200, z: 9, scale: 0.75, alpha: 0.5 }, 30, -50) as Entity;
		// this.b2 = this.createSpriteEntity('assets/ball.svg', { x: 150, y: 200, z: 8, scale: 0.75, alpha: 0.3 }, 30, -50) as Entity;
		// this.b3 = this.createSpriteEntity('assets/ball.svg', { x: 150, y: 200, z: 7, scale: 0.75, alpha: 0.25 }, 30, -50) as Entity;
		// this.b4 = this.createSpriteEntity('assets/ball.svg', { x: 150, y: 200, z: 6, scale: 0.75, alpha: 0.2 }, 30, -50) as Entity;
		// this.b5 = this.createSpriteEntity('assets/ball.svg', { x: 150, y: 200, z: 5, scale: 0.75, alpha: 0.15 }, 30, -50) as Entity;
		// this.b6 = this.createSpriteEntity('assets/ball.svg', { x: 150, y: 200, z: 4, scale: 0.75, alpha: 0.1 }, 30, -50) as Entity;
		this.ball = new Ball(this.ctx, 290);
		b.add(this.ball);
		this.ball.bounceCb = () => this.audioHit.play();
		this.ball.groundCb = () => setTimeout(() => this.point(b.t.x > 320 ? this.player1 : this.player2), 1200);

		const s1 = this.instEntity({ x: 70, y: 235, scale: 0.75, alpha: 0.6 });
		const s2 = this.instEntity({ x: 565, y: 235, scale: 0.75, alpha: 0.6 });
		this.score1 = new Text(this.ctx, '0');
		s1.add(this.score1);
		this.score2 = new Text(this.ctx, '0');
		s2.add(this.score2);

		if (this.current === this.player1) this.ball.reset(150, 200);
		else this.ball.reset(640 - 150, 200);
		if (this.current === this.player1) this.score1.text += ' .';
		else this.score2.text += ' .';

		document.addEventListener('keydown', (e) => this.inputD(e), false);
		document.addEventListener('keyup', (e) => this.inputU(e), false);
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

		if (this.current === this.player1) this.ball.reset(150, 200);
		else this.ball.reset(640 - 150, 200);
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
		if (this.cloud.t.x < -100) this.cloud.t.x += 800;
		this.cloud2.t.x -= dt * 0.003;
		this.cloud2.t.y = 28 + Math.sin(time / 20000) * 5;
		if (this.cloud2.t.x < -100) this.cloud2.t.x += 800;
		this.cloud3.t.x -= dt * 0.0015;
		this.cloud3.t.y = 15 + Math.sin(time / 30000) * 3;
		if (this.cloud3.t.x < -100) this.cloud3.t.x += 800;

		// this.sprite1.transform.scale = Math.cos(time / 1000) * 0.5 + 1;
		// this.sprite1.transform.alpha = Math.cos(time / 1000) * 0.5 + 1;
		// this.sprite1.transform.angle = time / 1000;

		// this.sprite2.transform.angle = time / 1000;
		// this.sprite3.transform.angle = time / 1000;
		// this.sprite3.transform.alpha = Math.cos(time / 1000) * 0.5 + 1;
		// const b6 = this.b6;
		// const b5 = this.b5;
		// const b4 = this.b4;
		// const b3 = this.b3;
		// const b2 = this.b2;
		// const b1 = this.b1;
		// const b = this.ball.entity;
		// if (b && b1 && b2) {
		// 	b6.transform.x = b5.transform.x;
		// 	b6.transform.y = b5.transform.y;
		// 	b5.transform.x = b4.transform.x;
		// 	b5.transform.y = b4.transform.y;
		// 	b4.transform.x = b3.transform.x;
		// 	b4.transform.y = b3.transform.y;
		// 	b3.transform.x = b2.transform.x;
		// 	b3.transform.y = b2.transform.y;
		// 	b2.transform.x = b1.transform.x;
		// 	b2.transform.y = b1.transform.y;
		// 	b1.transform.x = b.transform.x;
		// 	b1.transform.y = b.transform.y;
		// }

		this.collision();
	}

	private distance(t1: Transform, t2: Transform) {
		const a = t1.x - t2.x;
		const b = t1.y - t2.y;
		return Math.sqrt(a * a + b * b);
	}

	private collision() {
		const p1 = this.player1.e;
		const p2 = this.player2.e;
		const b = this.ball.e;
		if (!p1 || !p2 || !b) return;

		if (this.distance(b.t, p1.t) < this.ball.radius + this.player1.radius) {
			this.ball.set(b.t.x - p1.t.x, p1.t.y - b.t.y);
			// console.log('collision with p1', this.distance(b.transform, p1.transform), p1.transform.x - b.transform.x);
		}
		if (this.distance(b.t, p2.t) < this.ball.radius + this.player2.radius) {
			this.ball.set(b.t.x - p2.t.x, p2.t.y - b.t.y);
			// console.log('collision with p2', this.distance(b.transform, p2.transform), p2.transform.x - b.transform.x);
		}
	}

	public render(alpha: number) {
		this.ctx.clearRect(0, 0, this.can.width, this.can.height);
		super.render(alpha);
	}
}
