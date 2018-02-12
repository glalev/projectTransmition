const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Assets = require('./Assets.js');
const FlashingThing = require('./FlashingThing.js');
const { Power2, TweenMax } = require('gsap').TweenMax;

class Game extends PIXI.Container {

  constructor(communicator) {
    super();
    window.Assets = Assets;

    this.localPlayerId = 0;
    this._bg = new PIXI.Sprite(Assets.images.bg1);
    this._input = new InputManager();
    this._communicator = communicator;
    this._addServerListeners();
    this._communicator.sendLoginData();

    this.addChild(this._bg);
  }

  update() {
    this.children.forEach(child => child.update && child.update());
  }

  rumble(strength, duration, ease){
    let dummy = {val:1};
    TweenMax.to(dummy, duration, {val: 0, ease: ease || Power0.easeNone, onUpdate: ()=>{
      this.x = Math.random() * strength * dummy.val;
      this.y = Math.random() * strength * dummy.val;
    }});
  }

  _addServerListeners() {
    this._communicator.on('settings', (data) => {

    });

    this._communicator.on('gameUpdate', (data) => {
        console.log("gameupdate:", data);
    });

    this._communicator.on('spawn', (data) => {
        console.log("spawn:", data);
    });

    this._communicator.on('destroy', (data) => {
        console.log("destroy:", data);
    });

    this._communicator.on('message', (data) => {
      console.log("Message received:", data);
      this._onServerMessageReceived(data);
    });

    this._input.on('keyDown', (data) => {
        console.info('keyDown ',data);
        this._communicator.socket.emit('keyDown', data);
    });

    this._input.on('mouseMove', (data) => {
        this._communicator.socket.emit('changeRot', data.rot);
    });

    this._input.on('keyUp', (data) => {
        console.info('keyUp ',data);
        this._communicator.socket.emit('keyUp', data);
    });
  }

  _onServerMessageReceived(message){
    switch (message) {
          case 'test':
          break;
      }
    }
}

module.exports = Game;
