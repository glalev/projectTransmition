const PIXI = require('pixi.js');
const _ = require('underscore');
const Assets = require('../Assets.js');
const RotatingSprite = require('../RotatingSprite.js');
const GameObject = require('./GameObject.js');

class Player extends GameObject {
    constructor(uniqueId) {
        super(uniqueId);

        let config = {
            startDir: 4
        };

        this.sprite = new RotatingSprite(Assets.spriteSheets.vehicles1.slice(8, 16), config);
        this.sprite.anchor.set(0.5,0.5);
        this.addChild(this.sprite);
    }

    set angle (val){
        this.sprite.angle = val;
    }

    get angle (){
        return this.sprite.angle;
    }
}
module.exports = Player;
