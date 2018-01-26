const PIXI = require('pixi.js');

class Game {

  constructor({ width, height, view }) {
    this._stage = new PIXI.Container();
    this._renderer = PIXI.autoDetectRenderer( { width, height, backgroundColor: 0x222222 } );
    view.appendChild(this._renderer.view);
    PIXI.ticker.shared.add(this.update, this);

    // this.g = new PIXI.Graphics();
    // this.g.beginFill(0xffff00);
    // this.g.drawRect(0,0,100,100);
    // this._stage.addChild(this.g);
  }

  update() {
    this._renderer.render(this._stage);
  }

}

module.exports = Game;