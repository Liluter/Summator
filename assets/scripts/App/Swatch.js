import { Component } from "./Component.js";

export class Swatch extends Component {
	constructor(hookId, nth, value, title, event) {
		super(hookId, false);
		this.nth = nth;
		this.value = value;
		this.title = title;
		this.event = event;
		this.elem;
		this.render();
	}
	render() {
		this.elem = this.createComp("input", "colorInput", [
			{ name: "type", value: "color" },
			{ name: "value", value: this.value },
			{ name: "title", value: this.title },
		]);
		this.elem.addEventListener("change", this.event.bind(this));
	}
}
