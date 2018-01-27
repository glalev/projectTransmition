const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Field = require('./Field.js');
const CenterBar = require('./CenterBar.js');

class Game extends PIXI.Container {

  constructor() {
    super();
    this._playerField = new Field({x: 100, y: 100, width: 200, height: 400, zone: {start: 300, end: 350, tolerance: 50 } });
    this._input = new InputManager();
    this._input.on('keydown', ({ keyCode, symbol }) => {
      this._playerField.checkInput(keyCode, symbol);
    });

    this._centerBar = new CenterBar();


    this.addChild(this._playerField);
    this.addChild(this._centerBar);
  }

  update() {
    this._playerField.update();
    this._centerBar.update();
  }
}

module.exports = Game;