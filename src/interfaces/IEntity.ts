import { Transform } from '../components/transform';
import { IComponent } from './IComponent';

export interface IEntity extends IComponent {
	transform: Transform;
	components: IComponent[];
	childrens: IEntity[];
}
