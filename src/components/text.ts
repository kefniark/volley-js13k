import { Component } from './component';

export class Text extends Component {
	public text: string;
	constructor(ctx: CanvasRenderingContext2D, text: string) {
		super(ctx);
		this.text = text;
	}

	public render(a: number) {
		super.render(a);
		this.ctx.font = 'bold 30px impact';
		this.ctx.fillStyle = 'white';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.text, 0, 0);
	}
}
