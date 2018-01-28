const PIXI = require('pixi.js');
const Assets = require('./Assets.js');


class Background extends PIXI.Container {
  constructor() {
    super();
  }

  flashBg(){
    TweenMax.to(this._backgroundHighLight, 1, {alpha:1}, {alpha:0});
  }
}
module.exports = Background;