export function appear(ele) {
	ele.classList.toggle("appear");
	const timeout = setTimeout(() => {
		ele.classList.toggle("appear");
	}, 200);
}
