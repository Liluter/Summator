import { Generator } from "../../App/Generator.js";
import { ACTUAL_THEME, THEME } from "../Varibles.js";

export function themeReset() {
	Generator.theme = THEME;
	if (matchMedia("(prefers-color-scheme:dark")) {
		Generator.actualTheme = matchMedia("(prefers-color-scheme:dark").matches
			? "dark"
			: "light";
	} else {
		Generator.actualTheme = ACTUAL_THEME;
	}
	Generator.themeApply();
	Generator.themeSave();
	Generator.themeLoad();
}
