import { Input } from "../../App/Input.js";
import { InputItem } from "../../App/InputItem.js";
import { OperationBtnInput } from "../../App/OperationBtnInput.js";
import { OperatorModal } from "../../App/OperatorModal.js";
import { InputNumber } from "../../App/InputNumber.js";
import { SliderDelete } from "../../App/SliderDelete.js";
import { SliderSwitch } from "../../App/SliderSwitch.js";
import { SliderMod } from "../../App/SliderMod.js";
import { SliderMenuClosed } from "../../App/SliderMenuClosed.js";
import { SliderMenuOpen } from "../../App/SliderMenuOpen.js";
import { Generator } from "../../App/Generator.js";
import { mainOperationBtnHandler } from "../MainOperationBtnHandler.js";
import { modalOperationBtnHandler } from "../ModalOperationBtnHandler.js";

export function addInput(historyInput, toTrash = false) {
	let id;
	if (!toTrash) {
		if (!!historyInput) {
			id = +historyInput.id.slice(11);
		} else if (Generator.inputs.length) {
			id = Generator.inputs.length + 1;
		} else {
			id = 1;
		}
	} else {
		id = document.getElementById("trashForm").children.length;
	}

	const smallContId = `Input-cont-${!toTrash ? "" : "trash-"}` + id;
	const mainInputId = `InputMain-${!toTrash ? "" : "trash-"}` + id;
	const sliderMenuId = `SliderMenu-${!toTrash ? "" : "trash-"}` + id;
	const sliderMenuOpen = `SliderMenuOpen-${!toTrash ? "" : "trash-"}` + id;
	const sliderMod = `SliderMod-${!toTrash ? "" : "trash-"}` + id;
	const sliderSwitch = `SliderSwitch-${!toTrash ? "" : "trash-"}` + id;
	const sliderDelete = `SliderDelete-${!toTrash ? "" : "trash-"}` + id;
	const operModId = `OperMod-${!toTrash ? "" : "trash-"}` + id;

	if (!toTrash) {
		!!historyInput ? null : this.inputs.push(new Input(smallContId));
	}

	if (!toTrash) {
		new InputItem("main-container", "input-container", [
			{ name: "id", value: smallContId },
		]);
	} else {
		const trashForm = document.getElementById("trashForm");
		new InputItem(`${trashForm.lastChild.id}`, "input-container", [
			{ name: "id", value: smallContId },
		]);
	}
	new InputItem(smallContId, "input-main", [
		{ name: "id", value: mainInputId },
	]);

	const oprBtnInput = new OperationBtnInput(
		mainInputId,
		!!historyInput ? historyInput.mainOperator : "+",
		"",
		null,
		mainOperationBtnHandler
	);
	// oprBtnInput.elem.addEventListener("click", mainOperationBtnHandler);
	new OperatorModal(mainInputId, [{ name: "id", value: operModId }]);

	new InputNumber(
		mainInputId,
		"",
		!!historyInput
			? [{ name: "value", value: historyInput.mainVal }]
			: [{ name: "value", value: "" }]
	);

	new OperationBtnInput(
		mainInputId,
		!!historyInput ? historyInput.modOperator : "+",
		!!historyInput && historyInput.modValue != 0 ? "smaller" : "smaller hide",
		null,
		modalOperationBtnHandler
	);

	new InputNumber(
		mainInputId,
		!!historyInput && historyInput.modValue != 0 ? "modified" : "modified hide",
		!!historyInput
			? [
					{ name: "value", value: historyInput.modValue },
					{ name: "readonly", value: "" },
			  ]
			: [{ name: "readonly", value: "" }]
	);

	new SliderMenuClosed(smallContId, [{ name: "id", value: sliderMenuId }]);
	new SliderMenuOpen(smallContId, [{ name: "id", value: sliderMenuOpen }]);
	new SliderMod(
		smallContId,
		[{ name: "id", value: sliderMod }],
		!!historyInput ? historyInput.modValue : "",
		toTrash
	);
	new SliderSwitch(
		smallContId,
		[{ name: "id", value: sliderSwitch }],
		!!historyInput ? historyInput.switcher : true
	);
	new SliderDelete(smallContId, [{ name: "id", value: sliderDelete }]);
}
