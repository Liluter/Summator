import { Component } from "./Component.js";
import { Generator } from "./Generator.js";
import { OperationBtnInput } from "./OperationBtnInput.js";

export class OperatorModal extends Component {
	operators = ["+", "-", "x", "/", "%"];
	buttons = [];

	constructor(hookId, attr, classes = "") {
		super(hookId, false);
		this.attr = attr;
		this.classes = classes;
		this.elem;
		this.render();
	}
	operatorHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		e.target.parentElement.classList.toggle("hide");
		Generator.inputFinder(ancestorCont.id).mainOperator = e.target.innerHTML;
		e.target.parentElement.previousElementSibling.innerHTML =
			e.target.innerHTML;
		Generator.calculateResults();
		Generator.inputsSave();
	}

	render() {
		this.elem = this.createComp(
			"div",
			"operator-modal hide " + this.classes,
			this.attr
		);

		for (const operator of this.operators) {
			this.buttons.push(
				new OperationBtnInput(
					this.elem.id,
					operator,
					this.classes,
					null,
					this.operatorHandler.bind(this)
				)
			);
		}
	}
}
