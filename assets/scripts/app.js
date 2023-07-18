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
      console.log("Actual Result : ", this.input, Generator.inputs);
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

class SliderMod extends Component{
  constructor(hookId,attr){
    super(hookId,false);
    this.attr=attr;
    this.render();
  }
//add handler


  render(){
    const elem = this.createComp('div','slider-mod hide',this.attr);
    console.log(this.hookId, this.attr, elem.id)
    const smallOprBtn = new OperationBtnInput(elem.id,'x','smaller');
    const modInput = new InputNumber(elem.id);
    const operatsMod = new OperatorModal(elem.id,[{name: 'id', value:'OprModSmall-'+(this.hookId[this.hookId.length-1])}],'smaller');
    // to be continued...
  }
}

class SliderSwitch extends Component{
  constructor(hookId,attr){
    super(hookId,false);
    this.attr=attr;
    this.render();
  }
//add handler

slideMenuHandler(e){
  // itself
  // open modModal
  // add if statment to choose which btn was pressed switchon switch off
  // add to Generator.inputs;
  console.log(e.target.textContent, );
  console.log('Second ancestor',e.target.parentElement.parentElement.children);
  switch (e.target.textContent) {
    case 'ON' :
      console.log('ON was pressed');
      
      e.target.parentElement.parentElement.children[1].children[1].classList.remove('off');
      break;
    case 'OFF' :
       console.log('OFF was pressed');
      e.target.parentElement.parentElement.children[1].children[1].classList.add('off');
    break;
  }
  e.target.parentElement.classList.toggle('hide')
      // this.elem.parentElement.children[3].classList.toggle('hide')
// console.log(' itself open modModal' );
// create opener SliderMod
}


  render(){
    const elem = this.createComp('div','slider-switch hide',this.attr);
    const switchBtnOn = new SwitchInd(elem.id, 'switch-menu-btn switch off');
    switchBtnOn.elem.innerHTML='ON';
    switchBtnOn.elem.addEventListener('click', this.slideMenuHandler.bind(this));
    const switchBtnOff = new SwitchInd(elem.id, 'switch-menu-btn switch off turnoff');
    switchBtnOff.elem.innerHTML='OFF';
    switchBtnOff.elem.addEventListener('click', this.slideMenuHandler.bind(this));
    // elem.innerHTML = 'SWITCH';
    console.log(this.hookId, this.attr, elem.id)
    // to be continued...
  }
}
class SliderDelete extends Component{
  constructor(hookId,attr){
    super(hookId,false);
    this.attr=attr;
    this.render();
  }
//add handler


  render(){
    const elem = this.createComp('div','slider-delete hide',this.attr);
    const switchBtnOn = new SwitchInd(elem.id, 'switch-menu-btn delete off');
    switchBtnOn.elem.innerHTML='DELETE';
    const switchBtnOff = new SwitchInd(elem.id, 'switch-menu-btn delete off turnoff');
    switchBtnOff.elem.innerHTML='KEEP';
    // elem.innerHTML = 'DELETE';
    console.log(this.hookId, this.attr, elem.id)
    // to be continued...
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

slideMenuHandler(e){
  // itself
e.target.parentElement.classList.toggle('hide');
  // open modModal
  // add if statment to choose which btn was pressed mod switch or delete
  console.log(e.target.textContent)
  switch (e.target.textContent) {
    case 'mod' :
      this.elem.parentElement.children[3].classList.toggle('hide');
      break;
    case 'switch' :
      this.elem.parentElement.children[4].classList.toggle('hide');
      break;
    case 'delete' :
      this.elem.parentElement.children[5].classList.toggle('hide');
      break;
  }
  console.log(this.elem.parentElement.children);
  // this.elem.parentElement.children[3].classList.toggle('hide')
console.log(' itself open modModal' );
// create opener SliderMod
}

  render() {
    this.elem = this.createComp("div", "slider-menu-open hide", this.attr);
    // this.elem.addEventListener('click', this.slideMenuHandler,false);
    for (let el of this.list) {
      const switchBtn = new SwitchInd(this.elem.id, 'switch-menu-btn off ' + el);
      switchBtn.elem.innerHTML = el;
      switchBtn.elem.addEventListener('click', this.slideMenuHandler.bind(this));
      
    }
  }
}

class SwitchInd extends Component {
  constructor(hookId, classes, attr) {
    super(hookId, false);
    this.attr=attr;
    this.classes = classes;
    this.elem;
    this.render();
  }

  switchHandler(e) {
    e.target.classList.toggle("off");
  }

  render() {
    this.elem = this.createComp("button", this.classes, this.attr);
    // this.elem.addEventListener("click", this.switchHandler);
  }
}

class SliderMenuClosed extends Component {
  list = ["mod", "switch", "delete"];
  constructor(hookId, attr) {
    super(hookId, false);
    this.attr = attr;
    this.render();
  }

slideMenuHandler(){
  this.elem.nextElementSibling.classList.toggle('hide');
}

  render() {
    this.elem = this.createComp("div", "slider-menu-closed", this.attr);
    this.elem.addEventListener('click', this.slideMenuHandler.bind(this),true);
    for (let el of this.list) {
      const classes = 'switch-indicator '+ el;
      if (el !== 'switch') {
        const switchBtn = new SwitchInd(this.elem.id, classes + ' off');
      } else {
        const switchBtn = new SwitchInd(this.elem.id, classes );
      }
      // need to set without off class for switch btn indiator ... done.
    }
  }
}


class OperationBtnInput extends Component {
  constructor(hookId, operator,classes, attr) {
    super(hookId, false);
    this.operator = operator;
    this.classes=classes;
    this.attr = attr;
    this.render();
    this.elem;
  }

  // operationHandler(e) {
  //   console.log(e.target)
  // }

  render() {
    this.elem = this.createComp("button", "operation-btn " + this.classes);
    this.elem.innerHTML = this.operator;
    // this.elem.addEventListener("click", this.operationHandler.bind(this));
  }
}

// class ModInputNumber extends Component {}
//=========================================
//=========================================

class InputNumber extends Component {
  constructor(hookId) {
    super(hookId, false);
    this.elem;
    this.render();
  }

  valueHandler(e) {
    console.log('InputNumber class hookId:',this.hookId)
    Generator.inputs.find((e) => e.id === this.hookId).mainVal = e.target.value;
    console.log("target val: ", e.target.value, "Items: ", Generator.inputs);
  }

  render() {
    this.elem = this.createComp("input", "input-num", [
      { name: "placeholder", value: "set number" },
    ]);
    this.elem.addEventListener("change", this.valueHandler.bind(this));
  }
}

class OperatorModal extends Component {
  operators = ["+", "-", "x", "/", "%"];
  buttons = [];

  constructor(hookId, attr, classes) {
    super(hookId, false);
    this.attr = attr;
    this.classes=classes;
    this.elem;
    this.render();
  }
  operatorHandler(e) {
    e.target.parentElement.classList.toggle("hide");
    console.log(e.id, this.hookId)
    Generator.inputs.find((e) => e.id === this.hookId).mainOperator =
      e.target.innerHTML;
    e.target.parentElement.parentElement.firstChild.innerHTML =
      e.target.innerHTML;
    console.log("Input list : ", Generator.inputs);
  }

  render() {
    this.elem = this.createComp("div", "operator-modal hide "+ this.classes, this.attr);

    for (const operator of this.operators) {
      this.buttons.push(new OperationBtnInput(this.elem.id, operator,this.classes));
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
    //====================================
    const mainInputId = "InputMain-" + id;
    
    const sliderMenuId = "SliderMenu-" + id;
    const sliderMenuOpen = "SliderMenuOpen-" + id;
    const sliderMod = "SliderMod-" + id;
    const sliderSwitch = "SliderSwitch-" + id;
    const sliderDelete = "SliderDelete-" + id;
    const operModId = "OperMod-" + id;
    this.inputs.push(new Input(mainInputId));

    new InputItem("container", "input-container", [
      { name: "id", value: smallContId },
    ]);
    new InputItem(smallContId, "input-main", [
      { name: "id", value: mainInputId },
    ]);
    new SliderMenuClosed(smallContId,[{name:'id', value:sliderMenuId}]);
    
    new SliderMenuOpen(smallContId, [{name:'id', value: sliderMenuOpen}])
    //Slider mod open
    new SliderMod(smallContId,[{name: 'id', value: sliderMod }]);
    
    //Slider Switch open
    new SliderSwitch(smallContId,[{name: 'id', value: sliderSwitch }]);
    //Slider delete open
    new SliderDelete(smallContId,[{name: 'id', value: sliderDelete }]);

    //InputMain children
    this.oprMainBtn = new OperationBtnInput(mainInputId, "+");
    this.oprMainBtn.elem.addEventListener("click", (e) => {
      e.target.nextSibling.classList.toggle("hide");
    });
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
