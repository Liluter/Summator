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

export function addInput(historyInput, toTrash = false) {
	// Create Input-main element for now without params, will change.
	// console.log("historyInput : ", historyInput);
	// !!historyInput
	// 	? console.log(historyInput.id[historyInput.id.length - 1])
	// 	: null;
	let id;
	if (!toTrash) {
		if (!!historyInput) {
			id = +historyInput.id[historyInput.id.length - 1];
		} else if (Generator.inputs.length) {
			id = +Generator.inputs[Generator.inputs.length - 1].id.slice(11) + 1;
		} else {
			id = 1;
		}
	} else {
		// if (historyInput) {
		// 	id = +historyInput.id[historyInput.id.length - 1];
		// } else if (Generator.trash.length) {
		// 	id = +Generator.trash[Generator.trash.length - 1].id.slice(11) + 1;
		// } else {
		// 	id = 1;
		// }
		id = document.getElementById("trashForm").children.length;
	}
	//(+Generator.inputs[Generator.inputs.length-1].id.slice(11)+1)
	// change when historyInput exist and new one is create

	//====================================
	const smallContId = `Input-cont-${!toTrash ? "" : "trash-"}` + id;
	//====================================
	const mainInputId = `InputMain-${!toTrash ? "" : "trash-"}` + id;

	const sliderMenuId = `SliderMenu-${!toTrash ? "" : "trash-"}` + id;
	const sliderMenuOpen = `SliderMenuOpen-${!toTrash ? "" : "trash-"}` + id;
	const sliderMod = `SliderMod-${!toTrash ? "" : "trash-"}` + id;
	const sliderSwitch = `SliderSwitch-${!toTrash ? "" : "trash-"}` + id;
	const sliderDelete = `SliderDelete-${!toTrash ? "" : "trash-"}` + id;
	const operModId = `OperMod-${!toTrash ? "" : "trash-"}` + id;

	// this.inputs.push(new Input(smallContId));
	if (!toTrash) {
		!!historyInput ? null : this.inputs.push(new Input(smallContId));
	}

	// was mainInputId
	// Input Item container creation with current id
	if (!toTrash) {
		new InputItem("container", "input-container", [
			{ name: "id", value: smallContId },
		]);
		// console.log("Test:", Generator.inputs[id - 1]);
	} else {
		// console.log(
		// 	"last child :",
		// 	document.getElementById("trashForm").lastChild
		// );
		new InputItem(
			`${document.getElementById("trashForm").lastChild.id}`,
			"input-container",
			[{ name: "id", value: smallContId }]
		);
	}
	//==============================
	// input-container childrens
	new InputItem(smallContId, "input-main", [
		{ name: "id", value: mainInputId },
	]);
	//input-main children
	//==============================
	const oprMainBtn = new OperationBtnInput(
		mainInputId,
		!!historyInput ? historyInput.mainOperator : "+"
	);
	oprMainBtn.elem.addEventListener("click", (e) => {
		e.target.nextSibling.classList.toggle("hide");
	});
	new OperatorModal(mainInputId, [{ name: "id", value: operModId }]);

	new InputNumber(
		mainInputId,
		"",
		!!historyInput
			? [{ name: "value", value: historyInput.mainVal }]
			: [{ name: "value", value: 0 }]
	);

	// new OperationBtnInput(mainInputId, "+", "smaller hide");
	new OperationBtnInput(
		mainInputId,
		!!historyInput ? historyInput.modOperator : "+",
		!!historyInput && historyInput.modValue != 0 ? "smaller" : "smaller hide"
	);

	//modified inputNumber with value from SliderMod manipulation. readonly
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

	//==============================

	new SliderMenuClosed(smallContId, [{ name: "id", value: sliderMenuId }]);

	new SliderMenuOpen(smallContId, [{ name: "id", value: sliderMenuOpen }]);
	//Slider mod open
	new SliderMod(
		smallContId,
		[{ name: "id", value: sliderMod }],
		!!historyInput ? +historyInput.modValue : 0
	);

	//Slider Switch open
	new SliderSwitch(
		smallContId,
		[{ name: "id", value: sliderSwitch }],
		!!historyInput ? historyInput.switcher : true
	);
	//Slider delete open
	new SliderDelete(smallContId, [{ name: "id", value: sliderDelete }]);
}
