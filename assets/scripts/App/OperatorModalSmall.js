import { OperatorModal } from "./OperatorModal.js";
import { Generator } from "./Generator.js";

export class OperatorModalSmall extends OperatorModal {
	operatorHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		const modIndicator = ancestorCont.children[1].children[0];
		const operatonModified = ancestorCont.children[0].children[3];
		const operatorBtnsmall =
			e.target.parentElement.previousElementSibling.previousElementSibling;
		e.target.parentElement.classList.toggle("hide");
		const modValue = Generator.inputFinder(ancestorCont.id).modValue;

		if ((e.target.innerHTML !== "+" && !modValue) || modValue) {
			modIndicator.classList.remove("off");
		} else {
			modIndicator.classList.add("off");
		}
		Generator.inputFinder(ancestorCont.id).modOperator = e.target.innerHTML;
		operatorBtnsmall.innerHTML = e.target.innerHTML;

		operatonModified.innerHTML = e.target.innerHTML;

		Generator.calculateResults();
	}
}
