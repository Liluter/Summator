import { Generator } from "../../App/Generator.js";

export function loadHistory() {
	Generator.inputsLoad();
	if (!!Generator.inputs.length) {
		Generator.inputs.forEach((elem) => {
			this.addInput(elem);
		});
	}
	Generator.calculateResults();
}
