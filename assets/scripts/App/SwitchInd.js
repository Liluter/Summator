import { Component } from "./Component.js";

export class SwitchInd extends Component {
	constructor(hookId, classes, attr) {
		super(hookId, false);
		this.attr = attr;
		this.classes = classes;
		this.elem;
		this.render();
	}

	switchHandler(e) {
		e.target.classList.toggle("off");
	}

	render() {
		this.elem = this.createComp("button", this.classes, this.attr);
	}
}
