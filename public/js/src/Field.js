const PIXI = require('pixi.js');

class Field extends PIXI.Container {
  constructor({ x, y, width, height, zone }) {
    super();
    this.x = x;
    this.y = y;

    this._blocks = [];


    this._background = new PIXI.Graphics();
    this._background.beginFill(0x777777);
    this._background.drawRect(0, 0, width, height);

    this._zone = new PIXI.Graphics();
    this._zone.beginFill(0x007700);
    this._zone.y = zone.start
    this._zone.drawRect(0, 0, width, zone.end - zone.start);
    this.addChild(this._background, this._zone);
  }

  update(){
      this._blocks.forEach((block) => block.update());
  }
}

module.exports = Field;