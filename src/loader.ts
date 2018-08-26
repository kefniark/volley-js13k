export class Loader {
	public sprites: { [id: string]: HTMLImageElement } = {};
	public audio: { [id: string]: HTMLAudioElement } = {};

	public load(cb: () => void) {
		this.preloadImg(() => this.preloadAudio(cb));
	}

	private preloadImg(cb: () => void) {
		const assets = ['assets/background.svg', 'assets/ball.svg', 'assets/cloud.svg', 'assets/player.svg'];
		let toLoad = assets.length;
		for (const asset of assets) {
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
		const assets = ['assets/hit.wav', 'assets/jump.wav'];
		let toLoad = assets.length;
		for (const asset of assets) {
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
