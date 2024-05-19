import { Component } from "./Component.js";
import { Generator } from "./Generator.js";
import { useHelp } from "../utils/Help/UseHelp.js";

export class HeaderComp extends Component {
	constructor(hookId) {
		super(hookId, false);
		this.render();
	}

	showValue() {
		Generator.calculateResults();
		console.log("Actual Result : ", this.input.value, Generator.inputs);
	}

	clearBoardHandler() {
		Generator.inputs.forEach((input) => {
			document.getElementById(input.id).remove();
		});
		Generator.inputs = [];
		Generator.inputsSave();
	}

	render() {
		const headerEl = this.createComp("div", "header-container");
		// to change for components
		headerEl.innerHTML = `
    <button class='uniBtn'>Help</button>
    <button class='uniBtn'>Result</button>
    <button class='uniBtn'>Options</button>
    <button class='uniBtn clear-board'>Clr Brd</button>
    <input id='resultInput' inputmode='numeric' value='0.00' class='header-input' readonly>
    `;
		const headerBtns = headerEl.querySelectorAll("button");
		this.input = headerEl.querySelector("input");
		headerBtns[0].addEventListener("click", useHelp.bind(this, "mainView"));

		headerBtns[1].addEventListener("click", this.showValue.bind(this));
		headerBtns[3].addEventListener("click", this.clearBoardHandler.bind(this));
	}
}
