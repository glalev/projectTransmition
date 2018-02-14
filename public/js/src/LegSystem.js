const PIXI = require('pixi.js');
const Assets = require('./Assets.js');
const RotatingSprite = require('./RotatingSprite.js');
const _ = require('underscore');

class LegSystem extends PIXI.Container {
  constructor(config) {
    super();
    this.config = [{
        id:0,
        walkDuration: 0.8,
        walkHeight: 10,
        walkDistance: 20,
        offset: {x:0, y: 25},
        linkedLegs:[1]
    },{
        id:1,
        walkDuration: 0.8,
        walkHeight: 10,
        walkDistance: 20,
        offset: {x:0, y: -25},
        linkedLegs:[0]
    }];

    this.stopping = false;
    this.walking = false;

    this.legs = [];

    _.each(this.config, (legConfig)=>{
        let leg = new RotatingSprite(Assets.spriteSheets.vehicles1.slice(0, 8), {startDir: 3});
        _.each(legConfig, (legProperty, legPropertyName)=>{
            leg[legPropertyName] = legProperty;
        });
        this.addChild(leg);
        this.legs[leg.id] = leg;
    })

    this.lastLegId = 0;

    this._angle = 0;
    this.angle = 0;

    this.walkCycle(this.legs[0]);
  }

  walkCycle (leg) {
      this.lastLegId = leg.id;

      const d1 = leg.walkDuration * 0.25;
      const d2 = leg.walkDuration * 0.25;
      const d3 = leg.walkDuration * 0.5;
      const walkX = leg.orgX + leg.walkDistance; // Math.sin(leg.angle) * leg.walkDistance;
      const walkY = leg.orgY + leg.walkHeight; //Math.abs(Math.cos(leg.angle)) * leg.walkDistance;

      const tl1 = new TimelineMax({ onUpdate: this.sortLayering, onUpdateScope: this });
      tl1.to(leg, d1, {y: walkY, x: walkX/2, ease: Power0.easeNone });
      tl1.to(leg, d2, {y: 0, x: walkX, ease: Power0.easeNone });
      tl1.addCallback(()=>{
          _.each(leg.linkedLegs, (legId) => this.walkCycle(this.legs[legId]));
      });
      tl1.to(leg, d3, {x: 0, ease: Power0.easeNone });
      tl1.play();
  }

  sortLayering(){
      this.children.sort((a,b)=>{return a.y-b.y;})
  }

  set angle (val){
      this._angle = val;

      let cos = Math.cos(this._angle * -1);
      let sin = Math.sin(this._angle * -1);

      _.each(this.legs, (leg)=>{
          leg.angle = this._angle;
          leg.orgX = (cos * leg.offset.x) + (sin * leg.offset.y);
          leg.orgY = (sin * leg.offset.x) + (cos * leg.offset.y);
      });

      this.sortLayering();
  }

  get angle (){
      return this._angle;
  }

}
module.exports = LegSystem;
