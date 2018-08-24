import { Scene } from './scene';
import { Sprite } from './sprite';

function init() {
	const can = document.getElementById('canvas') as HTMLCanvasElement;
	if (!can) return;

	const ctx = can.getContext('2d') as CanvasRenderingContext2D;
	if (!ctx) return;

	const scene = new Scene(can, ctx);

	let play = true;
	let prev = 0;
	function update(time: number) {
		const dt = time - prev;
		prev = time;
		if (play) {
			scene.update(time, dt);
			ctx.clearRect(0, 0, 640, 480);
			scene.render();
		}
		window.requestAnimationFrame(update);
	}
	window.requestAnimationFrame(update);

	document.addEventListener( 'visibilitychange', () => play = !document.hidden, false);
}

init();
