import { Container } from "./App/Container.js";
import { HeaderComp } from "./App/HeaderComp.js";
import { Generator } from "./App/Generator.js";
import { NewInput } from "./App/NewInput.js";
import { ModalOptions } from "./App/ModalOptions.js";
import { closeModal } from "./App/CloseModal.js";
import { preferedColors } from "./utils/PreferedColors.js";

class App {
	static init() {
		const header = new HeaderComp("app");
		const options = new ModalOptions("app");
		const container = new Container("app", "main-container");
		const startBtn = new NewInput("app", "+");
		const app = document.getElementById("app");
		app.addEventListener("click", closeModal.bind(this), true);
		addEventListener("load", () => {
			Generator.themeLoad();
			Generator.trashLoad();
			Generator.loadHistory();
		});

		const mql = window.matchMedia("(prefers-color-scheme : dark)");
		mql.addEventListener("change", preferedColors);
	}
}

App.init();
