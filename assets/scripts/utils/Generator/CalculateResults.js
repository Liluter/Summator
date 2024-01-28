import { Generator } from "../../App/Generator.js";

export function calculateResults() {
	const resultInput = document.getElementById("resultInput");
	let counter = 0;
	let modifier = 0;
	for (const element of Generator.inputs) {
		if (element.switcher) {
			modifier = +element.mainVal;
			if (element.modValue !== "") {
				switch (element.modOperator) {
					case "+":
						modifier += +element.modValue;
						break;
					case "-":
						modifier -= +element.modValue;
						break;
					case "x":
						modifier *= +element.modValue;
						break;
					case "/":
						modifier /= +element.modValue;
						break;
					case "%":
						modifier *= +element.modValue / 100;
						break;
				}
			}

			switch (element.mainOperator) {
				case "+":
					counter += modifier;
					break;
				case "-":
					counter -= modifier;
					break;
				case "x":
					counter *= modifier;
					break;
				case "/":
					counter /= modifier;
					break;
				case "%":
					counter *= modifier / 100;
					break;
			}
		}
	}

	resultInput.value = counter.toFixed(2);

	Generator.inputsSave();
	return counter;
}
