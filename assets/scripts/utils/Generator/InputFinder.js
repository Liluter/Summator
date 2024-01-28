import { Generator } from "../../App/Generator.js";

export function inputFinder(searchedID, where = "inputs") {
	if (where === "inputs") {
		return Generator.inputs.find((e) => e.id === searchedID);
	} else if (where === "trash") {
		return Generator.trash.find(
			(e) => e.id === searchedID.substring(0, 10) + searchedID.substring(16)
		);
	}
}
