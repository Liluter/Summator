export function appear(ele) {
	ele.classList.toggle("appear");
	const timeout = setTimeout(() => {
		console.log("ele", ele);
		ele.classList.toggle("appear");
	}, 200);
}
