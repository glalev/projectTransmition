const PIXI = require('pixi.js');
const Assets = require('./Assets.js');

class FlashingThing extends PIXI.Container {
  constructor(asset, endAlpha) {
    super();
    let sprite = new PIXI.Sprite(asset);

    this.endAlpha = endAlpha;
    this.alpha = endAlpha;

    this.addChild(sprite);
  }

  flash(){
    TweenMax.fromTo(this, 0.5, {alpha: 1}, {alpha:this.endAlpha})
  }
}
module.exports = FlashingThing;