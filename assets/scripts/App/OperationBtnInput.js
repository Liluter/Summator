import { Component } from "./Component.js";

export class OperationBtnInput extends Component {
	constructor(hookId, operator, classes = "", attr, clickHandler) {
		super(hookId, false);
		this.operator = operator;
		this.classes = classes;
		this.attr = attr;
		this.elem;
		this.clickHandler = clickHandler;
		this.render();
	}

	render() {
		this.elem = this.createComp(
			"button",
			"operation-btn " + this.classes,
			this.attr
		);
		this.elem.textContent = this.operator;
		this.clickHandler && this.elem.addEventListener("click", this.clickHandler);
	}
}
