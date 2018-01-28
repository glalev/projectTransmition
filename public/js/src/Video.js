const PIXI = require('pixi.js');
const Assets = require('./Assets');
const { Power2, TweenMax } = require('gsap');

class Video extends PIXI.Container {

  constructor() {
    super();
  }

  fade(from, to, duration) {
    this.alpha = from;
    TweenMax.to(this, duration, { alpha: to, ease: Power2.easeInOut });
    
    return this;
  }

  play(name) {
    return new Promise(resolve => {
      const texture = PIXI.Texture.fromVideo(Assets.videos[name]);
      const sprite = new PIXI.Sprite(texture);
      sprite.width = 1280;
      sprite.height = 720;

      this.removeChildren();
      this.addChild(sprite);
      texture.baseTexture.source.onended = () => {
        this.removeChild(sprite);
        resolve();
      }
    });
  }
}

module.exports = Video;