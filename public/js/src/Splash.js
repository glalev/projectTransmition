const PIXI = require('pixi.js');
const Assets = require('./Assets');

class Splash extends PIXI.Container {

  constructor() {
    super();
    this.button = new PIXI.Sprite(Assets.images.StartButton);
    this.button.x = 200;
    this.button.x = 200;

    window.Assets = Assets;
  }

  show() {
    return new Promise(resolve => {
        this.addChild(this.button);
        this.button.interactive = true;
        this.button.once('click', ()=>{
            this.button.interactive = false;
            resolve();
        });
    });
  }
}

module.exports = Splash;
