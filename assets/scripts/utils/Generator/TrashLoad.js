import { Generator } from "../../App/Generator.js";

export function trashLoad() {
	const newTrash = JSON.parse(localStorage.getItem("trash"));
	!!localStorage.getItem("trash") ? (Generator.trash = newTrash) : null;
}
