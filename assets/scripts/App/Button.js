import { Component } from "./Component.js";

export class Button extends Component {
	constructor(hookId, classes, name, onclickFunc = () => {}) {
		super(hookId, false);
		this.classes = classes;
		this.name = name;
		this.onclickFunc = onclickFunc;
		this.elem;
		this.render();
	}
	render() {
		this.elem = this.createComp("button", this.classes);
		this.elem.textContent = this.name;
		this.elem.addEventListener("click", this.onclickFunc.bind(this));
	}
}
