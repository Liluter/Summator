import { InputNumber } from "./InputNumber.js";
import { Generator } from "./Generator.js";

export class InputNumberMod extends InputNumber {
	constructor(hookId, classes = "", attributes = []) {
		super(hookId, classes, attributes);
		this.classes = classes;
		this.attributes = attributes;
	}
	valueHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		Generator.inputFinder(ancestorCont.id).modValue = e.target.value;
		Generator.calculateResults();
	}
}
