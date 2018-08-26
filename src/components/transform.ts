export interface ITransformOptions {
	x?: number;
	y?: number;
	z?: number;
	scale?: number;
	alpha?: number;
	angle?: number;
}

export class Transform {
	// position
	public x = 0;
	public y = 0;
	public z = 0;

	// rotation / scale
	public angle = 0;
	public scale = 1;
	public alpha = 1;

	public set(options?: ITransformOptions) {
		if (!options) return;
		if (options.x !== undefined) this.x = options.x;
		if (options.y !== undefined) this.y = options.y;
		if (options.z !== undefined) this.z = options.z;
		if (options.scale !== undefined) this.scale = options.scale;
		if (options.alpha !== undefined) this.alpha = options.alpha;
		if (options.angle !== undefined) this.angle = options.angle;
	}

	public toString() {
		return `[x: ${this.x}, y: ${this.y}, scale: ${this.scale}, angle: ${this.angle}]`;
	}
}
