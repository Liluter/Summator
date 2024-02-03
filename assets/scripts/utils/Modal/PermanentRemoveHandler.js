import { Generator } from "../../App/Generator.js";
import { disappear } from "../Disappear.js";

export function permanentRemoveHandler(e) {
	const liItems = Array.from(trashForm.children).filter(
		(child) => child.tagName == "LI"
	);
	const newArr = liItems.map((item, idx) => {
		if (item.children[0].checked === true) {
			disappear(item);
			return null;
		} else {
			return Generator.trash[idx];
		}
	});

	const newArrFiltered = newArr.filter((el) => (el != null ? true : false));
	Generator.trash = newArrFiltered;
	Generator.trashSave();
	e.preventDefault();
}
