export function themeSave() {
	localStorage.setItem("theme", JSON.stringify(this.theme));
}
