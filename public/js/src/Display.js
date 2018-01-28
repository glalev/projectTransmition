const PIXI = require('pixi.js');
const Assets = require('./Assets.js');

class Display extends PIXI.Container {
  constructor({ x = 0, y = 0, width = 720, height = 320 } = {}) {
    super();
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this._videos = {}
    const background = new PIXI.Graphics();
    background.beginFill(0x223322);
    background.drawRect(0, 0, width, height)
    this.addChild(background);
  }

  playVideo(video = 'endingVideo') {
    const texture = PIXI.Texture.fromVideo(Assets.videos[video]);
    const sprite = new PIXI.Sprite(texture);

    sprite.width = this.w;
    sprite.height = this.h

    this.removeChildren();
    this.addChild(sprite);
  }
}


module.exports = Display;