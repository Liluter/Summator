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

class HeaderComp extends Component {
  constructor(hookId) {
    super(hookId, false);
    this.showValue = () => {
      console.log("Actual Result : ", this.input, InputContainer.inputs);
    };
    this.render();
  }

  render() {
    const headerEl = this.createComp("div", "header-container");
    headerEl.innerHTML = `
    <button class='result-btn'>Result</button>
    <input inputmode='numeric' value='0.00' class='header-input' readonly>
    `;
    const resultBtn = headerEl.querySelector("button");
    const input = headerEl.querySelector("input");
    this.input = input.value;
    resultBtn.addEventListener("click", this.showValue);
  }
}

class Input {
  constructor(
    id,
    mainOperator = "+",
    mainVal = 0,
    modOperator = "+",
    mod = false,
    switcher = true,
    del = false
  ) {
    this.id = id;
    this.mainOperator = mainOperator;
    (this.mainVal = mainVal.toFixed(2)), (this.modOperator = modOperator);
    this.mod = mod;
    this.switcher = switcher;
    this.delete = del;
  }
}

class SwitchInd extends Component {
  constructor(hookId, classes, attr) {
    super(hookId, false);
    this.classes = classes;
    this.render();
  }

  switchHandler(e) {
    e.target.classList.toggle("off");
  }

  render() {
    this.elem = this.createComp("button", this.classes, this.attr);
    this.elem.addEventListener("click", this.switchHandler);
  }
}

class SliderMenuClosed extends Component {
  list = ["mod", "switch", "delete"];
  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.elem;
    this.render();
  }

  render() {
    const sliderClo = this.createComp("div", "slider-menu-closed", this.attr);
    for (let el of this.list) {
      console.log(el)
      const newIt = new SwitchInd(sliderClo.id, el);
      sliderClo.append(newIt.elem);
    }
  }
}


class OperationBtnInput extends Component {
  constructor(hookId, operator, attr) {
    super(hookId, false);
    this.operator = operator;
    this.attr = attr;
    this.render();
    this.elem;
  }

  // operationHandler(e) {
  //   console.log(e.target)
  // }

  render() {
    this.elem = this.createComp("button", "operation-btn");
    this.elem.innerHTML = this.operator;
    // this.elem.addEventListener("click", this.operationHandler.bind(this));
  }
}

class InputNumber extends Component {
  constructor(hookId) {
    super(hookId, false);
    this.elem;
    this.render();
  }

  valueHandler(e) {
    Generator.inputs.find((e) => e.id === this.hookId).mainVal = e.target.value;
    console.log("target val: ", e.target.value, "Items: ", Generator.inputs);
  }

  render() {
    this.elem = this.createComp("input", "input-num", [
      { name: "placeholder", value: "put number" },
    ]);
    this.elem.addEventListener("change", this.valueHandler.bind(this));
  }
}

class OperatorModal extends Component {
  operators = ["+", "-", "x", "/", "%"];
  buttons = [];

  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.elem;
    this.render();
  }
  operatorHandler(e) {
    e.target.parentElement.classList.toggle("hide");
    Generator.inputs.find((e) => e.id === this.hookId).mainOperator =
      e.target.innerHTML;
    e.target.parentElement.parentElement.firstChild.innerHTML =
      e.target.innerHTML;
    console.log("Input list : ", Generator.inputs);
  }

  render() {
    this.elem = this.createComp("div", "operator-modal hide", this.attr);

    for (const btn of this.operators) {
      this.buttons.push(new OperationBtnInput(this.elem.id, btn));
    }
    this.buttons.forEach((e) =>
      e.elem.addEventListener("click", this.operatorHandler.bind(this))
    );
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
  static oprMainBtn;

  static addInput() {
    const id = this.inputs.length + 1;
    const smallContId = "input-cont-" + id;
    const mainInputId = "InputMain-" + id;
    this.inputs.push(new Input(mainInputId));

    new InputItem("container", "input-container", [
      { name: "id", value: smallContId },
    ]);
    new InputItem(smallContId, "input-main", [
      { name: "id", value: mainInputId },
    ]);
    new SliderMenuClosed(smallContId);
    //Slider mod open
    //Slider Switch open
    //Slider delete open

    //InputMain children
    this.oprMainBtn = new OperationBtnInput(mainInputId, "+");
    this.oprMainBtn.elem.addEventListener("click", (e) => {
      e.target.nextSibling.classList.toggle("hide");
    });
    const operModId = "OperMod-" + id;
    new OperatorModal(mainInputId, [{ name: "id", value: operModId }]);
    new InputNumber(mainInputId);
  }
}

class NewInput extends Component {
  constructor(hookId, operator) {
    super(hookId, false);
    this.operator = operator;
    this.render();
  }

  createNewInput() {
    Generator.addInput();
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
  static init() {
    const header = new HeaderComp("app");
    const container = new Container("app", "container");
    const generator = new Generator();
    const startBtn = new NewInput("app", "+");
  }
}

App.init();
