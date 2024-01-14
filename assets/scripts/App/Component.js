export class Component {
	constructor(hookId, canRender = true) {
		this.hookId = hookId;
		if (canRender) {
			console.log("Component constructor");
			this.render();
		}
	}

	render() {
		console.log("Render function empty in ComponentClass", this);
	}

	createComp(tag, classes, attributes) {
		const rootEl = document.createElement(tag);

		if (classes) {
			rootEl.className = classes;
		}

		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootEl.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookId).append(rootEl);
		return rootEl;
	}
}
