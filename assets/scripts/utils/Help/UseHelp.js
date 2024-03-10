export async function useHelp(target) {
	const modalHelp = document.getElementById("modalHelp");
	const title = await fetch("./assets/scripts/utils/Help/helpDB.json")
		.then((res) => res.json())
		.then((data) => data[target].title);
	const content = await fetch("./assets/scripts/utils/Help/helpDB.json")
		.then((res) => res.json())
		.then((data) => data[target].content);

	modalHelp.editContent(title, content);
	modalHelp.openModal();
}
