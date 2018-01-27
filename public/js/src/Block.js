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
    this.x = x;
    this.y = y;
    const tile = KEY_CODES[keyCode] + 'Tile';
    // const text = new PIXI.Text(KEY_CODES[keyCode],  {fontFamily : 'Arial', fontSize: 24, fill : 0x000000, align : 'center'});
    const background = new PIXI.Sprite(Assets.images[tile]);
    // background.beginFill(0x999999);
    // background.drawRect(0, 0, 20, 20);
  //  console.log(text);
    this.addChild(background);
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