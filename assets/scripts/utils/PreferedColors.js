import { Generator } from "../App/Generator.js";

export function preferedLight() {
	console.log("LIGHT MODE");
	Generator.themeApply("light");
	document.documentElement.style.setProperty(
		"--text-color",
		"var(--dark-grey-text)"
	);
	document.documentElement.style.setProperty(
		"--input-number-bckg",
		"var(--input-number-bckg-light)"
	);
	document.documentElement.style.setProperty(
		"--input-modified-bckg",
		"var(--input-modified-bckg-light)"
	);
}

export function preferedDark() {
	console.log("DARK MODE");
	Generator.themeApply("dark");
	document.documentElement.style.setProperty(
		"--text-color",
		"var(--light-grey)"
	);
	document.documentElement.style.setProperty(
		"--input-number-bckg",
		"var(--input-number-bckg-dark)"
	);
	document.documentElement.style.setProperty(
		"--input-modified-bckg",
		"var(--input-modified-bckg-dark)"
	);
}

Generator;
export function preferedColors(e) {
	if (e.matches) {
		preferedDark();
	} else {
		preferedLight();
	}
}
