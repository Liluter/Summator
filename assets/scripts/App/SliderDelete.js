import { Component } from "./Component.js";
import { SwitchInd } from "./SwitchInd.js";
import { Generator } from "./Generator.js";

export class SliderDelete extends Component {
	constructor(hookId, attr) {
		super(hookId, false);
		this.attr = attr;
		this.render();
	}

	slideMenuHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		switch (e.target.textContent) {
			case "DELETE":
				ancestorCont.children[1].children[2].classList.remove("off");
				let counter = 0;
				const myMethod = () => {
					ancestorCont.children[1].children[2].classList.toggle("off");
					counter++;
					if (counter === 5) {
						clearInterval(blinker);
						Generator.inputRemover(ancestorCont.id);
						ancestorCont.classList.add("removing");
						setTimeout(() => ancestorCont.remove(), 500);
						Generator.calculateResults();
					}
				};
				const blinker = setInterval(myMethod, 600);
				break;
			case "KEEP":
				ancestorCont.children[1].children[2].classList.add("off");
				break;
		}
		e.target.parentElement.classList.toggle("hide");
	}

	render() {
		const elem = this.createComp("div", "slider-delete hide", this.attr);
		const switchBtnOn = new SwitchInd(elem.id, "switch-menu-btn delete off");
		switchBtnOn.elem.innerHTML = "DELETE";
		switchBtnOn.elem.addEventListener("click", this.slideMenuHandler);
		const switchBtnOff = new SwitchInd(
			elem.id,
			"switch-menu-btn delete off turnoff"
		);
		switchBtnOff.elem.innerHTML = "KEEP";
		switchBtnOff.elem.addEventListener("click", this.slideMenuHandler);
	}
}
