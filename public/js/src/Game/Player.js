const PIXI = require('pixi.js');
const Assets = require('../Assets.js');
const GameObject = require('./GameObject.js');

class Player extends GameObject {
  constructor(uniqueId) {
    super(uniqueId, Assets.images.Ply);
  }
}
module.exports = Player;
