import { addInput } from "../utils/Generator/AddInput.js";
import { inputsSave } from "../utils/Generator/InputSave.js";
import { inputsLoad } from "../utils/Generator/InputsLoad.js";
import { trashSave } from "../utils/Generator/TrashSave.js";
import { trashLoad } from "../utils/Generator/TrashLoad.js";
import { loadHistory } from "../utils/Generator/LoadHistory.js";
import { themeSave } from "../utils/Generator/ThemeSave.js";
import { themeLoad } from "../utils/Generator/ThemeLoad.js";
import { themeApply } from "../utils/Generator/ThemeApply.js";
import { themeReset } from "../utils/Generator/ThemeReset.js";
import { inputFinder } from "../utils/Generator/InputFinder.js";
import { inputRemover } from "../utils/Generator/InputRemover.js";
import { calculateResults } from "../utils/Generator/CalculateResults.js";
import {
	CSS_VARIBLES,
	THEME_SWATCH_TITLES,
	THEME,
	ACTUAL_THEME,
} from "../utils/Varibles.js";

export class Generator {
	static theme = THEME;
	static actualTheme = ACTUAL_THEME;
	static cssVaribles = CSS_VARIBLES;
	static themeSwatchTitles = THEME_SWATCH_TITLES;

	static inputs = [];
	static trash = [];
	static id = 0;

	static inputsSave = inputsSave;
	static inputsLoad = inputsLoad;
	static trashSave = trashSave;
	static trashLoad = trashLoad;
	static loadHistory = loadHistory;
	static themeSave = themeSave;
	static themeLoad = themeLoad;
	static themeApply = themeApply;
	static themeReset = themeReset;
	static inputFinder = inputFinder;
	static inputRemover = inputRemover;
	static calculateResults = calculateResults;
	static addInput = addInput;
}
