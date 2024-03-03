import { Generator } from "../../App/Generator.js";

export function themeLoad() {
	if (!!localStorage.getItem("theme")) {
		const theme = JSON.parse(localStorage.getItem("theme"));
		Generator.theme = theme;
	} else {
		localStorage.setItem("theme", JSON.stringify(Generator.theme));
	}

	if (!!localStorage.getItem("actualTheme")) {
		const newActualTheme = localStorage.getItem("actualTheme");
		Generator.actualTheme = newActualTheme;
	} else {
		localStorage.setItem("actualTheme", JSON.stringify(Generator.actualTheme));
	}

	Generator.themeApply();
}
