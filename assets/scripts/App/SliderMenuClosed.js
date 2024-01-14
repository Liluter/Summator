import { Component } from "./Component.js";
import { SwitchInd } from "./SwitchInd.js";

export class SliderMenuClosed extends Component {
	list = ["mod", "switch", "delete"];
	constructor(hookId, attr) {
		super(hookId, false);
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
				const switchBtn = new SwitchInd(this.elem.id, classes + " off");
			} else {
				const switchBtn = new SwitchInd(this.elem.id, classes);
			}
			//===============================================================
			// need to set without off class for switch btn indiator ... done. ???
		}
	}
}
