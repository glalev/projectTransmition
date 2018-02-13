const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GameObject = require('./GameObject.js');
const cfg = require("./Config.js");

module.exports = class GameBullet extends GameObject{
	constructor (game, ownerId, x, y, angle, speed, damage) {
		super(game, 2);
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = speed || cfg.bullet.baseSpeed;
		this.damage = damage || cfg.bullet.baseDamage;
		this.ownerId = ownerId;

		this.collider = this.game.collisions.createCircle(
			this.x, this.y,
			cfg.bullet.collider.radius);
		this.collider.gameObject = this;

		this._getDir();
		this.networked = true;
		this.solid = true;

		this._counter = 0;
		this._counterDeath = cfg.bullet.deathTime;

		this.game.sendSpawnDataToPlayers([this.getSpawnData()]);

		this._addListeners();
	}

	_addListeners(){
		this.once("collide", ()=>{
			this.destroy();
		});

		this.on("update", ()=>{
			this._counter++;
			if(this._counter>this._counterDeath) this.destroy();
		});
	}

	_getDir(){
		let rad = this.angle;
		this.dirX = Math.cos(rad) * this.speed;
		this.dirY = Math.sin(rad) * this.speed;
	}

	_addCollider(){
		this.game.collisions.createCircle(
			this.x,
			this.y,
			10,
			1,
			0
		);
	}
}
