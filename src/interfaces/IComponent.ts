import { IEntity } from './IEntity';
import { IScene } from './IScene';

export interface IComponent {
	s: IScene;
	e?: IEntity;

	update(t: number, dt: number): void;
	render(a: number): void;
}
