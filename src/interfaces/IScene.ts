import { IEntity } from './IEntity';

export interface IScene extends IEntity {
	can: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
}
