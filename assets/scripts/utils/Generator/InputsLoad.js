import { Generator } from "../../App/Generator.js";

export function inputsLoad() {
	const newInputs = JSON.parse(localStorage.getItem("inputs"));
	!!localStorage.getItem("inputs") ? (Generator.inputs = newInputs) : null;
}
