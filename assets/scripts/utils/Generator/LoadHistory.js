import { Generator } from "../../App/Generator.js";

export function loadHistory() {
	Generator.inputsLoad();
	// console.log("GENERATOR - History load");
	// this.addInput(Generator.inputs[0])
	!!Generator.inputs.length
		? Generator.inputs.forEach((elem) => {
				this.addInput(elem);
		  })
		: console.log("GENERATOR - no inputs");
	// Generator.inputs.forEach((elem)=>this.addInput(elem));
	Generator.calculateResults();
}
