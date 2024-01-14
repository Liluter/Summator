import { Component } from "./Component.js";
import { SwitchInd } from "./SwitchInd.js";

export class SliderMenuOpen extends Component {
	list = ["mod", "switch", "delete"];
	constructor(hookId, attr) {
		super(hookId, false);
		this.attr = attr;
		this.elem;
		this.render();
	}

	slideMenuHandler(e) {
		e.target.parentElement.classList.toggle("hide");
		switch (e.target.textContent) {
			case "mod":
				this.elem.parentElement.children[3].classList.toggle("hide");
				break;
			case "switch":
				this.elem.parentElement.children[4].classList.toggle("hide");
				break;
			case "delete":
				this.elem.parentElement.children[5].classList.toggle("hide");
				break;
		}
	}

	render() {
		this.elem = this.createComp("div", "slider-menu-open hide", this.attr);
		for (let el of this.list) {
			const switchBtn = new SwitchInd(
				this.elem.id,
				"switch-menu-btn off " + el
			);
			switchBtn.elem.innerHTML = el;
			switchBtn.elem.addEventListener(
				"click",
				this.slideMenuHandler.bind(this)
			);
		}
	}
}
