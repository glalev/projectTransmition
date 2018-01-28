const PIXI = require('pixi.js');
const KEY_CODES = {  65: 'a', 83: 's',  75: 'k',  76: 'l'}; //todo get this from InputManager
const Assets = require('./Assets.js');
require('pixi-animate');
const CheeringEffect = require('../lib/CheeringEffect.js').stage;


class Block extends PIXI.Container {
  constructor({ keyCode, soundId,instrumentId, x = 0, y = 0, target = 100 } = {}) {
    super();

    this.keyCode = keyCode;
    this.instrumentId = instrumentId;
    this.soundId = soundId;
    this.isAlive = true;
    this._target = target;
    this.top = 46;
    this.bottom = 122;
    this.x = x;
    this.y = y;

    const tile = KEY_CODES[keyCode] + 'Tile';
    this.background = new PIXI.Sprite(Assets.images[tile]);
    // background.beginFill(0x999999);
    // background.drawRect(0, 0, 20, 20);
    //  console.log(text);
    TweenMax.fromTo(this.scale, 1, {x: 0.65, y: 0.65}, {x: 1, y: 1, ease: Power0.easeNone})
    this.tween = TweenMax.to(this, 1.2, {y: this._target, ease: Power0.easeNone, onComplete: ()=>{
        this.onTargetReached();
    }})

    this.addChild(this.background);
  }

  update(){
    //console.log(this.y);
  }

  onTargetReached() {
    TweenMax.to(this, 0.5, {y: 410, ease: Power0.easeNone});

  }
}


module.exports = Block;