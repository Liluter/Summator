import { Container } from "./App/Container.js";
import { HeaderComp } from "./App/HeaderComp.js";
import { Generator } from "./App/Generator.js";
import { NewInput } from "./App/NewInput.js";
import { ModalOptions } from "./App/ModalOptions.js";
import { closeModal } from "./App/CloseModal.js";
import {
	preferedColors,
	preferedDark,
	preferedLight,
} from "./utils/PreferedColors.js";

class App {
	static init() {
		new HeaderComp("app");
		new ModalOptions("app");
		new Container("app", "main-container");
		new NewInput("app", "+");
		addEventListener("click", closeModal.bind(this), true);
		addEventListener("load", () => {
			Generator.themeLoad();
			Generator.trashLoad();
			Generator.loadHistory();
		});
		const modalHelp = document.createElement("uc-modalhelp");
		modalHelp.setAttribute("id", "modalHelp");
		const app = document.querySelector("#app");
		app.append(modalHelp);
	}
}

App.init();

addEventListener("load", () => {
	matchMedia("(prefers-color-scheme : dark)").matches
		? preferedDark()
		: preferedLight();
});
const mql = window.matchMedia("(prefers-color-scheme : dark)");
mql.addEventListener("change", preferedColors);
