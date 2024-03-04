export function modalOperationBtnHandler(e) {
	e.target.parentElement.parentElement
		.querySelector(".slider-mod")
		.classList.remove("hide"),
		e.target.parentElement.parentElement
			.querySelector(".slider-mod > .operator-modal")
			.classList.remove("hide");
}
