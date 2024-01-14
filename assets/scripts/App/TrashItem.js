import { Component } from "./Component.js";
import { Generator } from "./Generator.js";

export class TrashItem extends Component {
	constructor(hookId, classes, value, data) {
		super(hookId, false);
		this.classes = classes;
		this.value = value;
		this.data = data;
		this.elem;
		this.render();
	}
	render() {
		console.log();
		this.elem = this.createComp("li", this.classes, [
			{ name: "id", value: `${JSON.parse(this.data).id + "-trash"}` },
		]);
		const checkBox = document.createElement("input");
		checkBox.setAttribute("type", "checkbox");
		// checkBox.setAttribute("name", "trashItem");
		// checkBox.setAttribute("value", this.value);
		this.elem.append(checkBox);
		// const inputVal = document.createElement("input");
		// inputVal.setAttribute("inputmode", "numeric");
		// inputVal.setAttribute("value", this.value);
		// inputVal.setAttribute("title", this.data);
		// this.elem.append(inputVal);
		Generator.addInput(JSON.parse(this.data), true);
	}
}
