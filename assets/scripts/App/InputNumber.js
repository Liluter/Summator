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
		// Need to validate each input only number
		// =========================================
		// Need to separate inputMod from Input number
		// console.log("InputNumber class hookId:", this.hookId);
		const ancestorCont = e.target.closest(".input-container");
		// Generator.inputs.find((e) => e.id === this.hookId).mainVal = e.target.value;
		Generator.inputFinder(ancestorCont.id).mainVal = e.target.value;
		Generator.calculateResults();
		// // console.log("target val: ", e.target.value, "Items: ", Generator.inputs);
	}
	keyDownHandler(e) {
		if (
			("0123456789.".includes(e.key) && typeof +e.target.value === "number") ||
			e.key === "Backspace"
		) {
		} else {
			e.preventDefault();
		}
	}

	render() {
		// console.log("this.attribures", ...this.attributes);
		// console.log("InputNumber elem: ", this.value);
		this.elem = this.createComp("input", "input-num " + this.classes, [
			// { name: "placeholder", value: "set" },
			{ name: "inputmode", value: "numeric" },
			...this.attributes,
		]);
		this.elem.addEventListener("change", this.valueHandler.bind(this));
		// this.elem.addEventListener("input", this.inputHandler.bind(this));
		this.elem.addEventListener("keydown", this.keyDownHandler.bind(this));
	}
}
