const PIXI = require('pixi.js');
const _ = require('underscore');
const Assets = require('../Assets.js');
const RotatingSprite = require('../RotatingSprite.js');
const LegSystem = require('../LegSystem.js');
const GameObject = require('./GameObject.js');

class Player extends GameObject {
    constructor(uniqueId) {
        super(uniqueId);

        let config = {
            startDir: 18
        };

        this.body = new RotatingSprite(Assets.spritesheets.top1.array, config);
        this.body.anchor.set(0.5,0.5);
        this.body.y -= 20;

        this.legs = new LegSystem();
        this.legs.on("STEP", ()=>{
            rumble(0,1,1);
            Assets.sounds.heavystep1.volume(0.5).play();
        });

        this.addChild(this.legs, this.body);


        this.posUpdated = false;
        this._prevPos = {x: this.x, y: this.y};
        this._angle = 0;
    }

    update(){
        if(!this.posUpdated && this.legs.walking) this.legs.stopWalking();
        if(this.posUpdated) {
            let deltaX = this.x - this._prevPos.x;
            let deltaY = this.y - this._prevPos.y;
            let angle = -Math.atan2(deltaY, deltaX);
            this.legs.angle = angle;
            this.legs.startWalking();
            this.posUpdated = false;

            this._prevPos.x = this.x;
            this._prevPos.y = this.y;
        }
    }

    set x (val){
        this.position.x = val;

        this.posUpdated = true;
    }
    set y (val){
        this.position.y = val;

        this.posUpdated = true;
    }

    get x (){
        return this.position.x;
    }

    get y (){
        return this.position.y;
    }

    set angle (val){
        this._angle = val;
        this.body.angle = this._angle;
        //this.legs.rotation = this._angle;
    }

    get angle (){
        return this._angle;
    }
}
module.exports = Player;
