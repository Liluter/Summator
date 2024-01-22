export function trashSave() {
	localStorage.setItem("trash", JSON.stringify(this.trash));
}
