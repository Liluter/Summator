import { Generator } from "../../App/Generator.js";

export function inputRemover(containerID) {
	const toRemEleIdx = Generator.inputs.indexOf(
		Generator.inputs.find((e) => e.id === containerID)
	);
	Generator.trash.push(...Generator.inputs.splice(toRemEleIdx, 1));
	// Save Actual Stateto localStoreAPI trash and inputs
	Generator.inputsSave();
	Generator.trashSave();
}
