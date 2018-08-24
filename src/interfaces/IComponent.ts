import { Transform } from '../components/transform';
import { IEntity } from './IEntity';

export interface IComponent {
	entity?: IEntity;

	update(time: number, dt: number): void;
	render(scale: number, alpha: number): void;
}
