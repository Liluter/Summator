export class Input {
	constructor(
		id,
		hashId,
		mainOperator = "+",
		mainVal = "",
		modOperator = "+",
		modValue = "",
		mod = false,
		switcher = true,
		del = false
	) {
		this.id = id;
		this.hashId = Math.floor(Math.random() * 1000000000);
		this.mainOperator = mainOperator;
		// (this.mainVal = mainVal.toFixed(2)), (this.modOperator = modOperator);
		this.mainVal = mainVal;
		this.modValue = modValue;
		this.modOperator = modOperator;
		this.mod = mod;
		this.switcher = switcher;
		this.delete = del;
	}
}
