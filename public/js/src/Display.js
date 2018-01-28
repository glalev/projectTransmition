const PIXI = require('pixi.js');
const Assets = require('./Assets.js');

class Display extends PIXI.Container {
  constructor({ x = 0, y = 0, width = 720, height = 320 } = {}) {
    super();
    const background = new PIXI.Graphics();
    background.beginFill(0xff0000);
    background.drawRect(0, 0, width, height)
    this.addChild(background);
  }

  payVideo(video) {

  }
}


module.exports = Display;