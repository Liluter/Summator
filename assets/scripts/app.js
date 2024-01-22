import { Container } from "./App/Container.js";
import { HeaderComp } from "./App/HeaderComp.js";
import { Generator } from "./App/Generator.js";
import { NewInput } from "./App/NewInput.js";
import { ModalOptions } from "./App/ModalOptions.js";

class App {
	static closeModal(e) {
		// for slider mod inside operator modal closing

		const sliderMod = document.querySelectorAll(".slider-mod");
		const sliderMenuOpen = document.querySelectorAll(".slider-menu-open");
		const sliderDelete = document.querySelectorAll(".slider-delete");
		const sliderSwitch = document.querySelectorAll(".slider-switch");
		const operatorModal = document.querySelectorAll(".operator-modal");

		const modals = [
			sliderMod,
			sliderMenuOpen,
			sliderDelete,
			sliderSwitch,
			operatorModal,
		];

		modals.forEach((modal) => {
			modal.forEach((slider) => {
				if (!slider.matches(".hide")) {
					if (!slider.contains(e.target)) {
						slider.classList.add("hide");
						console.log("other events");
					}
				}
			});
		});

		// closing options modal
		const optionsModal = document.getElementById("options-modal");
		const optionsBtn = document.querySelectorAll(".uniBtn");
		const myEvent = new Event("closeOptionModal");
		if (
			!optionsModal.contains(e.target) &&
			e.target == optionsBtn[1] &&
			optionsModal.classList.contains("hide")
		) {
			// console.log('close modalOption' , optionsModal.classList.contains("hide"));
			optionsModal.classList.toggle("hide");
			// console.log(e.target);
			// console.log(optionsBtn[1]);
			// console.log(e.target == optionsBtn[1]);
			// console.log("Only when closing options-modal");
			// console.log("turn on ");
		} else if (
			!optionsModal.contains(e.target) &&
			e.target == optionsBtn[1] &&
			!optionsModal.classList.contains("hide")
		) {
			optionsModal.classList.add("hide");
			// console.log('else e.target == optionsBtn[1]')
			console.log("turn off 1 ");
			// custom Event
			// const myEvent = new Event("closeing");
			// const myEvent = new CustomEvent("closeing",{detail: "Way first of closeing modal"});
			optionsModal.dispatchEvent(myEvent);
			// console.log(optionsModal.children);
		} else if (
			!optionsModal.contains(e.target) &&
			e.target != optionsBtn[1] &&
			!optionsModal.classList.contains("hide")
		) {
			optionsModal.classList.add("hide");
			console.log("turn off 2");
			// const myEvent2 = new Event("closeing");
			// const myEvent2 = new CustomEvent("closeing",{detail: "Way second of closeing modal"});
			optionsModal.dispatchEvent(myEvent);
			// console.log('else e.target != optionsBtn[1]')
		}
	}

	static init() {
		const header = new HeaderComp("app");
		const options = new ModalOptions("app");
		const container = new Container("app", "main-container");
		const generator = new Generator();
		const startBtn = new NewInput("app", "+");
		const app = document.getElementById("app");
		app.addEventListener("click", this.closeModal.bind(this), true);
		addEventListener("load", () => {
			Generator.themeLoad();
			Generator.trashLoad();
			// History load from LocalStore
			Generator.loadHistory();
		});
	}
}

App.init();
