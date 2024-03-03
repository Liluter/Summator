import { Generator } from "../../App/Generator.js";
import { ACTUAL_THEME, THEME } from "../Varibles.js";

export function themeReset() {
	Generator.theme = THEME;
	Generator.actualTheme = ACTUAL_THEME;
	Generator.themeApply();
	Generator.themeSave();
	Generator.themeLoad();
}
