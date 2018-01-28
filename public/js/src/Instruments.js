const PIXI = require('pixi.js');
const Assets = require('./Assets.js');

class Instruments extends PIXI.Container {
  constructor() {
    super();

    this.assets = [
      Assets.images.instrument0,
      Assets.images.instrument1,
      Assets.images.instrument2,
      Assets.images.instrument3,
    ]

    this.instruments = [
      this.addInstrument(59,640, this.assets[0]),
      this.addInstrument(480,640, this.assets[1]),
      this.addInstrument(770,640, this.assets[2]),
      this.addInstrument(1150,640, this.assets[3]),
    ];
  }

  addInstrument(x,y, asset){
      let instrument = new PIXI.Sprite(asset);

      instrument.x = x;
      instrument.y = y;
      instrument.scale.x = 0.4;
      instrument.scale.y = 0.4;

      instrument.alpha = 0.5;

      this.addChild(instrument);
      return instrument;
  }

  fade(){
    TweenMax.to(this, 2, {delay:4, alpha:0, ease: Power0.easeNone})
  }

}
module.exports = Instruments;