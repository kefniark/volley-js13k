export interface ITransformOptions {
	x?: number;
	y?: number;
	z?: number;
	s?: number;
	a?: number;
	r?: number;
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
		if (options.s !== undefined) this.scale = options.s;
		if (options.a !== undefined) this.alpha = options.a;
		if (options.r !== undefined) this.angle = options.r;
	}
}
