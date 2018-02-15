const PIXI = require('pixi.js');
const Assets = require('./Assets.js');
const RotatingSprite = require('./RotatingSprite.js');
const Leg = require('./Leg.js');
const _ = require('underscore');

class LegSystem extends PIXI.Container {
  constructor(config) {
    super();
    this.config = [{
        startDir: 3,
        id:0,
        walkDuration: 0.5,
        walkHeight: 6,
        walkDistance: 15,
        images: Assets.spritesheets.legL1.array,
        offset: {x:10, y: 0},
        linkedLegs:[1]
    },{
        startDir: 3,
        id:1,
        walkDuration: 0.5,
        walkHeight: 6,
        walkDistance: 15,
        images: Assets.spritesheets.legR1.array,
        offset: {x:-10, y: 0},
        linkedLegs:[0]
    }];

    this.stopping = false;
    this.walking = false;

    this.legs = [];

    _.each(this.config, (legConfig)=>{
        let leg = new Leg(legConfig.images, legConfig);

        leg.on("MOVETOFRONT_END", ()=>{
            this.emit("STEP");
        })

        this.addChild(leg);
        this.legs[leg.id] = leg;
    })

    this.lastLegId = 0;

    this.centerPiece = new RotatingSprite(Assets.spritesheets.bottom1.array, {startDir: 11});
    this.centerPiece.y = -15;
    this.centerPiece.anchor.set(0.5,0.5);
    this.addChild(this.centerPiece);

    this._angle = 0;
    this.angle = 0;
  }

  startWalking(){
  	if(this.walking) return;

  	this.walking = true;
    _.each(this.legs, (leg)=>leg.startWalking());
  }

  stopWalking(){
  	  this.walking = false;
      _.each(this.legs, (leg)=>leg.stopWalking());
  }

  sortLayering(){
      this.children.sort((a,b)=>{return a.y-b.y;})
  }

  set angle (val){
      this._angle = val;

      let cos = Math.cos(this._angle);
      let sin = Math.sin(this._angle);

      _.each(this.legs, (leg)=>{
          leg.rotate(this._angle, sin, cos)
      });

      this.centerPiece.angle = this._angle;

      this.sortLayering();
  }

  get angle (){
      return this._angle;
  }

}
module.exports = LegSystem;
