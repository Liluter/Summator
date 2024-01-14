import { Component } from "./Component.js";
import { Generator } from "./Generator.js";
import { Swatch } from "./Swatch.js";

export class ThemeItem extends Component {
	constructor(hookId, id, type) {
		super(hookId, false);
		this.id = id;
		this.type = type;
		this.getColorValue;
		this.render();
	}

	render() {
		const themeElement = this.createComp("div", "themeItemContainer");
		themeElement.id = this.id;
		//RADIO BUTTON
		const setColorValue = function (e) {
			Generator.theme[this.hookId.slice(6)][this.nth] = e.target.value;
		};

		const getColorValue = (n) => {
			return Generator.theme[this.type][n];
		};

		// RADIO BUTTON
		const radioBtn = this.createComp("input", "", [
			{ name: "type", value: "radio" },
			{ name: "name", value: "colorThemeSelect" },
			{ name: "value", value: this.type },
			{
				name: Generator.actualTheme == this.type ? "checked" : null,
				value: "",
			},
		]);

		themeElement.append(radioBtn);
		radioBtn.addEventListener("input", (e) => {
			console.log("checked", e.target.checked);
		});

		// COLOR INPUTS

		Generator.cssVaribles.forEach((e, idx) => {
			new Swatch(
				themeElement.id,
				idx,
				getColorValue(idx),
				Generator.themeSwatchTitles[idx],
				setColorValue
			);
		});
	}
}
