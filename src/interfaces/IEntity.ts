import { Transform } from '../components/transform';
import { IComponent } from './IComponent';

export interface IEntity extends IComponent {
	t: Transform;
	c: IComponent[];
}
