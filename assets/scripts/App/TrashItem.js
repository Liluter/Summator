import { Component } from "./Component.js";
import { Generator } from "./Generator.js";

export class TrashItem extends Component {
	constructor(hookId, classes, data, counter) {
		super(hookId, false);
		this.classes = classes;
		this.data = data;
		this.counter = counter;
		this.elem;
		this.render();
	}
	render() {
		this.elem = this.createComp("li", this.classes, [
			{ name: "id", value: "trash-" + this.counter },
		]);
		const checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		this.elem.append(checkBox);
		Generator.addInput(this.data, true);
	}
}
