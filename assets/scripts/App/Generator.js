import { Input } from "./Input.js";
import { InputItem } from "./InputItem.js";
import { OperationBtnInput } from "./OperationBtnInput.js";
import { OperatorModal } from "./OperatorModal.js";
import { InputNumber } from "./InputNumber.js";
import { SliderDelete } from "./SliderDelete.js";
import { SliderSwitch } from "./SliderSwitch.js";
import { SliderMod } from "./SliderMod.js";
import { SliderMenuClosed } from "./SliderMenuClosed.js";
import { SliderMenuOpen } from "./SliderMenuOpen.js";

export class Generator {
	static inputs = [];
	static trash = [];
	static oprMainBtn;
	//starting point id number not  use when loading from localStorageApi
	static id = 0;

	// TRASH SAVE FEATURE -->
	static inputsSave() {
		localStorage.setItem("inputs", JSON.stringify(this.inputs));
		// console.log("GENERATOR - INPUTS SAVED in LoacalStorageAPI ");
	}
	static inputsLoad() {
		const newInputs = JSON.parse(localStorage.getItem("inputs"));
		// const newActualInputs = localStorage.getItem("inputs");
		!!localStorage.getItem("inputs") ? (Generator.inputs = newInputs) : null;

		// console.log("GENERATOR - Inputs LOADED successfully");
	}

	static trashSave() {
		localStorage.setItem("trash", JSON.stringify(this.trash));
		// console.log("GENERATOR - TRASH SAVED in LoacalStorageAPI ");
	}
	static trashLoad() {
		const newTrash = JSON.parse(localStorage.getItem("trash"));
		!!localStorage.getItem("trash") ? (Generator.trash = newTrash) : null;
		// console.log("GENERATOR - TRASH LOADED in LoacalStorageAPI ");
	}

	// <-- TRASH SAVE FEATURE

	// LOAD HISTORY FROM LOCALSTORAGE
	// Need to recrate every Main Input element as in store.
	// Rebuild class components in Generator.addInput method to have abilyty to render from params and default params. Not just like that.
	static loadHistory() {
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
	//

	// THEME CHANGE FEATURE -->
	static cssVaribles = [
		"--operation-btn-second",
		"--header-btn-backG",
		"--input-main-bckg",
		"--operator-modal-backG",
	];

	static themeSwatchTitles = [
		"Operation Button",
		"Main Button",
		"Modal Background",
		"Popup Background",
	];

	// static themeDefault = {
	//   default: ["#6adb35", "#FFC165", "#ADADAD","#204a87"],
	//   option: ["#edd400", "#e45555", "#d3d7cf","#ce5c00"],
	//   custom: ["#3d18c1", "#d15f96", "#592e61","#b273cf"],
	//   contrast: ["#3d18c1", "#d15f96", "#592e61","#b273cf"],
	// };

	static theme = {
		default: ["#6adb35", "#FFC165", "#e2e0da", "#204a87"],
		option: ["#edd400", "#e45555", "#d3d7cf", "#ce5c00"],
		custom: ["#d2b974", "#c54d26", "#8d6553", "#ab5b30"],
		contrast: ["#3d18c1", "#d15f96", "#592e61", "#b273cf"],
	};

	static actualTheme = "default";

	static themeSave() {
		localStorage.setItem("theme", JSON.stringify(this.theme));

		console.log("GENERATOR - LOCAL THEME SAVED ");
	}

	static themeLoad() {
		const newTheme = JSON.parse(localStorage.getItem("theme"));
		const newActualTheme = localStorage.getItem("actualTheme");
		!!localStorage.getItem("theme") ? (Generator.theme = newTheme) : null;

		!!localStorage.getItem("actualTheme")
			? (Generator.actualTheme = newActualTheme)
			: null;

		Generator.themeApply();

		// console.log("GENERATOR - Theme loadad successfully");
	}

	static themeApply(passedTheme) {
		!!passedTheme ? (this.actualTheme = passedTheme) : null;

		localStorage.setItem("actualTheme", this.actualTheme);

		this.cssVaribles.forEach((varible, idx) =>
			document.documentElement.style.setProperty(
				varible,
				this.theme[this.actualTheme][idx]
			)
		);

		// console.log(`THEME "${this.actualTheme}" APPLIED`);
	}
	//  <--THEME CHANGE FEATURE

	static inputFinder(searchedID) {
		return this.inputs.find((e) => e.id === searchedID);
	}

	static inputRemover(containerID) {
		const toRemEleIdx = this.inputs.indexOf(
			this.inputs.find((e) => e.id === containerID)
		);
		this.trash.push(...this.inputs.splice(toRemEleIdx, 1));
		// Save Actual Stateto localStoreAPI trash and inputs
		Generator.inputsSave();
		Generator.trashSave();
	}

	static calculateResults() {
		const resultInput = document.getElementById("resultInput");
		let counter = 0;
		let modifier = 0;
		for (const element of this.inputs) {
			if (element.switcher) {
				modifier = +element.mainVal;

				switch (element.modOperator) {
					case "+":
						modifier += +element.modValue;
						break;
					case "-":
						modifier -= +element.modValue;
						break;
					case "x":
						modifier *= +element.modValue;
						break;
					case "/":
						modifier /= +element.modValue;
						break;
					case "%":
						modifier *= +element.modValue / 100;
						break;
				}

				switch (element.mainOperator) {
					case "+":
						counter += modifier;
						break;
					case "-":
						counter -= modifier;
						break;
					case "x":
						counter *= modifier;
						break;
					case "/":
						counter /= modifier;
						break;
					case "%":
						counter *= modifier / 100;
						break;
				}

				// console.log("Counter", counter);
			}
		}

		resultInput.value = counter.toFixed(2);

		Generator.inputsSave();
		return counter;
	}

	static addInput(historyInput, toTrash = false) {
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
		this.oprMainBtn = new OperationBtnInput(
			mainInputId,
			!!historyInput ? historyInput.mainOperator : "+"
		);
		this.oprMainBtn.elem.addEventListener("click", (e) => {
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
			!!historyInput && historyInput.modValue != 0
				? "modified"
				: "modified hide",
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
}
