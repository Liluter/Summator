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
    this.render();
  }
  
  showValue = () => {
    console.log("Actual Result : ", this.input.value, Generator.inputs);
    Generator.calculateResults();
  }

  render() {
    const headerEl = this.createComp("div", "header-container");
    headerEl.innerHTML = `
    <button class='result-btn'>Result</button>
    <input id='resultInput' inputmode='numeric' value='0.00' class='header-input' readonly>
    `;
    const resultBtn = headerEl.querySelector("button");
    this.input = headerEl.querySelector('input');
    resultBtn.addEventListener("click", this.showValue.bind(this));
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
    this.mainVal = mainVal.toFixed(2) ;
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
  oprBtnHandler(e){
    e.target.nextElementSibling.nextElementSibling.classList.toggle('hide');
  }



  modInputHandler(e){
    const ancestorCont = e.target.closest(".input-container");
    const modIndicator = ancestorCont.children[1].children[0];
    const inputNumModified = ancestorCont.children[0].children[3];
    const actualModOperator = Generator.inputFinder(ancestorCont.id).modOperator;
    if (e.target.value ) {
      modIndicator.classList.remove('off');
      inputNumModified.value=e.target.value;
      inputNumModified.classList.remove('hide');
    } else if (actualModOperator !== "+") {
      modIndicator.classList.remove('off');
      inputNumModified.value=e.target.value;
      inputNumModified.classList.add('hide');
    }
    else
    {
      modIndicator.classList.add('off');
      inputNumModified.classList.add('hide');
      //switching operator to default
      Generator.inputFinder(ancestorCont.id).modOperator = "+";
    }
    // show value in modified input handler

  }

  render() {
    const elem = this.createComp("div", "slider-mod hide", this.attr);
    console.log(this.hookId, this.attr, elem.id);
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


    smallOprBtn.elem.addEventListener('click', this.oprBtnHandler.bind(this));
    modInput.elem.addEventListener('input', this.modInputHandler.bind(this));
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
        break;
      case "OFF":
        ancestorCont.children[1].children[1].classList.add("off");
        ancestorCont.classList.add("disabled");
        Generator.inputFinder(ancestorCont.id).switcher = false;
        break;
    }
    e.target.parentElement.classList.toggle("hide");
  }

  render() {
    const elem = this.createComp("div", "slider-switch hide", this.attr);
    const switchBtnOn = new SwitchInd(elem.id, "switch-menu-btn switch off");
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
            ancestorCont.remove();
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
  constructor(hookId, operator, classes='', attr) {
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
  constructor(hookId, classes="", attributes=[], classes="", attributes=[]) {
    super(hookId, false);
    this.classes = classes;
    this.attributes = attributes;
    this.classes = classes;
    this.attributes = attributes;
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
  keyDownHandler(e){
    if (("0123456789.".includes(e.key)) && (typeof +e.target.value === 'number') || (e.key === 'Backspace')) {
    } else {
      e.preventDefault();      
    }
  }

  render() {
    this.elem = this.createComp("input", "input-num " + this.classes , [
      { name: "placeholder", value: "set" },
      { name: "inputmode", value: "numeric" },
      ...this.attributes
      ...this.attributes
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

    console.log('Value changed', e.target);
  }
}

class OperatorModal extends Component {
  operators = ["+", "-", "x", "/", "%"];
  buttons = [];

  constructor(hookId, attr, classes='') {
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
    // console.log('You clicked ', e.target.innerHTML)
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
      e.target.parentElement.classList.toggle("hide");
      const modValue =  Generator.inputFinder(ancestorCont.id).modValue;

      if ( (e.target.innerHTML !== '+' && !modValue) || 
      (modValue) )  {
        modIndicator.classList.remove('off');
      } else {
        modIndicator.classList.add('off');
      }
      Generator.inputFinder(ancestorCont.id).modOperator = e.target.innerHTML;
      e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML =
        e.target.innerHTML;
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
  static id = 0;

  static inputFinder(searchedID) {
    return this.inputs.find((e) => e.id === searchedID);
  }

  static inputRemover(containerID) {
    const toRemEleIdx = this.inputs.indexOf(
      this.inputs.find((e) => e.id === containerID)
    );
    this.trash.push(this.inputs.splice(toRemEleIdx, 1));
  }

  static calculateResults() {
    const resultInput = document.getElementById("resultInput");
    let counter = 0;
    let modifier = 0;
    for (const element of this.inputs) {
      console.log("Cumulative loop: ", +element.mainVal);
      console.log('Mod Value', +element.modValue)
      console.log('Mod Operator', element.modOperator)
      modifier = +element.mainVal;

      switch (element.modOperator) {
        case "+":
          modifier +=  +element.modValue;
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
          counter += modifier ;
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

      
      console.log("Counter", counter);

    }

    resultInput.value = counter.toFixed(2);

    return counter;
  }

  static addInput() {
    // const id = this.inputs.length + 1; // wrong attempt
    const id = ++this.id;
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
    this.inputs.push(new Input(smallContId));
    // was mainInputId

    new InputItem("container", "input-container", [
      { name: "id", value: smallContId },
    ]);
    //==============================
    // input-container children
    new InputItem(smallContId, "input-main", [
      { name: "id", value: mainInputId },
    ]);
    //==============================
    //input-main children
    this.oprMainBtn = new OperationBtnInput(mainInputId, "+");
    this.oprMainBtn.elem.addEventListener("click", (e) => {
      e.target.nextSibling.classList.toggle("hide");
    });
    new OperatorModal(mainInputId, [{ name: "id", value: operModId }]);
    new InputNumber(mainInputId);

    //modified inputNumber with value from SliderMod manipulation.
    new InputNumber(mainInputId, "modified hide", [{name: 'readonly', value: 'readonly'}]);
    //add feature which modified value.


    //modified inputNumber with value from SliderMod manipulation.
    new InputNumber(mainInputId, "modified hide", [{name: 'readonly', value: 'readonly'}]);
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

  static closeModal(e){
// for slider mod inside operator modal closing

    const sliderMod = document.querySelectorAll('.slider-mod');
    const sliderMenuOpen = document.querySelectorAll('.slider-menu-open');
    const sliderDelete = document.querySelectorAll('.slider-delete');
    const sliderSwitch = document.querySelectorAll('.slider-switch');
    const operatorModal = document.querySelectorAll('.operator-modal');
    
    const modals = [sliderMod, sliderMenuOpen, sliderDelete, sliderSwitch,operatorModal];

    modals.forEach((modal) => {
      modal.forEach((slider)=> {
        if (!slider.matches('.hide')) {
          if (!slider.contains(e.target)) {
            slider.classList.add('hide')
          }
        }
      });
    })
  }

  static init() {
    const header = new HeaderComp("app");
    const container = new Container("app", "container");
    const generator = new Generator();
    const startBtn = new NewInput("app", "+");
    const app  = document.getElementById('app');
    app.addEventListener('click', this.closeModal.bind(this), true)
  }
}


App.init();
