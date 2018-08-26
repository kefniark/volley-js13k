import { IScene } from '../interfaces/IScene';
import { Component } from './component';

export class Text extends Component {
	public text: string;
	constructor(s: IScene, text: string) {
		super(s);
		this.text = text;
	}

	public render(a: number) {
		super.render(a);
		this.s.ctx.font = 'bold 30px impact';
		this.s.ctx.fillStyle = 'white';
		this.s.ctx.textAlign = 'center';
		this.s.ctx.fillText(this.text, 0, 0);
	}
}
