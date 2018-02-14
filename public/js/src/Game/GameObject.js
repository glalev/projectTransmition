const PIXI = require('pixi.js');
const Assets = require('../Assets.js');

class GameObject extends PIXI.Container {
  constructor(uniqueId) {
    super();

    this.uniqueId = uniqueId;
  }

}
module.exports = GameObject;
