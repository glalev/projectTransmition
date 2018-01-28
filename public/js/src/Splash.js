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
    return new Promise(resolve => {
      Assets.sounds.transition.play();
      Assets.sounds.bgLoop.fade(0, 1, 2000);
      Assets.sounds.bgLoop.play();
      Assets.sounds.bgLoop.loop(true);
      const mc = this._flash.splash;
      mc.gotoAndPlay('show');
      mc.once('SHOW_END', () => {
        mc.buttonContainer.button.interactive = true;
        mc.buttonContainer.button.once('click', ()=>{
          Assets.sounds.bgLoop.fade(1, 0, 2000);
          Assets.sounds.playButton.volume(0.5).play();
          mc.gotoAndPlay('hide');
          mc.once('HIDE_END', resolve);
        });
      });
    });
  }


}

module.exports = Splash;