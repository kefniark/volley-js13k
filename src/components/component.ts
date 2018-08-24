import { IComponent } from '../interfaces/IComponent';
import { IEntity } from '../interfaces/IEntity';

export class Component implements IComponent {
	protected active = false;
	protected ctx: CanvasRenderingContext2D;
	protected updates: ((time: number, dt: number) => void)[] = [];
	public entity?: IEntity;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	public update(time: number, dt: number) {}
	public render(scale: number, alpha: number) {}
}
