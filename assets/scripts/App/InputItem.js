import { Component } from "./Component.js";

export class InputItem extends Component {
	constructor(hookId, classes, attr) {
		super(hookId, false);
		this.classes = classes;
		this.attr = attr;
		this.render();
		this.elem;
	}

	render() {
		this.elem = this.createComp("div", this.classes, this.attr);
	}
}
