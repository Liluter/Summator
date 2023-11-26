class Component {
  constructor(hookId, canRender = true) {
    this.hookId = hookId;
    if (canRender) {
      console.log("Component constructor");
      this.render();
    }
  }

  render() {
    console.log("Render function empty in ComponentClass", this);
  }

  createComp(tag, classes, attributes) {
    const rootEl = document.createElement(tag);

    if (classes) {
      rootEl.className = classes;
    }

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootEl.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootEl);
    return rootEl;
  }
}

class TrashItem extends Component {
  constructor(hookId, classes, value, data) {
    super(hookId, false);
    this.classes = classes;
    this.value = value;
    this.data = data;
    this.elem;
    this.render();
  }
  render() {
    this.elem = this.createComp("li", this.classes);
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    // checkBox.setAttribute("name", "trashItem");
    // checkBox.setAttribute("value", this.value);
    this.elem.append(checkBox);
    const inputVal = document.createElement("input");
    inputVal.setAttribute("inputmode", "numeric");
    inputVal.setAttribute("value", this.value);
    inputVal.setAttribute("title", this.data);
    this.elem.append(inputVal);
  }
}

class Button extends Component {
  constructor(hookId, classes, name, onclickFunc = () => {}) {
    super(hookId, false);
    this.classes = classes;
    this.name = name;
    this.onclickFunc = onclickFunc;
    this.elem;
    this.render();
  }
  render() {
    this.elem = this.createComp("button", this.classes);
    this.elem.textContent = this.name;
    this.elem.addEventListener("click", this.onclickFunc.bind(this));
  }
}

class Swatch extends Component {
  constructor(hookId, nth, value, title, event) {
    super(hookId, false);
    this.nth = nth;
    this.value = value;
    this.title = title;
    this.event = event;
    this.elem;
    this.render();
  }
  render() {
    this.elem = this.createComp("input", "colorInput", [
      { name: "type", value: "color" },
      { name: "value", value: this.value },
      { name: "title", value: this.title },
    ]);
    this.elem.addEventListener("change", this.event.bind(this));
  }
}

class ThemeItem extends Component {
  constructor(hookId, id, type) {
    super(hookId, false);
    this.id = id;
    this.type = type;
    this.getColorValue;
    this.render();
  }

  render() {
    const themeElement = this.createComp("div", "themeItemContainer");
    themeElement.id = this.id;
    //RADIO BUTTON
    const setColorValue = function (e) {
      Generator.theme[this.hookId.slice(6)][this.nth] = e.target.value;
    };

    const getColorValue = (n) => {
      return Generator.theme[this.type][n];
    };

    // RADIO BUTTON
    const radioBtn = this.createComp("input", "", [
      { name: "type", value: "radio" },
      { name: "name", value: "colorThemeSelect" },
      { name: "value", value: this.type },
      {
        name: Generator.actualTheme == this.type ? "checked" : null,
        value: "",
      },
    ]);

    themeElement.append(radioBtn);
    radioBtn.addEventListener("input", (e) => {
      console.log("checked", e.target.checked);
    });

    // COLOR INPUTS

    Generator.cssVaribles.forEach((e, idx) => {
      new Swatch(
        themeElement.id,
        idx,
        getColorValue(idx),
        Generator.themeSwatchTitles[idx],
        setColorValue
      );
    });
  }
}

class ModalOptions extends Component {
  constructor(hookId) {
    super(hookId, false);
    this.elem;
    this.render();
  }

  // test() {
  //   console.log('Testing digital audio... :)')
  // }

  render() {
    this.elem = this.createComp("div", "options-modal hide", [
      { name: "id", value: "options-modal" },
      // { name: "popover", value: "auto" },
    ]);

    this.elem.addEventListener("closeOptionModal", (e) => {
      // console.log("MODAL LOAD", e.detail);
      while (this.elem.children[1]) {
        this.elem.children[1].remove();
      }
    });

    const modalHeader = document.createElement("header");
    modalHeader.id = "modalHeader";
    this.elem.append(modalHeader);

    // TRASH BUTTON

    const trashBtn = new Button(modalHeader.id, "uniBtn", "Trash", (e) => {
      while (this.elem.children[1]) {
        this.elem.children[1].remove();
      }

      const trashForm = document.createElement("form");
      this.elem.append(trashForm);
      // trashForm.id="trashForm"
      trashForm.id = "trashForm";

      if (Generator.trash.length > 0) {
        for (let trashItem of Generator.trash) {
          // console.log("To trash , ",trashItem);
          const trashElement = new TrashItem(
            trashForm.id,
            "trash-item",
            trashItem.mainVal,
            JSON.stringify(trashItem)
          );
        }
      } else {
        const message = document.createElement("p");
        message.classList.add("message");
        message.textContent = "Empty Trash";
        trashForm.append(message);
      }

      const permanentRemove = new Button(
        trashForm.id,
        "uniBtn",
        "Permanently Remove",
        (e) => {
          console.log("Permanently Remove");
          console.log("children", trashForm.children);
          const liItems = Array.from(trashForm.children).filter(
            (child) => child.tagName == "LI"
          );
          console.log(liItems);
          const newArr = liItems.map((item, idx) => {
            if (item.children[0].checked === true) {
              // to be continued
              return null;
            } else {
              return Generator.trash[idx];
            }

            //  return item.children[0].checked === true ? null : Generator.trash[idx]
          });

          const newArrFiltered = newArr.filter((el) =>
            el != null ? true : false
          );
          Generator.trash = newArrFiltered;
          Generator.trashSave();
          console.log(Generator.trash);

          e.preventDefault();
        }
      );
    });

    // THEME BUTTON

    const themeBtn = new Button(modalHeader.id, "uniBtn", "Theme", (e) => {
      const root = document.documentElement;

      while (this.elem.children[1]) {
        this.elem.children[1].remove();
      }

      const form = document.createElement("form");
      this.elem.append(form);
      form.id = "themeColorForm";

      Object.keys(Generator.theme).forEach(
        (theme, idx) => new ThemeItem(form.id, `theme-${theme}`, theme)
      );

      const saveAndApplyBtn = new Button(
        form.id,
        "uniBtn",
        "Apply&Save",
        (e) => {
          const data = new FormData(form);

          Generator.themeApply(data.get("colorThemeSelect"));

          Generator.themeSave();

          e.preventDefault();
        }
      );
    });
  }
}

class HeaderComp extends Component {
  constructor(hookId) {
    super(hookId, false);
    this.render();
  }

  showValue = () => {
    Generator.calculateResults();
    console.log("Actual Result : ", this.input.value, Generator.inputs);
  };

  // showOptions = () => {
  //   const optionsModal = document.getElementById("options-modal");
  //   optionsModal.classList.remove("hide");
  //   console.log('showOptions remove hide');
  // };

  render() {
    const headerEl = this.createComp("div", "header-container");
    // to change for components
    headerEl.innerHTML = `
    <button class='uniBtn'>Result</button>
    <input id='resultInput' inputmode='numeric' value='0.00' class='header-input' readonly>
    <button class='uniBtn'>Options</button>
    `;
    const resultBtn = headerEl.querySelector("button");
    const optionsBtn = headerEl.querySelectorAll(".uniBtn");
    this.input = headerEl.querySelector("input");
    resultBtn.addEventListener("click", this.showValue.bind(this));
    // not actual use functionality in 929 line and beneath
    // optionsBtn[1].addEventListener("click", this.showOptions.bind(this));
  }
}

class Input {
  constructor(
    id,
    hashId,
    mainOperator = "+",
    mainVal = 0,
    modOperator = "+",
    modValue = 0,
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

class SliderMod extends Component {
  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.render();
  }
  //add handler
  // create hiding element after clicking outside element
  oprBtnHandler(e) {
    e.target.nextElementSibling.nextElementSibling.classList.toggle("hide");
  }

  modInputHandler(e) {
    const ancestorCont = e.target.closest(".input-container");
    const modIndicator = ancestorCont.children[1].children[0];
    const operatonModified = ancestorCont.children[0].children[3];
    const inputNumModified = ancestorCont.children[0].children[4];
    const actualModOperator = Generator.inputFinder(
      ancestorCont.id
    ).modOperator;
    console.log("Actual Mod Oprt ", actualModOperator);
    if (e.target.value) {
      console.log("test");
      modIndicator.classList.remove("off");
      inputNumModified.value = e.target.value;
      inputNumModified.classList.remove("hide");
      operatonModified.classList.remove("hide");
    } else if (actualModOperator !== "+") {
      console.log("operator not default");
      modIndicator.classList.remove("off");
      inputNumModified.value = e.target.value;
      inputNumModified.classList.add("hide");
      operatonModified.classList.add("hide");
      operatonModified.innerHTML = Generator.inputFinder(
        ancestorCont.id
      ).modOperator;
    } else {
      modIndicator.classList.add("off");
      inputNumModified.classList.add("hide");
      operatonModified.classList.add("hide");
      //switching operator to default
      Generator.inputFinder(ancestorCont.id).modOperator = "+";
      operatonModified.innerHTML = Generator.inputFinder(
        ancestorCont.id
      ).modOperator;
    }
    // show value in modified input handler
  }

  render() {
    const elem = this.createComp("div", "slider-mod hide", this.attr);
    const smallOprBtn = new OperationBtnInput(elem.id, "+", "smaller");
    const modInput = new InputNumberMod(elem.id);
    const operatsMod = new OperatorModalSmall(
      elem.id,
      [
        {
          name: "id",
          value: "OprModSmall-" + this.hookId[this.hookId.length - 1],
        },
      ],
      "smaller"
    );

    // create modifiedInput in InputMain but show only if Value is present.

    smallOprBtn.elem.addEventListener("click", this.oprBtnHandler.bind(this));
    modInput.elem.addEventListener("input", this.modInputHandler.bind(this));
    // fix handler
    // elem.parentElement.parentElement.parentElement.addEventListener('click', (e)=>console.log('clickParent', e.target.id), false);
  }
}

class SliderSwitch extends Component {
  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.render();
  }

  slideMenuHandler(e) {
    const ancestorCont = e.target.closest(".input-container");
    switch (e.target.textContent) {
      case "ON":
        ancestorCont.children[1].children[1].classList.remove("off");
        ancestorCont.classList.remove("disabled");
        Generator.inputFinder(ancestorCont.id).switcher = true;
        Generator.calculateResults();
        break;
      case "OFF":
        ancestorCont.children[1].children[1].classList.add("off");
        ancestorCont.classList.add("disabled");
        Generator.inputFinder(ancestorCont.id).switcher = false;
        Generator.calculateResults();
        break;
    }
    e.target.parentElement.classList.toggle("hide");
  }

  render() {
    const elem = this.createComp("div", "slider-switch hide", this.attr);
    const switchBtnOn = new SwitchInd(
      elem.id,
      "switch-menu-btn switch indicator"
    );
    switchBtnOn.elem.innerHTML = "ON";
    switchBtnOn.elem.addEventListener("click", this.slideMenuHandler);
    const switchBtnOff = new SwitchInd(
      elem.id,
      "switch-menu-btn switch off turnoff"
    );
    switchBtnOff.elem.innerHTML = "OFF";
    switchBtnOff.elem.addEventListener("click", this.slideMenuHandler);
    // to be continued...
  }
}
class SliderDelete extends Component {
  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.render();
  }

  slideMenuHandler(e) {
    const ancestorCont = e.target.closest(".input-container");
    switch (e.target.textContent) {
      case "DELETE":
        ancestorCont.children[1].children[2].classList.remove("off");
        let counter = 0;
        const myMethod = () => {
          ancestorCont.children[1].children[2].classList.toggle("off");
          counter++;
          if (counter === 5) {
            clearInterval(blinker);
            Generator.inputRemover(ancestorCont.id);
            ancestorCont.classList.add("removing");
            setTimeout(() => ancestorCont.remove(), 500);
            Generator.calculateResults();
          }
        };
        const blinker = setInterval(myMethod, 600);
        break;
      case "KEEP":
        ancestorCont.children[1].children[2].classList.add("off");
        break;
    }
    e.target.parentElement.classList.toggle("hide");
  }

  render() {
    const elem = this.createComp("div", "slider-delete hide", this.attr);
    const switchBtnOn = new SwitchInd(elem.id, "switch-menu-btn delete off");
    switchBtnOn.elem.innerHTML = "DELETE";
    switchBtnOn.elem.addEventListener("click", this.slideMenuHandler);
    const switchBtnOff = new SwitchInd(
      elem.id,
      "switch-menu-btn delete off turnoff"
    );
    switchBtnOff.elem.innerHTML = "KEEP";
    switchBtnOff.elem.addEventListener("click", this.slideMenuHandler);
  }
}

class SliderMenuOpen extends Component {
  list = ["mod", "switch", "delete"];
  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.elem;
    this.render();
  }

  slideMenuHandler(e) {
    e.target.parentElement.classList.toggle("hide");
    switch (e.target.textContent) {
      case "mod":
        this.elem.parentElement.children[3].classList.toggle("hide");
        break;
      case "switch":
        this.elem.parentElement.children[4].classList.toggle("hide");
        break;
      case "delete":
        this.elem.parentElement.children[5].classList.toggle("hide");
        break;
    }
  }

  render() {
    this.elem = this.createComp("div", "slider-menu-open hide", this.attr);
    for (let el of this.list) {
      const switchBtn = new SwitchInd(
        this.elem.id,
        "switch-menu-btn off " + el
      );
      switchBtn.elem.innerHTML = el;
      switchBtn.elem.addEventListener(
        "click",
        this.slideMenuHandler.bind(this)
      );
    }
  }
}

class SwitchInd extends Component {
  constructor(hookId, classes, attr) {
    super(hookId, false);
    this.attr = attr;
    this.classes = classes;
    this.elem;
    this.render();
  }

  switchHandler(e) {
    e.target.classList.toggle("off");
  }

  render() {
    this.elem = this.createComp("button", this.classes, this.attr);
  }
}

class SliderMenuClosed extends Component {
  list = ["mod", "switch", "delete"];
  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.render();
  }

  slideMenuHandler() {
    this.elem.nextElementSibling.classList.toggle("hide");
  }

  render() {
    this.elem = this.createComp("div", "slider-menu-closed", this.attr);
    this.elem.addEventListener("click", this.slideMenuHandler.bind(this), true);
    for (let el of this.list) {
      const classes = "switch-indicator " + el;
      if (el !== "switch") {
        const switchBtn = new SwitchInd(this.elem.id, classes + " off");
      } else {
        const switchBtn = new SwitchInd(this.elem.id, classes);
      }
      //===============================================================
      // need to set without off class for switch btn indiator ... done. ???
    }
  }
}

class OperationBtnInput extends Component {
  constructor(hookId, operator, classes = "", attr) {
    super(hookId, false);
    this.operator = operator;
    this.classes = classes;
    this.attr = attr;
    this.render();
    this.elem;
  }

  render() {
    this.elem = this.createComp("button", "operation-btn " + this.classes);
    this.elem.innerHTML = this.operator;
  }
}

class InputNumber extends Component {
  constructor(hookId, classes = "", attributes = [], value) {
    super(hookId, false);
    this.classes = classes;
    this.attributes = attributes;
    this.classes = classes;
    this.attributes = attributes;
    this.value = value;
    this.elem;
    this.render();
  }

  valueHandler(e) {
    // Need to validate each input only number
    // =========================================
    // Need to separate inputMod from Input number
    // console.log("InputNumber class hookId:", this.hookId);
    const ancestorCont = e.target.closest(".input-container");
    // Generator.inputs.find((e) => e.id === this.hookId).mainVal = e.target.value;
    Generator.inputFinder(ancestorCont.id).mainVal = e.target.value;
    Generator.calculateResults();
    // // console.log("target val: ", e.target.value, "Items: ", Generator.inputs);
  }
  keyDownHandler(e) {
    if (
      ("0123456789.".includes(e.key) && typeof +e.target.value === "number") ||
      e.key === "Backspace"
    ) {
    } else {
      e.preventDefault();
    }
  }

  render() {
    console.log("this.attribures", ...this.attributes);
    this.elem = this.createComp("input", "input-num " + this.classes, [
      // { name: "placeholder", value: "set" },
      { name: "inputmode", value: "numeric" },
      ...this.attributes,
    ]);
    this.elem.addEventListener("change", this.valueHandler.bind(this));
    // this.elem.addEventListener("input", this.inputHandler.bind(this));
    this.elem.addEventListener("keydown", this.keyDownHandler.bind(this));
  }
}

class InputNumberMod extends InputNumber {
  constructor(hookId) {
    super(hookId, false);
    // this.render(); // not nessesary it inherits form InputNumber
  }
  valueHandler(e) {
    // // Need to validate each input only number
    // // =========================================
    // // Need to separate inputMod from Input number
    // // console.log("InputNumber class hookId:", this.hookId);
    const ancestorCont = e.target.closest(".input-container");
    // Generator.inputs.find((e) => e.id === this.hookId).mainVal = e.target.value;
    Generator.inputFinder(ancestorCont.id).modValue = e.target.value;
    Generator.calculateResults();
    // console.log("target val: ", e.target.value, "Items: ", Generator.inputs);

    console.log("Value changed", e.target);
  }
}

class OperatorModal extends Component {
  operators = ["+", "-", "x", "/", "%"];
  buttons = [];

  constructor(hookId, attr, classes = "") {
    super(hookId, false);
    this.attr = attr;
    this.classes = classes;
    this.elem;
    this.render();
  }
  operatorHandler(e) {
    const ancestorCont = e.target.closest(".input-container");
    e.target.parentElement.classList.toggle("hide");
    Generator.inputFinder(ancestorCont.id).mainOperator = e.target.innerHTML;
    e.target.parentElement.previousElementSibling.innerHTML =
      e.target.innerHTML;
    Generator.calculateResults();
    Generator.inputsSave();
  }

  render() {
    this.elem = this.createComp(
      "div",
      "operator-modal hide " + this.classes,
      this.attr
    );

    for (const operator of this.operators) {
      this.buttons.push(
        new OperationBtnInput(this.elem.id, operator, this.classes)
      );
    }
    this.buttons.forEach((e) =>
      e.elem.addEventListener("click", this.operatorHandler.bind(this))
    );
  }
}
class OperatorModalSmall extends OperatorModal {
  operatorHandler(e) {
    const ancestorCont = e.target.closest(".input-container");
    const modIndicator = ancestorCont.children[1].children[0];
    const operatonModified = ancestorCont.children[0].children[3];
    const operatorBtnsmall =
      e.target.parentElement.previousElementSibling.previousElementSibling;
    e.target.parentElement.classList.toggle("hide");
    const modValue = Generator.inputFinder(ancestorCont.id).modValue;

    if ((e.target.innerHTML !== "+" && !modValue) || modValue) {
      modIndicator.classList.remove("off");
    } else {
      modIndicator.classList.add("off");
    }
    Generator.inputFinder(ancestorCont.id).modOperator = e.target.innerHTML;
    operatorBtnsmall.innerHTML = e.target.innerHTML;

    operatonModified.innerHTML = e.target.innerHTML;

    Generator.calculateResults();
  }
}

class InputItem extends Component {
  constructor(hookId, classes, attr) {
    super(hookId, false);
    this.classes = classes;
    this.attr = attr;
    this.render();
    this.elem;
  }

  render() {
    this.elem = this.createComp("div", this.classes, this.attr);
  }
}

class Generator {
  static inputs = [];
  static trash = [];
  static oprMainBtn;
  //starting point id number not  use when loading from localStorageApi
  static id = 0;

  // TRASH SAVE FEATURE -->
  static inputsSave() {
    localStorage.setItem("inputs", JSON.stringify(this.inputs));
    console.log("GENERATOR - INPUTS SAVED in LoacalStorageAPI ");
  }
  static inputsLoad() {
    const newInputs = JSON.parse(localStorage.getItem("inputs"));
    // const newActualInputs = localStorage.getItem("inputs");
    !!localStorage.getItem("inputs") ? (Generator.inputs = newInputs) : null;

    console.log("GENERATOR - Inputs LOADED successfully");
  }

  static trashSave() {
    localStorage.setItem("trash", JSON.stringify(this.trash));
    console.log("GENERATOR - TRASH SAVED in LoacalStorageAPI ");
  }
  static trashLoad() {
    const newTrash = JSON.parse(localStorage.getItem("trash"));
    !!localStorage.getItem("trash") ? (Generator.trash = newTrash) : null;
    console.log("GENERATOR - TRASH LOADED in LoacalStorageAPI ");
  }

  // <-- TRASH SAVE FEATURE

  // LOAD HISTORY FROM LOCALSTORAGE
  // Need to recrate every Main Input element as in store.
  // Rebuild class components in Generator.addInput method to have abilyty to render from params and default params. Not just like that.
  static loadHistory() {
    Generator.inputsLoad();
    console.log("GENERATOR - History load");
    // this.addInput(Generator.inputs[0])
    !!Generator.inputs.length
      ? Generator.inputs.forEach((elem) => {
          this.addInput(elem);
        })
      : console.log("GENERATOR - no inputs");
    // Generator.inputs.forEach((elem)=>this.addInput(elem));
    Generator.calculateResults();
  }
  //

  // THEME CHANGE FEATURE -->
  static cssVaribles = [
    "--operation-btn-second",
    "--header-btn-backG",
    "--input-main-bckg",
    "--operator-modal-backG",
  ];

  static themeSwatchTitles = [
    "Operation Button",
    "Main Button",
    "Modal Background",
    "Popup Background",
  ];

  // static themeDefault = {
  //   default: ["#6adb35", "#FFC165", "#ADADAD","#204a87"],
  //   option: ["#edd400", "#e45555", "#d3d7cf","#ce5c00"],
  //   custom: ["#3d18c1", "#d15f96", "#592e61","#b273cf"],
  //   contrast: ["#3d18c1", "#d15f96", "#592e61","#b273cf"],
  // };

  static theme = {
    default: ["#6adb35", "#FFC165", "#ADADAD", "#204a87"],
    option: ["#edd400", "#e45555", "#d3d7cf", "#ce5c00"],
    custom: ["#3d18c1", "#d15f96", "#592e61", "#b273cf"],
    contrast: ["#3d18c1", "#d15f96", "#592e61", "#b273cf"],
  };

  static actualTheme = "default";

  static themeSave() {
    localStorage.setItem("theme", JSON.stringify(this.theme));

    console.log("GENERATOR - LOCAL THEME SAVED ");
  }

  static themeLoad() {
    const newTheme = JSON.parse(localStorage.getItem("theme"));
    const newActualTheme = localStorage.getItem("actualTheme");
    !!localStorage.getItem("theme") ? (Generator.theme = newTheme) : null;

    !!localStorage.getItem("actualTheme")
      ? (Generator.actualTheme = newActualTheme)
      : null;

    Generator.themeApply();

    console.log("GENERATOR - Theme loadad successfully");
  }

  static themeApply(passedTheme) {
    !!passedTheme ? (this.actualTheme = passedTheme) : null;

    localStorage.setItem("actualTheme", this.actualTheme);

    this.cssVaribles.forEach((varible, idx) =>
      document.documentElement.style.setProperty(
        varible,
        this.theme[this.actualTheme][idx]
      )
    );

    console.log(`THEME "${this.actualTheme}" APPLIED`);
  }
  //  <--THEME CHANGE FEATURE

  static inputFinder(searchedID) {
    return this.inputs.find((e) => e.id === searchedID);
  }

  static inputRemover(containerID) {
    const toRemEleIdx = this.inputs.indexOf(
      this.inputs.find((e) => e.id === containerID)
    );
    this.trash.push(...this.inputs.splice(toRemEleIdx, 1));
    // Save Actual Stateto localStoreAPI trash and inputs
    Generator.inputsSave();
    Generator.trashSave();
  }

  static calculateResults() {
    const resultInput = document.getElementById("resultInput");
    let counter = 0;
    let modifier = 0;
    for (const element of this.inputs) {
      if (element.switcher) {
        modifier = +element.mainVal;

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

        // console.log("Counter", counter);
      }
    }

    resultInput.value = counter.toFixed(2);

    Generator.inputsSave();
    return counter;
  }

  static addInput(historyInput) {
    // Create Input-main element for now without params, will change.
    console.log("GENERATOR - Arguments with input: ", !!historyInput);
    !!historyInput
      ? console.log(historyInput.id[historyInput.id.length - 1])
      : null;
    // const id = this.inputs.length + 1; // wrong attempt
    // const id = ++this.id;
    // error here wrong id calculation
    // const id = !!historyInput ? +Generator.inputs[Generator.inputs.length-1].id.slice(11)+1 : this.inputs.length+1;
    // !!historyInput ? console.log('ID calc: ',+Generator.inputs[Generator.inputs.length-1].id.slice(11)+1) : null;

    // const id = !!historyInput
    //   ? +historyInput.id[historyInput.id.length - 1]
    //   : Generator.inputs.length
    //   ? +Generator.inputs[Generator.inputs.length - 1].id.slice(11) + 1
    //   : 1;
    let id;
    if (!!historyInput) {
      id = +historyInput.id[historyInput.id.length - 1];
    } else if (Generator.inputs.length) {
      id = +Generator.inputs[Generator.inputs.length - 1].id.slice(11) + 1;
    } else {
      id = 1;
    }
    //(+Generator.inputs[Generator.inputs.length-1].id.slice(11)+1)
    // change when historyInput exist and new one is create

    //====================================
    const smallContId = "Input-cont-" + id;
    //====================================
    const mainInputId = "InputMain-" + id;

    const sliderMenuId = "SliderMenu-" + id;
    const sliderMenuOpen = "SliderMenuOpen-" + id;
    const sliderMod = "SliderMod-" + id;
    const sliderSwitch = "SliderSwitch-" + id;
    const sliderDelete = "SliderDelete-" + id;
    const operModId = "OperMod-" + id;

    // this.inputs.push(new Input(smallContId));
    !!historyInput ? null : this.inputs.push(new Input(smallContId));

    // was mainInputId
    // Input Item container creation with current id
    new InputItem("container", "input-container", [
      { name: "id", value: smallContId },
    ]);
    console.log("Test:", Generator.inputs[id - 1]);
    //==============================
    // input-container childrens
    new InputItem(smallContId, "input-main", [
      { name: "id", value: mainInputId },
    ]);
    //input-main children
    //==============================
    this.oprMainBtn = new OperationBtnInput(
      mainInputId,
      !!historyInput ? historyInput.mainOperator : "+"
    );
    this.oprMainBtn.elem.addEventListener("click", (e) => {
      e.target.nextSibling.classList.toggle("hide");
    });
    new OperatorModal(mainInputId, [{ name: "id", value: operModId }]);

    new InputNumber(
      mainInputId,
      "",
      !!historyInput
        ? [{ name: "value", value: historyInput.mainVal }]
        : [{ name: "value", value: 0 }]
    );

    new OperationBtnInput(mainInputId, "+", "smaller hide");

    //modified inputNumber with value from SliderMod manipulation.
    new InputNumber(mainInputId, "modified hide", [
      { name: "placeholder", value: "new" },
    ]);
    //add feature which modified value.

    //modified inputNumber with value from SliderMod manipulation.
    // new InputNumber(mainInputId, "modified hide", [{name: 'readonly', value: 'readonly'}]);
    //add feature which modified value.

    //==============================

    new SliderMenuClosed(smallContId, [{ name: "id", value: sliderMenuId }]);

    new SliderMenuOpen(smallContId, [{ name: "id", value: sliderMenuOpen }]);
    //Slider mod open
    new SliderMod(smallContId, [{ name: "id", value: sliderMod }]);

    //Slider Switch open
    new SliderSwitch(smallContId, [{ name: "id", value: sliderSwitch }]);
    //Slider delete open
    new SliderDelete(smallContId, [{ name: "id", value: sliderDelete }]);
  }
}
// New Input button
class NewInput extends Component {
  constructor(hookId, operator) {
    super(hookId, false);
    this.operator = operator;
    this.render();
  }

  createNewInput() {
    Generator.addInput();
    Generator.inputsSave();
  }

  render() {
    const startOpr = this.createComp("button", "operation-btn bigger");
    startOpr.innerHTML = this.operator;
    startOpr.addEventListener("click", this.createNewInput.bind(this));
  }
}

class Container extends Component {
  constructor(hookId, ownId) {
    super(hookId, false);
    this.ownId = ownId;
    this.render();
  }

  render() {
    this.createComp("div", "container", [{ name: "id", value: this.ownId }]);
  }
}

class App {
  static closeModal(e) {
    // for slider mod inside operator modal closing

    const sliderMod = document.querySelectorAll(".slider-mod");
    const sliderMenuOpen = document.querySelectorAll(".slider-menu-open");
    const sliderDelete = document.querySelectorAll(".slider-delete");
    const sliderSwitch = document.querySelectorAll(".slider-switch");
    const operatorModal = document.querySelectorAll(".operator-modal");

    const modals = [
      sliderMod,
      sliderMenuOpen,
      sliderDelete,
      sliderSwitch,
      operatorModal,
    ];

    modals.forEach((modal) => {
      modal.forEach((slider) => {
        if (!slider.matches(".hide")) {
          if (!slider.contains(e.target)) {
            slider.classList.add("hide");
            console.log("other events");
          }
        }
      });
    });

    // closing options modal
    const optionsModal = document.getElementById("options-modal");
    const optionsBtn = document.querySelectorAll(".uniBtn");
    const myEvent = new Event("closeOptionModal");
    if (
      !optionsModal.contains(e.target) &&
      e.target == optionsBtn[1] &&
      optionsModal.classList.contains("hide")
    ) {
      // console.log('close modalOption' , optionsModal.classList.contains("hide"));
      optionsModal.classList.toggle("hide");
      // console.log(e.target);
      // console.log(optionsBtn[1]);
      // console.log(e.target == optionsBtn[1]);
      // console.log("Only when closing options-modal");
      console.log("turn on ");
    } else if (
      !optionsModal.contains(e.target) &&
      e.target == optionsBtn[1] &&
      !optionsModal.classList.contains("hide")
    ) {
      optionsModal.classList.add("hide");
      // console.log('else e.target == optionsBtn[1]')
      console.log("turn off 1 ");
      // custom Event
      // const myEvent = new Event("closeing");
      // const myEvent = new CustomEvent("closeing",{detail: "Way first of closeing modal"});
      optionsModal.dispatchEvent(myEvent);
      // console.log(optionsModal.children);
    } else if (
      !optionsModal.contains(e.target) &&
      e.target != optionsBtn[1] &&
      !optionsModal.classList.contains("hide")
    ) {
      optionsModal.classList.add("hide");
      console.log("turn off 2");
      // const myEvent2 = new Event("closeing");
      // const myEvent2 = new CustomEvent("closeing",{detail: "Way second of closeing modal"});
      optionsModal.dispatchEvent(myEvent);
      // console.log('else e.target != optionsBtn[1]')
    }
  }

  static init() {
    const header = new HeaderComp("app");
    const options = new ModalOptions("app");
    const container = new Container("app", "container");
    const generator = new Generator();
    const startBtn = new NewInput("app", "+");
    const app = document.getElementById("app");
    app.addEventListener("click", this.closeModal.bind(this), true);
    addEventListener("load", () => {
      Generator.themeLoad();
      Generator.trashLoad();
      // History load from LocalStore
      Generator.loadHistory();
    });
  }
}

App.init();
