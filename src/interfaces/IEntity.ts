import { IComponent } from './IComponent';
import { ITransform } from './ITransform';

export interface IEntity extends IComponent {
	t: ITransform;
	c: IComponent[];
}
