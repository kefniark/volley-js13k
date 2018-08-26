import { IComponent } from '../interfaces/IComponent';
import { IEntity } from '../interfaces/IEntity';
import { IScene } from '../interfaces/IScene';

export class Component implements IComponent {
	protected active = false;
	protected updates: ((time: number, dt: number) => void)[] = [];
	public s: IScene;
	public e?: IEntity;

	constructor(s: IScene) {
		this.s = s;
	}

	public update(t: number, dt: number) {}
	public render(a: number) {}
}
