const PIXI = require('pixi.js');
const _ = require('underscore');
const Assets = require('../Assets.js');
const RotatingSprite = require('../RotatingSprite.js');
const LegSystem = require('../LegSystem.js');
const GameObject = require('./GameObject.js');


class Player extends GameObject {
    constructor(uniqueId) {
        super(uniqueId);

        /*let config = {
            startDir: 3
        };

        this.sprite = new RotatingSprite(Assets.spriteSheets.vehicles1.slice(8, 16), config);
        this.sprite.anchor.set(0.5,0.5);*/
        this.sprite = new LegSystem();
        this.addChild(this.sprite);

        this.posUpdated = false;
    }

    update(){
        if(!this.posUpdated) this.sprite.stopWalking();
        if(this.posUpdated) this.posUpdated = false;
    }

    set x (val){
        this.position.x = val;

        this.posUpdated = true;
        this.sprite.startWalking();
    }
    set y (val){
        this.position.y = val;

        this.posUpdated = true;
        this.sprite.startWalking();
    }

    get x (){
        return this.position.x;
    }

    get y (){
        return this.position.y;
    }

    set angle (val){
        this.sprite.angle = val;
    }

    get angle (){
        return this.sprite.angle;
    }
}
module.exports = Player;
