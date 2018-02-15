const PIXI = require('pixi.js');
const Assets = require('../Assets.js');
const GameObject = require('./GameObject.js');

class Bullet extends GameObject {
  constructor(uniqueId) {
    super(uniqueId);

    this.sprite = new PIXI.Sprite(Assets.images.Ply);

    Assets.sounds.exp0.volume(0.5).play();
    rumble(3,3,1.5);

    this.sprite.anchor.set(0.5,0.5);
    this.addChild(this.sprite);
  }
}
module.exports = Bullet;
