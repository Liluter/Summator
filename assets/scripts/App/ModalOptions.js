import { Component } from "./Component.js";
import { Button } from "./Button.js";
import { trashBtnHandler } from "../utils/Modal/TrashBtnHandler.js";
import { themeBtnHandler } from "../utils/Modal/ThemeBtnHandler.js";
import { useHelp } from "../utils/Help/UseHelp.js";

export class ModalOptions extends Component {
	constructor(hookId) {
		super(hookId, false);
		this.elem;
		this.render();
	}

	cleanView() {
		while (this.elem.children[1]) {
			this.elem.children[1].remove();
		}
	}

	render() {
		this.elem = this.createComp("div", "options-modal hide", [
			{ name: "id", value: "options-modal" },
		]);

		this.elem.addEventListener("closeOptionModal", (e) => {
			this.cleanView();
		});

		const modalHeader = document.createElement("header");
		modalHeader.id = "modalHeader";
		this.elem.append(modalHeader);

		// HELP BUTTON
		const helpBtn = new Button(
			modalHeader.id,
			"uniBtn",
			"?",
			useHelp.bind(this, "options")
		);
		// TRASH BUTTON
		const trashBtn = new Button(
			modalHeader.id,
			"uniBtn",
			"Trash",
			trashBtnHandler.bind(this)
		);
		// THEME BUTTON
		const themeBtn = new Button(
			modalHeader.id,
			"uniBtn",
			"Theme",
			themeBtnHandler.bind(this)
		);
	}
}
