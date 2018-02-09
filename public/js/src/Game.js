const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Assets = require('./Assets.js');
const FlashingThing = require('./FlashingThing.js');
const { Power2, TweenMax } = require('gsap').TweenMax;

class Game extends PIXI.Container {

  constructor() {
    super();
    this.localPlayerId = 0;
    this._bg = new PIXI.Sprite(Assets.images.bg1);

    window.Assets = Assets;
    this._input = new InputManager();
    //this._input.on('keydown', ({ keyCode, symbol }) => { });

    this.addChild(this._bg);
  }

  update() {
    this.children.forEach(child => child.update && child.update());
  }

  gameOver(){

  }

  rumble(strength, duration){
    let dummy = {val:100};
    TweenMax.to(dummy, duration, {dummy: 0, onUpdate: ()=>{
      this.x = Math.random() * strength * (dummy.val/100);
      this.y = Math.random() * strength * (dummy.val/100);
    }});
  }
}

module.exports = Game;
