const PIXI = require('pixi.js');
const Assets = require('./Assets.js');
const _ = require('underscore');

class RotatingSprite extends PIXI.extras.AnimatedSprite {
  constructor(textures, config) {
    super(textures, false);
    this.directions = config.directions || textures.length;
    this.startDir = config.startDir;

    this._minAngle = (Math.PI*2)/this.directions;
    this._angle = 0;
  }

  set angle (val){
      this._angle = val;
      let frame = this.startDir + Math.round(this._angle/this._minAngle);
      this.gotoAndStop(frame);
  }

  get angle (){
      return this._angle;
  }

}
module.exports = RotatingSprite;
