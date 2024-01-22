import { Generator } from "../../App/Generator.js";

export function inputFinder(searchedID) {
	return Generator.inputs.find((e) => e.id === searchedID);
}
