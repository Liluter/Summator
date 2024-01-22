import { Generator } from "../../App/Generator.js";

export function themeLoad() {
	const newTheme = JSON.parse(localStorage.getItem("theme"));
	const newActualTheme = localStorage.getItem("actualTheme");
	!!localStorage.getItem("theme") ? (Generator.theme = newTheme) : null;

	!!localStorage.getItem("actualTheme")
		? (Generator.actualTheme = newActualTheme)
		: null;

	Generator.themeApply();
}
