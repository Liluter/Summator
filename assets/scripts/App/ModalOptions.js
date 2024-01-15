import { Component } from "./Component.js";
import { Button } from "./Button.js";
import { Generator } from "./Generator.js";
import { TrashItem } from "./TrashItem.js";
import { ThemeItem } from "./ThemeItem.js";
import { disappear } from "../utils/Disappear.js";

export class ModalOptions extends Component {
	constructor(hookId) {
		super(hookId, false);
		this.elem;
		this.render();
		this.disappear = disappear;
	}

	cleanView() {
		while (this.elem.children[1]) {
			this.elem.children[1].remove();
		}
	}

	// disappear(ele) {
	// 	ele.classList.add("disappera");
	// 	const timeout = setTimeout(() => {
	// 		ele.remove();
	// 	}, 200);
	// }
	// test() {
	//   console.log('Testing digital audio... :)')
	// }

	render() {
		this.elem = this.createComp("div", "options-modal hide", [
			{ name: "id", value: "options-modal" },
			// { name: "popover", value: "auto" },
		]);

		this.elem.addEventListener("closeOptionModal", (e) => {
			// console.log("MODAL LOAD", e.detail);
			this.cleanView();
		});

		const modalHeader = document.createElement("header");
		modalHeader.id = "modalHeader";
		this.elem.append(modalHeader);

		// TRASH BUTTON

		const trashBtn = new Button(modalHeader.id, "uniBtn", "Trash", (e) => {
			this.cleanView();

			const trashForm = document.createElement("form");
			const trashFooter = document.createElement("footer");
			this.elem.append(trashForm);
			this.elem.append(trashFooter);
			// trashForm.id="trashForm"
			trashForm.id = "trashForm";
			trashFooter.id = "trashFooter";

			// Trash Items generator
			if (Generator.trash.length > 0) {
				let counter = 1;
				for (let trashItem of Generator.trash) {
					console.log("Trash Item ... : ", trashItem, counter);

					new TrashItem(
						trashForm.id,
						"trash-item",
						trashItem.mainVal,
						JSON.stringify(trashItem),
						counter++
					);
				}
			} else {
				const message = document.createElement("p");
				message.classList.add("message");
				message.textContent = "Empty Trash";
				trashForm.append(message);
			}
			// Permanent Remove
			const permanentRemove = new Button(
				trashFooter.id,
				"uniBtn",
				"Remove",
				(e) => {
					console.log("Remove");
					console.log("children", trashForm.children);
					const liItems = Array.from(trashForm.children).filter(
						(child) => child.tagName == "LI"
					);
					console.log(liItems);
					const newArr = liItems.map((item, idx) => {
						if (item.children[0].checked === true) {
							this.disappear(item);
							return null;
						} else {
							return Generator.trash[idx];
						}

						//  return item.children[0].checked === true ? null : Generator.trash[idx]
					});

					const newArrFiltered = newArr.filter((el) =>
						el != null ? true : false
					);
					Generator.trash = newArrFiltered;
					Generator.trashSave();
					console.log(Generator.trash);

					e.preventDefault();
				}
			);
			// RecoverBtn
			const recoverBtn = new Button(trashFooter.id, "uniBtn", "Recover", () => {
				const liItems = Array.from(trashForm.children).filter(
					(child) => child.tagName == "LI"
				);

				// console.log(liItems);

				const newArr = liItems.map((item, idx) => {
					console.log(item);
					if (item.children[0].checked === true) {
						let bufforItem = Generator.trash[idx];
						console.log("Trash item ID : ", bufforItem.id);
						if (Generator.inputs.length > 0) {
							bufforItem.id =
								"Input-cont-" +
								(+Generator.inputs[Generator.inputs.length - 1].id.slice(11) +
									1);
						} else {
							bufforItem.id = "Input-cont-" + 1;
						}
						console.log("Recover Item ID : ", bufforItem.id);
						Generator.addInput(bufforItem);
						Generator.inputs.push(bufforItem);
						Generator.inputsSave();
						// supose to change id couse will interupt with new one.

						this.disappear(item);

						return null;
					} else {
						return Generator.trash[idx];
					}

					//  return item.children[0].checked === true ? null : Generator.trash[idx]
				});

				const newArrFiltered = newArr.filter((el) =>
					el != null ? true : false
				);
				Generator.trash = newArrFiltered;
				Generator.trashSave();
			});

			// THEME BUTTON
		});
		const themeBtn = new Button(modalHeader.id, "uniBtn", "Theme", (e) => {
			const root = document.documentElement;

			this.cleanView();

			const form = document.createElement("form");
			this.elem.append(form);
			form.id = "themeColorForm";

			Object.keys(Generator.theme).forEach(
				(theme, idx) => new ThemeItem(form.id, `theme-${theme}`, theme)
			);

			const saveAndApplyBtn = new Button(
				form.id,
				"uniBtn",
				"Apply&Save",
				(e) => {
					const data = new FormData(form);

					Generator.themeApply(data.get("colorThemeSelect"));

					Generator.themeSave();

					e.preventDefault();
				}
			);
		});
	}
}
