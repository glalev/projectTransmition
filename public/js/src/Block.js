const PIXI = require('pixi.js');
require('pixi-animate');
const KEY_CODES = {  65: 'a', 83: 's',  75: 'k',  76: 'l'}; //todo get this from InputManager
const Assets = require('./Assets.js');
const flash = require('../lib/Button.js').stage;

class Block extends PIXI.Container {
  constructor({ keyCode, soundId,instrumentId, x = 0, y = 0, speed = 4 } = {}) {
    super();
    this.keyCode = keyCode;
    this.instrumentId = instrumentId;
    this.soundId = soundId;
    this._speed = speed;
    this.top = 22;
    this.bottom = 73
    this.x = x;
    this.y = y;
    this._flash = new flash();
    //this._flash = new flash();
    const tile = KEY_CODES[keyCode] + 'Tile';
    // const text = new PIXI.Text(KEY_CODES[keyCode],  {fontFamily : 'Arial', fontSize: 24, fill : 0x000000, align : 'center'});
    const background = new PIXI.Sprite(Assets.images[tile]);
    //this._flash.addChild();
    // background.beginFill(0x999999);
    // background.drawRect(0, 0, 20, 20);
  //  console.log(text);
  //  this._flash.removeChildren();
    this._flash.play();
    this._flash.instance.container.addChild(background)
    this.addChild(this._flash);
  }

  update(){
    this.y += this._speed;
    if(this.y >= this.parent.height / 2){
        this.scale.x = this.scale.y = this.scale.x + .0002
    }
    //console.log(this.y);
  }
}


module.exports = Block;