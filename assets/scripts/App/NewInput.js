import { Component } from "./Component.js";
import { Generator } from "./Generator.js";

export class NewInput extends Component {
	constructor(hookId, operator) {
		super(hookId, false);
		this.operator = operator;
		this.render();
	}

	createNewInput() {
		Generator.addInput();
		Generator.inputsSave();
	}

	render() {
		const startOpr = this.createComp("button", "operation-btn bigger");
		startOpr.innerHTML = this.operator;
		startOpr.addEventListener("click", this.createNewInput.bind(this));
	}
}
