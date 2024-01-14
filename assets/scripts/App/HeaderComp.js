import { Component } from "./Component.js";
import { Generator } from "./Generator.js";

export class HeaderComp extends Component {
	constructor(hookId) {
		super(hookId, false);
		this.render();
	}

	showValue = () => {
		Generator.calculateResults();
		console.log("Actual Result : ", this.input.value, Generator.inputs);
	};

	// showOptions = () => {
	//   const optionsModal = document.getElementById("options-modal");
	//   optionsModal.classList.remove("hide");
	//   console.log('showOptions remove hide');
	// };

	render() {
		const headerEl = this.createComp("div", "header-container");
		// to change for components
		headerEl.innerHTML = `
    <button class='uniBtn'>Result</button>
    <input id='resultInput' inputmode='numeric' value='0.00' class='header-input' readonly>
    <button class='uniBtn'>Options</button>
    `;
		const resultBtn = headerEl.querySelector("button");
		const optionsBtn = headerEl.querySelectorAll(".uniBtn");
		this.input = headerEl.querySelector("input");
		resultBtn.addEventListener("click", this.showValue.bind(this));
		// not actual use functionality in 929 line and beneath
		// optionsBtn[1].addEventListener("click", this.showOptions.bind(this));
	}
}
