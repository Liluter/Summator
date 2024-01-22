import { Component } from "./Component.js";

export class OperationBtnInput extends Component {
	constructor(hookId, operator) {
		super(hookId, false);
		this.operator = operator;
		this.elem;
		this.render();
	}

	render() {
		this.elem = this.createComp("button", "operation-btn ");
		this.elem.innerHTML = this.operator;
		this.elem.addEventListener("click", (e) => {
			e.target.nextSibling.classList.toggle("hide");
		});
	}
}
