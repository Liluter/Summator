import { InputNumber } from "./InputNumber.js";
import { Generator } from "./Generator.js";

export class InputNumberMod extends InputNumber {
	constructor(hookId, classes = "", attributes = []) {
		super(hookId, classes, attributes);
		this.classes = classes;
		this.attributes = attributes;
		// this.render(); // not nessesary it inherits form InputNumber
	}
	valueHandler(e) {
		// // Need to validate each input only number
		// // =========================================
		// // Need to separate inputMod from Input number
		// // console.log("InputNumber class hookId:", this.hookId);
		const ancestorCont = e.target.closest(".input-container");
		// Generator.inputs.find((e) => e.id === this.hookId).mainVal = e.target.value;
		Generator.inputFinder(ancestorCont.id).modValue = e.target.value;
		Generator.calculateResults();
		// console.log("target val: ", e.target.value, "Items: ", Generator.inputs);

		console.log("Value changed", e.target);
	}
}
