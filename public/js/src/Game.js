const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Assets = require('./Assets.js');
const Spawner = require('./Spawner.js');
const Viewport = require('./Viewport.js');
const _ = require('underscore');
const { Power2, TweenMax } = require('gsap').TweenMax;
const radPrecision = 10000;

class Game extends PIXI.Container {

  constructor(communicator) {
    super();
    window.Assets = Assets;

    this.localPlayerId = 0;
    this.localPlayerGameObject = null;
    this.spawner = new Spawner();
    this.viewport = new Viewport(app.renderer, app.WIDTH, app.HEIGHT, app.stage);

    this._bg = new PIXI.Sprite(Assets.images.bg1);
    this._gameObjectsContainer = new PIXI.Container();

    this._input = new InputManager();
    this._communicator = communicator;
    this._addServerListeners();
    this._communicator.sendLoginData();

    this.gameObjects = {};

    this.addChild(this._bg, this._gameObjectsContainer);
  }

  update() {
    let delta = PIXI.ticker.shared.deltaTime/1000;
    this.children.forEach(child => child.update && child.update());

    if(this.localPlayerGameObject) {
        let x = Math.lerp(this.viewport.x, this.localPlayerGameObject.x, 0.1);
        let y = Math.lerp(this.viewport.y, this.localPlayerGameObject.y, 0.1);
        this.viewport.moveTo(x,y);
    }
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
        this.localPlayerId = data.playerId;
        if(!this.gameObjects[data.uniqueId]) return console.error("Unable to find player gameobject,", data);
        this.localPlayerGameObject = this.gameObjects[data.uniqueId];
    });

    this._communicator.on('gameUpdate', (data) => {
        console.log("gameupdate:", data);
        _.each(data, (updateData, id)=>{
            if(!this.gameObjects[id]) return console.error("Trying to update non-existing gameobject,", id, updateData);
            if(updateData.angle) this.gameObjects[id].angle = updateData.angle/radPrecision;
            if(updateData.x) this.gameObjects[id].x = updateData.x;
            if(updateData.y) this.gameObjects[id].y = updateData.y;
        })
    });

    this._communicator.on('spawn', (data) => {
        console.log("spawn:", data);
        _.each(data, (spawnData)=>{
            let newObject = this.spawner.spawn(spawnData);
            this.gameObjects[newObject.uniqueId] = newObject;
            this._gameObjectsContainer.addChild(newObject);
        });
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

    this._input.on('click', (data) => {
        this._communicator.socket.emit('keyDown', "F"); //Fire
    });

    this._input.on('mouseMove', (data) => {
        this._communicator.socket.emit('changeRot', data.rot * radPrecision);
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
