import { Component } from '../components/component';
import { Sprite } from '../components/sprite';
import { ITransformOptions, Transform } from '../components/transform';
import { IComponent } from '../interfaces/IComponent';
import { IEntity } from '../interfaces/IEntity';

export class Entity extends Component implements IEntity {
	public t: Transform;
	public c: IComponent[] = [];
	private childrens: IEntity[] = [];

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.active = true;
		this.t = new Transform();
	}

	public get<T extends Component>(t: string): T | undefined {
		for (const c of this.c) {
			if (typeof(c) === t) {
				return c as T;
			}
		}
		return undefined;
	}

	public add(component: IComponent) {
		component.e = this;
		this.c.push(component);
	}

	public del(component: IComponent) {
		component.e = undefined;
		const index = this.c.indexOf(component);
		if (index !== -1) {
			this.c.splice(index, 1);
		}
	}

	public addChild(entity: IEntity) {
		this.childrens.push(entity);
	}

	public delChild(entity: IEntity) {
		const index = this.childrens.indexOf(entity);
		if (index !== -1) {
			this.childrens.splice(index, 1);
		}
	}

	public update(time: number, dt: number) {
		if (!this.active) return;
		this.c.forEach((el) => el.update(time, dt));
		this.childrens.forEach((el) => el.update(time, dt));
	}

	public instSprite(path: string, options?: ITransformOptions, x: number = 0, y: number = 0): IEntity {
		const entity = new Entity(this.ctx);
		entity.t.set(options);
		const sprite = new Sprite(this.ctx, path, x, y);
		entity.add(sprite);
		this.addChild(entity);
		return entity;
	}

	public instEntity(options?: ITransformOptions): Entity {
		const entity = new Entity(this.ctx);
		entity.t.set(options);
		this.addChild(entity);
		return entity;
	}

	public render(alpha: number) {
		if (!this.active) return;

		const a = alpha * this.t.alpha;

		this.ctx.translate(this.t.x, this.t.y);
		if (this.t.angle !== 0) this.ctx.rotate(this.t.angle);
		if (this.t.scale !== 1) this.ctx.scale(this.t.scale, this.t.scale);
		if (this.t.alpha < 1) this.ctx.globalAlpha = a;

		this.c.forEach((el) => el.render(a));
		this.childrens.sort((e1: IEntity, e2: IEntity) => e1.t.z > e2.t.z ? 1 : -1);
		this.childrens.forEach((el) => el.render(a));

		if (this.t.alpha < 1) this.ctx.globalAlpha = 1;
		if (this.t.scale !== 1) this.ctx.scale(1 / this.t.scale, 1 / this.t.scale);
		if (this.t.angle !== 0) this.ctx.rotate(-this.t.angle);
		this.ctx.translate(-this.t.x, -this.t.y);
	}
}
