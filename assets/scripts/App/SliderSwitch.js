import { Component } from "./Component.js";
import { Generator } from "./Generator.js";
import { SwitchInd } from "./SwitchInd.js";

export class SliderSwitch extends Component {
	constructor(hookId, attr, remoteSet) {
		super(hookId, false);
		this.attr = attr;
		this.remoteSet = remoteSet;
		this.render();
		this.turnOn;
	}

	turnOn(ancestor) {
		ancestor.children[1].children[1].classList.remove("off");
		ancestor.classList.remove("disabled");
		Generator.calculateResults();
	}

	turnOff(ancestor) {
		ancestor.children[1].children[1].classList.add("off");
		ancestor.classList.add("disabled");
		Generator.calculateResults();
	}

	slideMenuHandler(e) {
		const ancestorCont = e.target.closest(".input-container");
		switch (e.target.textContent) {
			case "ON":
				Generator.inputFinder(ancestorCont.id).switcher = true;
				this.turnOn(ancestorCont);
				break;
			case "OFF":
				Generator.inputFinder(ancestorCont.id).switcher = false;
				this.turnOff(ancestorCont);
				break;
		}
		e.target.parentElement.classList.toggle("hide");
	}

	render() {
		const elem = this.createComp("div", "slider-switch hide", this.attr);
		const switchBtnOn = new SwitchInd(
			elem.id,
			"switch-menu-btn switch indicator"
		);
		switchBtnOn.elem.textContent = "ON";
		switchBtnOn.elem.addEventListener(
			"click",
			this.slideMenuHandler.bind(this)
		);
		const switchBtnOff = new SwitchInd(
			elem.id,
			"switch-menu-btn switch off turnoff"
		);
		switchBtnOff.elem.textContent = "OFF";
		switchBtnOff.elem.addEventListener(
			"click",
			this.slideMenuHandler.bind(this)
		);
		const ancestorCont = elem.closest(".input-container");
		if (!!this.remoteSet) {
			this.turnOn(ancestorCont);
		} else {
			this.turnOff(ancestorCont);
		}
	}
}
