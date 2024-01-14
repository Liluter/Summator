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
	//add handler
	// create hiding element after clicking outside element
	oprBtnHandler(e) {
		e.target.nextElementSibling.nextElementSibling.classList.toggle("hide");
	}

	modInputHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		const modIndicator = ancestorCont.children[1].children[0];
		const operatonModified = ancestorCont.children[0].children[3];
		const inputNumModified = ancestorCont.children[0].children[4];
		const actualModOperator = Generator.inputFinder(
			ancestorCont.id
		).modOperator;
		console.log("Actual Mod Oprt ", actualModOperator);
		if (e.target.value) {
			console.log("test");
			modIndicator.classList.remove("off");
			inputNumModified.value = e.target.value;
			inputNumModified.classList.remove("hide");
			operatonModified.classList.remove("hide");
		} else if (actualModOperator !== "+") {
			console.log("operator not default");
			modIndicator.classList.remove("off");
			inputNumModified.value = e.target.value;
			inputNumModified.classList.add("hide");
			operatonModified.classList.add("hide");
			operatonModified.innerHTML = Generator.inputFinder(
				ancestorCont.id
			).modOperator;
		} else {
			modIndicator.classList.add("off");
			inputNumModified.classList.add("hide");
			operatonModified.classList.add("hide");
			//switching operator to default
			Generator.inputFinder(ancestorCont.id).modOperator = "+";
			operatonModified.innerHTML = Generator.inputFinder(
				ancestorCont.id
			).modOperator;
		}
		// show value in modified input handler
	}

	render() {
		const elem = this.createComp("div", "slider-mod hide", this.attr);
		const smallOprBtn = new OperationBtnInput(elem.id, "+", "smaller");
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

		// create modifiedInput in InputMain but show only if Value is present.

		smallOprBtn.elem.addEventListener("click", this.oprBtnHandler.bind(this));
		modInput.elem.addEventListener("input", this.modInputHandler.bind(this));
		// fix handler
		// elem.parentElement.parentElement.parentElement.addEventListener('click', (e)=>console.log('clickParent', e.target.id), false);
	}
}
