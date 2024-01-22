import { Component } from "./Component.js";
import { SwitchInd } from "./SwitchInd.js";

export class SliderMenuClosed extends Component {
	constructor(hookId, attr) {
		super(hookId, false);
		this.list = ["mod", "switch", "delete"];
		this.attr = attr;
		this.render();
	}

	slideMenuHandler() {
		this.elem.nextElementSibling.classList.toggle("hide");
	}

	render() {
		this.elem = this.createComp("div", "slider-menu-closed", this.attr);
		this.elem.addEventListener("click", this.slideMenuHandler.bind(this), true);
		for (let el of this.list) {
			const classes = "switch-indicator " + el;
			if (el !== "switch") {
				new SwitchInd(this.elem.id, classes + " off");
			} else {
				new SwitchInd(this.elem.id, classes);
			}
		}
	}
}
