import { Generator } from "../../App/Generator.js";

export function saveAndApplyBtnHandler(e, form) {
	const data = new FormData(form);
	Generator.themeApply(data.get("colorThemeSelect"));
	Generator.themeSave();
	e.preventDefault();
}
