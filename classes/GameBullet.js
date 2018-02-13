const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GameObject = require('./GameObject.js');

module.exports = class GameBullet extends GameObject{
	constructor (game, x, y, angle, speed, damage) {
		super(game, 2);
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = speed;
		this.damage = damage;

		this._getDir();
		this.networked = true;
	}

	_getDir(){
		let rad = this.angle * Math.PI / 180;
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
