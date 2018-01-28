const PIXI = require('pixi.js');
const Assets = require('./Assets.js');

class Display extends PIXI.Container {
  constructor({ x = 0, y = 0, width = 720, height = 320 } = {}) {
    super();
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    const background = new PIXI.Graphics();
    background.beginFill(0xff0000);
    background.drawRect(0, 0, width, height)
    this.addChild(background);
  }

  playVideo(video='video') {
    const sprite = new PIXI.Sprite(Assets.videos[video]);
    //Assets.videos.video.baseTexture.source.stop();


    sprite.width = this.w;
    sprite.height = this.h

    this.addChild(sprite)
  }
}


module.exports = Display;