const PIXI = require('pixi.js');
const Assets = require('../Assets.js');

class GameObject extends PIXI.Container {
  constructor(uniqueId, asset) {
    super();

    this.uniqueId = uniqueId;
    this.sprite = new PIXI.Sprite(asset);
    this.sprite.anchor.set(0.5,0.5);
    this.addChild(this.sprite);
  }

  set angle (val){
      this.rotation = val;
  }

  get angle (){
      return this.rotation;
  }
}
module.exports = GameObject;
