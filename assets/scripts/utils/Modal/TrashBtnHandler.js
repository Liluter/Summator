import { Generator } from "../../App/Generator.js";
import { Button } from "../../App/Button.js";
import { permanentRemoveHandler } from "./PermanentRemoveHandler.js";
import { TrashItem } from "../../App/TrashItem.js";
import { recoverBtnHandler } from "./RecoverBtnHandler.js";
import { selectAllHandler } from "./SelectAllHandler.js";

export function trashBtnHandler(e) {
	this.cleanView();
	const trashForm = document.createElement("form");
	const trashFooter = document.createElement("footer");
	this.elem.append(trashForm);
	this.elem.append(trashFooter);
	trashForm.id = "trashForm";
	trashFooter.id = "trashFooter";

	// Trash Items generator
	if (Generator.trash.length > 0) {
		let counter = 1;
		for (let trashItem of Generator.trash) {
			new TrashItem(trashForm.id, "trash-item", trashItem, counter++);
		}
	} else {
		const message = document.createElement("p");
		message.classList.add("message");
		message.textContent = "Empty Trash";
		trashForm.append(message);
	}
	//  Select All
	const selectAllItems = new Button(
		trashFooter.id,
		"uniBtn",
		"Select All",
		selectAllHandler.bind(this)
	);

	// Permanent Remove
	const permanentRemove = new Button(
		trashFooter.id,
		"uniBtn",
		"Remove",
		permanentRemoveHandler.bind(this)
	);
	// RecoverBtn
	const recoverBtn = new Button(
		trashFooter.id,
		"uniBtn",
		"Recover",
		recoverBtnHandler.bind(this)
	);
}
