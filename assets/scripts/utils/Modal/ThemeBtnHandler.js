import { Generator } from "../../App/Generator.js";
import { Button } from "../../App/Button.js";
import { ThemeItem } from "../../App/ThemeItem.js";
import { saveAndApplyBtnHandler } from "./SaveAndApplyBtnHandler.js";
import { restetThemeToDefaults } from "./ResetThemeToDefaults.js";

export function themeBtnHandler(e) {
	this.cleanView();
	const form = document.createElement("form");
	const themeFooter = document.createElement("footer");
	this.elem.append(form);
	this.elem.append(themeFooter);
	form.id = "themeColorForm";
	themeFooter.id = "themeFooter";

	this.loadItems = function () {
		form.replaceChildren();
		Object.keys(Generator.theme).forEach(
			(theme, idx) => new ThemeItem(form.id, `theme-${theme}`, theme)
		);
	};

	this.loadItems();

	const restoreToDefault = new Button(
		themeFooter.id,
		"uniBtn",
		"Restore Defaults",
		restetThemeToDefaults.bind(this)
	);

	const saveAndApplyBtn = new Button(
		themeFooter.id,
		"uniBtn",
		"Apply&Save",
		saveAndApplyBtnHandler.bind(null, e, form)
	);
}
