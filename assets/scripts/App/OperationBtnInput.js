import { Component } from "./Component.js";

export class OperationBtnInput extends Component {
	constructor(hookId, operator, classes = "", attr) {
		super(hookId, false);
		this.operator = operator;
		this.classes = classes;
		this.attr = attr;
		this.render();
		this.elem;
	}

	render() {
		this.elem = this.createComp("button", "operation-btn " + this.classes);
		this.elem.innerHTML = this.operator;
		this.elem.addEventListener("click", (e) => {
			e.target.nextSibling.classList.toggle("hide");
		});
	}
}
