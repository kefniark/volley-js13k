import { IEntity } from './IEntity';

export interface IComponent {
	e?: IEntity;

	update(time: number, dt: number): void;
	render(alpha: number): void;
}
