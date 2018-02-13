const PIXI = require('pixi.js');
const Assets = require('./Assets.js');
const Player = require('./Game/Player.js');
const Bullet = require('./Game/Bullet.js');

class Spawner {
  constructor() {

  }

  spawn(spawnData){
      let newObject;
      switch (spawnData.type) {
          case 1: //Player
            newObject = new Player(spawnData.id);
          break;
          case 2: //Bullet
            newObject = new Bullet(bullet.id);
          break;
      }

      newObject.x = spawnData.x;
      newObject.y = spawnData.y;
      newObject.angle = spawnData.angle;

      return newObject;
  }
}

module.exports = Spawner;
