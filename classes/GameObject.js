const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const cfg = require("./Config.js");

module.exports = class GameObject extends EventEmitter{
	constructor (game, type) {
		super();
		this.uniqueId = _.uniqueId();
		this.game = game;
		this.modifications = [];

		this.solid = false;
		this.networked = false; //synchronize this across the network

		this.type = type;
		//Type 1 - PLAYER
		//Type 2 - BULLET

		this.dirX = 0;
		this.dirY = 0;
		this.x = 0;
		this.y = 0;
		this.angle = 0;

		this._x = 0;
		this._y = 0;
		this._angle = 0;

		this.lastCollisionResult = this.game.collisions.createResult();

		this.id = this.game.objects.push(this) - 1;

		this.init();
	}

	init () { }

	getSpawnData () {
		var data = {
			id: this.uniqueId,
			type: this.type,
			x: this.x, y: this.y,
			angle: this.angle
		};
		return data;
	}

	destroy(){
		if(this.collider) this.collider.remove();
		this.game.sendDestroyDataToPlayers({id: this.uniqueId});

		this.game.objects.splice(this.id, 1);
		for(let i = this.id; i < this.game.objects.length; i++){
			this.game.objects[i].id--;
		};
	}

	set angle (val){
		this._angle = val;
		if(this.collider) this.collider.angle = this._angle;
		if(this.networked) this.modifications.push("angle");
	}

	get angle (){
		return this._angle;
	}

	get x (){
		return this._x;
	}
	set x (val){
		if(this._x == val) return;
		this._x = val;
		if(this.collider) this.collider.x = this._x;
		if(this.networked) this.modifications.push("x");
	}

	get y (){
		return this._y;
	}
	set y (val){
		if(this._y == val) return;
		this._y = val;
		if(this.collider) this.collider.y = this._y;
		if(this.networked) this.modifications.push("y");
	}

	update () {
		if(this.dirX) this.x += this.dirX;
		if(this.dirY) this.y += this.dirY;
		if(this.dirX || this.dirY) this.handleCollisions();
	}

	handleCollisions(){
		if(!this.collider || !this.solid) return;

		this.game.collisions.update();
		_.each(this.collider.potentials(), (potential)=>{
			if(!this.collider.collides(potential, this.lastCollisionResult)) return;
			processCollision(potential)
		})
	}

	processCollision(collider){
		this.x -= this.lastCollisionResult.overlap * this.lastCollisionResult.overlap_x;
		this.y -= this.lastCollisionResult.overlap * this.lastCollisionResult.overlap_y;

		this.emit("collide", collider.gameObject);
		collider.gameObject.emit("collided", this);
	}

	getModifications () {
		var data = {};
		_.each(this.modifications, (modification) => {
			data[modification] = this[modification];
		});
		this.modifications.splice(0,this.modifications.length)
		return data;
	}
}
