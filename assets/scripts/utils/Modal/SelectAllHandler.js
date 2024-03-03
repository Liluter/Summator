export function selectAllHandler(e) {
	if (!!trashForm.querySelector("li")) {
		Array.from(trashForm.children).forEach(
			(e) => (e.children[0].checked = true)
		);
	}
}
