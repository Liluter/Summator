export function disappear(ele) {
	ele.classList.add("disappera");
	const timeout = setTimeout(() => {
		ele.remove();
	}, 200);
}

// Need to add class .disappear to your css to oprate.
