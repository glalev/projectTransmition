const PIXI = require('pixi.js');
const KEY_CODES = {  65: 'A', 83: 'S',  75: 'K',  76: 'L'}; //todo get this from InputManager

class Block extends PIXI.Container {
  constructor({ keyCode, soundId,instrumentId, x = 0, y = 0, speed = 4 } = {}) {
    super();

    this.keyCode = keyCode;
    this.instrumentId = instrumentId;
    this.soundId = soundId;
    this._speed = speed;
    this.x = x;
    this.y = y;

    const text = new PIXI.Text(KEY_CODES[keyCode],  {fontFamily : 'Arial', fontSize: 24, fill : 0x000000, align : 'center'});
    const background = new PIXI.Graphics();
    background.beginFill(0x999999);
    background.drawRect(0, 0, 20, 20);
  //  console.log(text);
    this.addChild(background, text);
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