export function disappear(ele) {
	ele.classList.add("disappera");
	const timeout = setTimeout(() => {
		ele.remove();
	}, 200);
}
