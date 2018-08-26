import { Background } from './layers/background';
import { Scene } from './layers/scene';
import { Loader } from './loader';

const layerScene: { [id: string]: Background | Scene } = {};
(window as any).loader = new Loader();

function addCanvas(key: string) {
	const can = document.getElementById(key) as HTMLCanvasElement;
	if (!can) return;

	const ctx = can.getContext('2d') as CanvasRenderingContext2D;
	if (!ctx) return;

	// ctx.imageSmoothingEnabled = false;

	let scene: Background | Scene;
	if (key === 'background') {
		scene = new Background(can, ctx);
	} else if (key === 'game') {
		scene = new Scene(can, ctx);
	} else {
		throw new Error('unknow layer');
	}

	layerScene[key] = scene;
	(window as any).layers = layerScene;
	return can;
}

function init() {
	addCanvas('background');
	const game = addCanvas('game');
	if (game) {
		game.style.left = '320px';
		game.style.top = '240px';
	}

	let play = true;
	let prev = 0;
	function update(time: number) {
		const dt = time - prev;
		prev = time;
		if (play) {
			for (const layer in layerScene) {
				if (!layerScene.hasOwnProperty(layer)) continue;
				const scene = layerScene[layer];

				scene.update(time, dt);
				scene.render(1);
			}
		}
		window.requestAnimationFrame(update);
	}

	function resize() {
		for (const layer in layerScene) {
			if (!layerScene.hasOwnProperty(layer)) continue;
			const scene = layerScene[layer];
			const can = scene.can;

			if (window.innerWidth / window.innerHeight > 16 / 9) {
				scene.t.scale = window.innerHeight / 360;
				can.width = window.innerHeight * 16 / 9;
				can.height = window.innerHeight;
				can.style.left = (window.innerWidth - can.width) / 2 + 'px';
				can.style.top = '0px';
			} else {
				scene.t.scale = window.innerWidth / 640;
				can.width = window.innerWidth;
				can.height = window.innerWidth / 16 * 9;
				can.style.left = '0px';
				can.style.top = (window.innerHeight - can.height) / 2 + 'px';
			}

			if (layerScene.background) {
				const bg = layerScene.background as Background;
				bg.r = false;
			}
		}
	}

	resize();
	window.requestAnimationFrame(update);

	document.addEventListener('visibilitychange', () => play = !document.hidden, false);
	window.addEventListener('resize', resize, false);

}

(window as any).loader.load(init);
