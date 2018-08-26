export interface ITransformOptions {
	x?: number;
	y?: number;
	z?: number;
	s?: number;
	a?: number;
	r?: number;
}

export interface ITransform {
	x: number;
	y: number;
	z: number;
	r: number;
	s: number;
	a: number;
	set: (options?: ITransformOptions) => void;
}
