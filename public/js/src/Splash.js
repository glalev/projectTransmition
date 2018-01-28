const PIXI = require('pixi.js');
const Flash = require('../lib/SplashScreen.js').stage;
const Assets = require('./Assets');

class Splash extends PIXI.Container {

  constructor() {
    super();
    this._flash = new Flash();
    this._flash.splash.gotoAndStop(0);
    this.addChild(this._flash);
    window.Assets = Assets
  }

  show() {
    Assets.sounds.idleLoop.fade(0, 1, 5000);
    Assets.sounds.idleLoop.play();
    Assets.sounds.idleLoop.loop(true);
    return new Promise(resolve => {
      const mc = this._flash.splash;
      mc.gotoAndPlay('show');
      mc.once('SHOW_END', () => {
        mc.buttonContainer.button.interactive = true;
        mc.buttonContainer.button.once('click', ()=>{
          Assets.sounds.idleLoop.fade(1, 0, 2000);
          mc.gotoAndPlay('hide');
          mc.once('HIDE_END', resolve);
        });
      });
    });
  }


}

module.exports = Splash;