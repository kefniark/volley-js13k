export interface IEntity {
	x: number;
	y: number;
	z: number;
	angle: number;
	scale: number;
	alpha: number;

	update(time: number, dt: number): void;
	render(): void;
}
