import { Component } from '../components/component';
import { Sprite } from '../components/sprite';
import { IEntity } from '../interfaces/IEntity';
import { IScene } from '../interfaces/IScene';
import { ITransform, ITransformOptions } from '../interfaces/ITransform';

export class Entity extends Component implements IEntity {
	public readonly t = {
		x: 0,
		y: 0,
		z: 0,
		r: 0,
		s: 1,
		a: 1,
		set(o?: ITransformOptions) {
			if (!o) return;
			if (o.x) this.x = o.x;
			if (o.y) this.y = o.y;
			if (o.z) this.z = o.z;
			if (o.s) this.s = o.s;
			if (o.a) this.a = o.a;
			if (o.r) this.r = o.r;
		}
	} as ITransform;
	public readonly c: Component[] = [];
	public readonly childrens: IEntity[] = [];

	constructor(s: IScene) {
		super(s);
		this.active = true;
		this.s = s;
	}

	public add(component: Component) {
		component.e = this;
		this.c.push(component);
	}

	public update(time: number, dt: number) {
		if (!this.active) return;
		this.c.forEach((el) => el.update(time, dt));
		this.childrens.forEach((el) => el.update(time, dt));
	}

	public instSprite(path: string, options?: ITransformOptions, x: number = 0, y: number = 0): IEntity {
		const entity = new Entity(this.s);
		entity.t.set(options);
		const sprite = new Sprite(this.s, path, x, y);
		entity.add(sprite);
		this.childrens.push(entity);
		return entity;
	}

	public instEntity(options?: ITransformOptions): Entity {
		const entity = new Entity(this.s);
		entity.t.set(options);
		this.childrens.push(entity);
		return entity;
	}

	public render(b: number) {
		if (!this.active) return;

		const a = b * this.t.a;

		this.s.ctx.translate(this.t.x, this.t.y);
		if (this.t.r !== 0) this.s.ctx.rotate(this.t.r);
		if (this.t.s !== 1) this.s.ctx.scale(this.t.s, this.t.s);
		if (this.t.a < 1) this.s.ctx.globalAlpha = a;

		this.c.forEach((el) => el.render(a));
		this.childrens.sort((e1: IEntity, e2: IEntity) => e1.t.z > e2.t.z ? 1 : -1);
		this.childrens.forEach((el) => el.render(a));

		if (this.t.a < 1) this.s.ctx.globalAlpha = 1;
		if (this.t.s !== 1) this.s.ctx.scale(1 / this.t.s, 1 / this.t.s);
		if (this.t.r !== 0) this.s.ctx.rotate(-this.t.r);
		this.s.ctx.translate(-this.t.x, -this.t.y);
	}
}
