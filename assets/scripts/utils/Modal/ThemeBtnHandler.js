import { Generator } from "../../App/Generator.js";
import { Button } from "../../App/Button.js";
import { ThemeItem } from "../../App/ThemeItem.js";
import { saveAndApplyBtnHandler } from "./SaveAndApplyBtnHandler.js";

export function themeBtnHandler(e) {
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
		saveAndApplyBtnHandler.bind(null, e, form)
	);
}
