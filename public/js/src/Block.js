const PIXI = require('pixi.js');
const KEY_CODES = {  65: 'a', 83: 's',  75: 'k',  76: 'l'}; //todo get this from InputManager
const Assets = require('./Assets.js');

class Block extends PIXI.Container {
  constructor({ keyCode, soundId,instrumentId, x = 0, y = 0, speed = 4 } = {}) {
    super();

    this.keyCode = keyCode;
    this.instrumentId = instrumentId;
    this.soundId = soundId;
    this._speed = speed;
    this.top = 46;
    this.bottom = 122;
    this.x = x;
    this.y = y;

    const tile = KEY_CODES[keyCode] + 'Tile';
    const background = new PIXI.Sprite(Assets.images[tile]);
    // background.beginFill(0x999999);
    // background.drawRect(0, 0, 20, 20);
    //  console.log(text);
    TweenMax.fromTo(this.scale, 1, {x: 0.65, y: 0.65}, {x: 1, y: 1, ease: Power0.easeNone})

    this.addChild(background);
  }

  update(){
    this.y += this._speed;
    //console.log(this.y);
  }
}


module.exports = Block;