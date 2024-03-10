export function closeModal(e) {
	// for slider mod inside operator modal closing
	// console.log(e);
	// return;
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
				}
			}
		});
	});

	const optionsModal = document.getElementById("options-modal");
	const optionsBtn = document.querySelectorAll(".uniBtn");
	const myEvent = new Event("closeOptionModal");
	if (
		!optionsModal.contains(e.target) &&
		e.target == optionsBtn[2] &&
		optionsModal.classList.contains("hide")
	) {
		optionsModal.classList.toggle("hide");
	} else if (
		!optionsModal.contains(e.target) &&
		e.target == optionsBtn[2] &&
		!optionsModal.classList.contains("hide")
	) {
		optionsModal.classList.add("hide");
		optionsModal.dispatchEvent(myEvent);
	} else if (
		!optionsModal.contains(e.target) &&
		e.target != optionsBtn[2] &&
		!optionsModal.classList.contains("hide")
	) {
		optionsModal.classList.add("hide");
		optionsModal.dispatchEvent(myEvent);
	}
}
