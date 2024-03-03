import { Generator } from "../../App/Generator.js";

export function restetThemeToDefaults() {
	Generator.themeReset();
	this.loadItems();
}
