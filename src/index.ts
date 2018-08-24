import { Scene } from './scene';

function init() {
	const can = document.getElementById('canvas') as HTMLCanvasElement;
	if (!can) return;

	const ctx = can.getContext('2d') as CanvasRenderingContext2D;
	if (!ctx) return;

	ctx.imageSmoothingEnabled = false;
	const scene = new Scene(can, ctx);

	let play = true;
	let prev = 0;
	function update(time: number) {
		const dt = time - prev;
		prev = time;
		if (play) {
			scene.update(time, dt);
			ctx.clearRect(0, 0, 640, 480);
			scene.render(1, 1);
		}
		if (time > 1000) return;
		window.requestAnimationFrame(update);
	}
	window.requestAnimationFrame(update);

	console.log(scene);

	document.addEventListener( 'visibilitychange', () => play = !document.hidden, false);
}

init();
