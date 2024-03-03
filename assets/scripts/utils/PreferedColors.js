import { Generator } from "../App/Generator.js";

Generator;
export function preferedColors(e) {
	if (e.matches) {
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
	} else {
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
}
