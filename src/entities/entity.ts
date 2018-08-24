import { Component } from '../components/component';
import { Sprite } from '../components/sprite';
import { ITransformOptions, Transform } from '../components/transform';
import { IComponent } from '../interfaces/IComponent';
import { IEntity } from '../interfaces/IEntity';

export class Entity extends Component implements IEntity {
	public name = '';
	public transform: Transform;
	private t: Transform;
	public components: IComponent[] = [];
	public childrens: IEntity[] = [];

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.active = true;
		this.transform = new Transform();
		this.t = new Transform();
	}

	public addComp(component: IComponent) {
		component.entity = this;
		this.components.push(component);
	}

	public deleteComp(component: IComponent) {
		component.entity = undefined;
		const index = this.components.indexOf(component);
		if (index !== -1) {
			this.components.splice(index, 1);
		}
	}

	public addChild(entity: IEntity) {
		this.childrens.push(entity);
	}

	public deleteChild(entity: IEntity) {
		const index = this.childrens.indexOf(entity);
		if (index !== -1) {
			this.childrens.splice(index, 1);
		}
	}

	public update(time: number, dt: number) {
		if (!this.active) return;
		this.components.forEach((el) => el.update(time, dt));
		this.childrens.forEach((el) => el.update(time, dt));
	}

	public createSpriteEntity(path: string, options?: ITransformOptions): IEntity {
		const entity = new Entity(this.ctx);
		entity.transform.set(options);
		const sprite = new Sprite(this.ctx, path);
		entity.addComp(sprite);
		this.addChild(entity);
		return entity;
	}

	public render(scale: number, alpha: number) {
		if (!this.active) return;

		console.log(this.name, this.transform);
		this.ctx.translate(this.transform.x * scale, this.transform.y * scale);
		if (this.transform.angle !== 0) this.ctx.rotate(this.transform.angle);
		if (this.transform.alpha < 1) this.ctx.globalAlpha = this.transform.alpha;

		this.components.forEach((el) => el.render(scale * this.transform.scale, alpha * this.transform.alpha));
		this.childrens.sort((a: IEntity, b: IEntity) => a.transform.z > b.transform.z ? 1 : -1);
		this.childrens.forEach((el) => el.render(scale * this.transform.scale, alpha * this.transform.alpha));

		if (this.transform.alpha < 1) this.ctx.globalAlpha = 1;
		if (this.transform.angle !== 0) this.ctx.rotate(-this.transform.angle);
		this.ctx.translate(-this.transform.x * scale, -this.transform.y * scale);
	}
}
