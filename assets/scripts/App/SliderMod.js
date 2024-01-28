import { Component } from "./Component.js";
import { Generator } from "./Generator.js";
import { InputNumberMod } from "./InputNumberMod.js";
import { OperationBtnInput } from "./OperationBtnInput.js";
import { OperatorModalSmall } from "./OperatorModalSmall.js";

export class SliderMod extends Component {
	constructor(hookId, attr, inputValue) {
		super(hookId, false);
		this.attr = attr;
		this.inputValue = inputValue;
		this.render();
	}
	oprBtnHandler(e) {
		e.target.nextElementSibling.nextElementSibling.classList.toggle("hide");
	}
	modInputHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		const modIndicator = ancestorCont.children[1].children[0];
		const operatorModified = ancestorCont.children[0].children[3];
		const inputNumModified = ancestorCont.children[0].children[4];
		const actualModOperator = Generator.inputFinder(
			ancestorCont.id
		).modOperator;
		if (e.target.value) {
			modIndicator.classList.remove("off");
			inputNumModified.value = e.target.value;
			inputNumModified.classList.remove("hide");
			operatorModified.classList.remove("hide");
		} else if (actualModOperator !== "+" && e.target.value) {
			// modIndicator.classList.remove("off");
			inputNumModified.value = e.target.value;
			// inputNumModified.classList.add("hide");
			// operatorModified.classList.add("hide");
			operatorModified.innerHTML = Generator.inputFinder(
				ancestorCont.id
			).modOperator;
		} else {
			modIndicator.classList.add("off");
			inputNumModified.classList.add("hide");
			operatorModified.classList.add("hide");

			// Generator.inputFinder(ancestorCont.id).modOperator = "+";
			operatorModified.innerHTML = Generator.inputFinder(
				ancestorCont.id
			).modOperator;
		}
	}

	render() {
		const ancestorCont = document.getElementById(this.hookId);
		const elem = this.createComp("div", "slider-mod hide", this.attr);
		const smallOprBtn = new OperationBtnInput(
			elem.id,
			!Generator.inputFinder(ancestorCont.id)
				? Generator.inputFinder(ancestorCont.id, "trash").modOperator
				: Generator.inputFinder(ancestorCont.id).modOperator,
			"smaller"
		);
		const modInput = new InputNumberMod(elem.id, "", [
			{ name: "value", value: this.inputValue },
		]);
		const operatsMod = new OperatorModalSmall(
			elem.id,
			[
				{
					name: "id",
					value: "OprModSmall-" + this.hookId[this.hookId.length - 1],
				},
			],
			"smaller"
		);

		smallOprBtn.elem.addEventListener("click", this.oprBtnHandler.bind(this));
		modInput.elem.addEventListener("input", this.modInputHandler.bind(this));
	}
}
