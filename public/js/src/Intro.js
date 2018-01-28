const PIXI = require('pixi.js');
const Assets = require('./Assets');

class Intro extends PIXI.Container {

  constructor() {
    super();
  }

  play() {
    return new Promise(resolve => {
      const texture = PIXI.Texture.fromVideo(Assets.videos.intro);
      const sprite = new PIXI.Sprite(texture);
      sprite.width = 1280;
      sprite.height = 720;

      this.removeChildren();
      this.addChild(sprite);

      texture.baseTexture.source.onended = resolve;
    });
  }
}

module.exports = Intro;