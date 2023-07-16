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
      console.log("Actual Result : ", this.input);
      // InputContainer.clearStock();
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


class InputMain extends Component {
  constructor(hookId, ownId) {
    super(hookId, false);
    this.ownId = ownId;
    this.render();
    this.elem;
  }

  render() {
    this.elem = this.createComp("div", "input-main", this.ownId);
    console.log('Test', this.elem.id);

  }

}

class InputContainer extends Component {
  static inputs = [];

  constructor(hookId) {
    super(hookId, false);
    this.render();
  }

  static addInput() {
    const id = this.inputs.length - 1;
    const nextId = 'InputMain-'+id;
    this.inputs.push(new Input(nextId));
    const newInputMain = new InputMain("input-cont", [{name: 'id', value: nextId}]);
    console.log(newInputMain.elem);
    const operBtn = new OperationBtnInput(nextId, '+');

  }

  static renderItems() {
    const parent = document.getElementById("input-cont");
  }

  static clearStock() {
    // this.inputs = [];
  }
  render() {
    const inputIt = this.createComp("div", "input-container");
    inputIt.id = "input-cont";
  }
}

class OperationBtnInput extends Component {
  constructor(hookId, operator) {
    super(hookId, false);
    this.operator = operator;
    this.render();
  }

  operationHandler(){

  }

  render() {
    const operBtn = this.createComp("button", "operation-btn");
    operBtn.innerHTML = this.operator;
    operBtn.addEventListener("click", this.operationHandler);
  }
}

class OperationBtn extends Component {
  constructor(hookId, operator) {
    super(hookId, false);
    this.operator = operator;
    this.render();
  }

  createNewInput() {
    console.log("After + pressed new inputMain will create");
    InputContainer.addInput();
    InputContainer.renderItems();
  }

  render() {
    console.log("Render func in OperationBtnClass");
    const startOpr = this.createComp("button", "operation-btn bigger");
    startOpr.innerHTML = this.operator;
    startOpr.addEventListener("click", this.createNewInput.bind(this));
  }
}

const header = new HeaderComp("app");
const startBtn = new OperationBtn("app", "+");
const inputCon = new InputContainer("app");
