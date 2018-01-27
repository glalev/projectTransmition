const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Field = require('./Field.js');
const CenterBar = require('./CenterBar.js');

class Game extends PIXI.Container {

  constructor() {
    super();

    this._input = new InputManager();
    this._input.on('keydown', ({ keyCode, symbol }) => {
      this._playerField.checkInput(keyCode, symbol);
    });

    this._centerBar = new CenterBar();


    //this.addChild(this._playerField);
    this.addChild(this._centerBar);
  }

  update() {
    this.children.forEach(child => child.update && child.update());
    this._centerBar.update();
  }

  initFields(fields, mainField) {
    fields.map(data => {
      let field = new Field(data);
      this.addChild(field);
      this._playerField = this._fields[mainField];
    });
  }

  get _fields () {
    return this.children.filter(child => child instanceof Field);
  }
}

module.exports = Game;