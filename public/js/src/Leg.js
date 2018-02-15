const PIXI = require('pixi.js');
const Assets = require('./Assets.js');
const RotatingSprite = require('./RotatingSprite.js');
const _ = require('underscore');

class Leg extends RotatingSprite {
	constructor(textures, config) {
	    super(textures, config);
		this.id = config.id;
		this.walkDuration = config.walkDuration;
		this.walkHeight = config.walkHeight;
		this.walkDistance = config.walkDistance;
		this.linkedLegs = config.linkedLegs;
		this.offset = config.offset;

		this.frontPosOrg = new PIXI.Point();
		this.backPosOrg = new PIXI.Point();

		this.frontPosOrg.set(
			this.offset.x,
			this.offset.y + this.walkDistance/2
		);

		this.backPosOrg.set(
			this.offset.x,
			this.offset.y - this.walkDistance/2
		);

		this.frontPos = new PIXI.Point();
		this.backPos = new PIXI.Point();

		this.tl = null;

		this.walking = false;
		this.moving = false;
		this._front = !!(this.id%2 == 0);

		this._rot = null;
		this.anchor.set(0.5,0.5);
	}

	startWalking(){
		if(this.walking) return;

		this.walking = true;
		if(this._front) this.moveToBack();
		else this.moveToFront();
	}

	stopWalking(){
		if(!this.walking) return;

		this.walking = false;
	}

	rotate(newRot, sin, cos){
		if(newRot == this._rot) return;
		sin *= -1;
		cos *= -1;
		this.frontPos.set(
			this.frontPosOrg.x * sin - this.frontPosOrg.y * cos,
			this.frontPosOrg.y * sin + this.frontPosOrg.x * cos
		);

		this.backPos.set(
			this.backPosOrg.x * sin - this.backPosOrg.y * cos,
			this.backPosOrg.y * sin + this.backPosOrg.x * cos
		);

		this._rot = newRot;
		this.angle = this._rot;
	}

	moveToFront(){
		if(this.moving || this._front) return;
		this.moving = true;
		this._front = true;
		const distModifier = Math.max(this.getDistance(this.frontPos)/this.walkDistance, 0.1);
		const stepHeight = this.walkHeight * distModifier;

		const midPoint = new PIXI.Point();
		midPoint.set(this.x+(this.frontPos.x-this.x)/2, this.y+(this.frontPos.y-this.y)/2);
		midPoint.y -= stepHeight*distModifier;

		this.tl = new TimelineMax();
		this.tl.to(this, this.walkDuration*0.25*distModifier, {x: midPoint.x, y: midPoint.y});
		this.tl.to(this, this.walkDuration*0.25*distModifier, {x: this.frontPos.x, y: this.frontPos.y});
		this.tl.addCallback(()=>{
			this.moving = false;
			if(this.walking) this.moveToBack();
			this.emit("MOVETOFRONT_END");
		});
	}

	moveToBack(){
		if(this.moving || !this._front) return;
		this.moving = true;
		this._front = false;

		const distModifier = Math.max(this.getDistance(this.backPos)/this.walkDistance, 0.1);
		this.tl = new TimelineMax();
		this.tl.to(this, this.walkDuration*0.5*distModifier, {x: this.backPos.x, y: this.backPos.y});
		this.tl.addCallback(()=>{
			this.moving = false;
			if(this.walking) this.moveToFront();
			this.emit("MOVETOBACK_END");
		});
	}

	getDistance(point){
		return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
	}
}
module.exports = Leg;
