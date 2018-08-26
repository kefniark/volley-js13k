export class Loader {
	public s = ['assets/background.svg', 'assets/ball.svg', 'assets/cloud.svg', 'assets/player.svg'];
	public sprites: { [id: string]: HTMLImageElement } = {};
	public a = ['assets/hit.wav', 'assets/jump.wav'];
	public audio: { [id: string]: HTMLAudioElement } = {};

	public load(cb: () => void) {
		this.preloadImg(() => this.preloadAudio(cb));
	}

	private preloadImg(cb: () => void) {
		let toLoad = this.s.length;
		for (const asset of this.s) {
			const img = new Image();
			img.onload = () => {
				toLoad--;
				if (toLoad === 0) cb();
			};
			img.src = asset;
			this.sprites[asset] = img;
		}
	}

	private preloadAudio(cb: () => void) {
		let toLoad = this.a.length;
		for (const asset of this.a) {
			const audio = new Audio();
			audio.onload = () => {
				toLoad--;
				if (toLoad === 0) cb();
			};
			audio.src = asset;
			this.audio[asset] = audio;
		}
		cb();
	}
}
