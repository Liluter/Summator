export function themeApply(passedTheme) {
	!!passedTheme ? (this.actualTheme = passedTheme) : null;

	localStorage.setItem("actualTheme", this.actualTheme);

	this.cssVaribles.forEach((varible, idx) =>
		document.documentElement.style.setProperty(
			varible,
			this.theme[this.actualTheme][idx]
		)
	);
}
