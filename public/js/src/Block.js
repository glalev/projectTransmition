const PIXI = require('pixi.js');

class Block extends PIXI.Container {
  constructor({ keyCode, soundId, speed = 0.2 }) {
    super();

    this._keyCode = keyCOde;
    this._soundId = soundId;

    this._background = new PIXI.Graphics();
    this._background.beginFill(0x777777);
    this._background.drawRect(0, 0, 60, 60);
  }

  update(){
    this.y += this.speed;
  }
}


module.exports = Block;