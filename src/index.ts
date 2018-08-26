import { Entity } from './entities/entity';
import { Background } from './layers/background';
import { Scene } from './layers/scene';
import { Loader } from './loader';

export const loader: Loader = new Loader();

function init() {
	let bg: Background;
	let game: Scene;
	const layers: Entity[] = [];

	let play = true;
	let prev = 0;

	/**
	 * Add new layer (canvas)
	 *
	 * @param {string} key
	 * @param {(can: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => Entity} create
	 * @returns
	 */
	function add(key: string, create: (can: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => Entity) {
		const can = document.getElementById(key) as HTMLCanvasElement;
		if (!can) return;

		const ctx = can.getContext('2d') as CanvasRenderingContext2D;
		if (!ctx) return;

		layers.push(create(can, ctx));
	}

	/**
	 * Update loop
	 *
	 * @param {number} time
	 */
	function update(time: number) {
		const dt = time - prev;
		prev = time;
		if (play) {
			for (const layer of layers) {
				layer.update(time, dt);
				layer.render(1);
			}
		}
		window.requestAnimationFrame(update);
	}
	/**
	 * Resize browser event
	 */
	function resize() {
		bg.r = false;
		for (const layer of [bg, game]) {
			const can = layer.can;
			const iw = window.innerWidth;
			const ih = window.innerHeight;

			if (iw / ih > 16 / 9) {
				layer.t.s = ih / 360;
				can.width = ih * 16 / 9;
				can.height = ih;
				can.style.left = (iw - can.width) / 2 + 'px';
				can.style.top = '0px';
			} else {
				layer.t.s = iw / 640;
				can.width = iw;
				can.height = iw / 16 * 9;
				can.style.left = '0px';
				can.style.top = (ih - can.height) / 2 + 'px';
			}
		}
	}

	/**
	 * Load assets & start the game
	 */
	loader.load(() => {
		add('background', (can, ctx) => {
			bg = new Background(can, ctx);
			return bg;
		});
		add('game', (can, ctx) => {
			game = new Scene(can, ctx);
			return game;
		});

		game.can.style.left = '320px';
		game.can.style.top = '240px';

		resize();

		document.addEventListener('visibilitychange', () => play = !document.hidden, false);
		window.addEventListener('resize', resize, false);
		window.requestAnimationFrame(update);
		game.start();
	});
}
init();
