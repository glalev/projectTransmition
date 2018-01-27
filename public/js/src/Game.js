const PIXI = require('pixi.js');
const Field = require('./Field.js');

class Game extends PIXI.Container {

  constructor() {
    super();
    //this._stage = new PIXI.Container();
    //this._renderer = PIXI.autoDetectRenderer( { width, height, backgroundColor: 0x222222 } );
    this._playerField = new Field({x: 100, y: 100, width: 200, height: 400, zone: {start: 300, end: 350 } });


    this.addChild(this._playerField);
  }

  update() {
    this._playerField.update();
  }
}

module.exports = Game;