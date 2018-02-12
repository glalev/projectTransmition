const _ = require('underscore');
const EventEmitter = require('eventemitter3');

module.exports = class GameObject extends EventEmitter{
	constructor (game, type) {
		super();
		this.id = -1;
		this.uniqueId = _.uniqueId();
		this.game = game;
		this.modifications = [];

		this.type = type;
		//Type 1 - PLAYER

		this.dirX = 0;
		this.dirY = 0;
		this.x = 0;
		this.y = 0;
		this.angle = 0;

		this._x = 0;
		this._y = 0;
		this._angle = 0;

		this.init();
	}

	init () {

	}

	getSpawnData () {
		var data = {
			id: this.uniqueId,
			type: this.type,
			x: this.x, y: this.y,
			angle: this.angle
		};
		return data;
	}

	set angle (val){
		this._angle = val % 360;
		if(this.collider) this.collider.angle = this._angle;
		this.modifications.push("angle");
	}

	get angle (){
		return this._rotation;
	}

	get x (){
		return this._x;
	}
	set x (val){
		if(this._x == val) return;
		this._x = val;
		this.modifications.push("x");
	}

	get y (){
		return this._y;
	}
	set y (val){
		if(this._y == val) return;
		this._y = val;
		this.modifications.push("y");
	}

	update () {
		if(this.dirX) this.x += this.dirX;
		if(this.dirY) this.y += this.dirY;
	}

	getModifications () {
		var data = {};
		_.each(this.modifications, (modification) => {
			data[modification] = this[modification];
		})
		return data;
	}
}
