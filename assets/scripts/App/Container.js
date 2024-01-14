import { Component } from "./Component.js";

export class Container extends Component {
	constructor(hookId, ownId) {
		super(hookId, false);
		this.ownId = ownId;
		this.render();
	}

	render() {
		this.createComp("div", "container", [{ name: "id", value: this.ownId }]);
	}
}
