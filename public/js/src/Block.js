const PIXI = require('pixi.js');

class Block extends PIXI.Container {
  constructor({ keyCode, soundId, speed = 1 } = {}) {
    super();

    this.keyCode = keyCode;
    this.soundId = soundId;

    this._speed = speed;

    this._background = new PIXI.Graphics();
    this._background.beginFill(0x999999);
    this._background.drawRect(0, 0, 20, 20);

    this.addChild(this._background);
  }

  update(){
    this.y += this._speed;
    //console.log(this.y);
  }
}


module.exports = Block;