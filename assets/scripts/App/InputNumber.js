import { Component } from "./Component.js";

import { Generator } from "./Generator.js";

export class InputNumber extends Component {
	constructor(hookId, classes = "", attributes = []) {
		super(hookId, false);
		this.classes = classes;
		this.attributes = attributes;
		this.classes = classes;
		this.attributes = attributes;
		this.elem;
		this.render();
	}

	valueHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		Generator.inputFinder(ancestorCont.id).mainVal = e.target.value;
		Generator.calculateResults();
	}
	keyDownHandler(e) {
		if (
			("0123456789.".includes(e.key) &&
				typeof +e.target.value === "number" &&
				!isNaN(Number(e.target.value + e.key))) ||
			e.key === "Backspace" ||
			e.key === "Enter"
		) {
		} else {
			e.preventDefault();
		}
	}

	render() {
		this.elem = this.createComp("input", "input-num " + this.classes, [
			{ name: "inputmode", value: "numeric" },
			...this.attributes,
		]);
		this.elem.addEventListener("change", this.valueHandler.bind(this));
		this.elem.addEventListener("keydown", this.keyDownHandler.bind(this));
	}
}
