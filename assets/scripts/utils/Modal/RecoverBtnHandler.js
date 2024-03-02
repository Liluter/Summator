import { Generator } from "../../App/Generator.js";
import { disappear } from "../Disappear.js";

export function recoverBtnHandler() {
	const liItems = Array.from(trashForm.children).filter(
		(child) => child.tagName == "LI"
	);

	const newArr = liItems.map((item, idx) => {
		if (item.children[0].checked === true) {
			let bufforItem = Generator.trash[idx];
			if (Generator.inputs.length > 0) {
				bufforItem.id =
					"Input-cont-" +
					(+Generator.inputs[Generator.inputs.length - 1].id.slice(11) + 1);
			} else {
				bufforItem.id = "Input-cont-" + 1;
			}
			Generator.inputs.push(bufforItem);
			Generator.addInput(bufforItem);
			Generator.inputsSave();
			disappear(item);
			return null;
		} else {
			return Generator.trash[idx];
		}
	});

	const newArrFiltered = newArr.filter((el) => (el != null ? true : false));
	Generator.trash = newArrFiltered;
	Generator.trashSave();
}
