const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GameObject = require('./GameObject.js');
const cfg = require("./Config.js");

module.exports = class GamePlayer extends GameObject{
	constructor (game, networkPlayer) {
		super(game, 1);
		this.playerId = -1;
		this.networkPlayer = networkPlayer;
		this.networkPlayer.currentGame = game;

		this.speed = cfg.player.baseSpeed;
		this.collider = this.game.collisions.createCircle(
			this.x, this.y,
			cfg.player.collider.radius);
		this.collider.gameObject = this;

		this.networked = true;
		this.solid = true;

		this.initializeGameListeners();
	}

	sendSettings(data){
		this.networkPlayer.sendSettings(data);
	}

	sendUpdate(data){
		this.networkPlayer.sendGameData(data);
	}

	sendMessage(data){
		this.networkPlayer.sendMessage(data);
	}

	sendSpawnData(data){
		this.networkPlayer.sendSpawnData(data);
	}

	sendDestroyData(data){
		this.networkPlayer.sendDestroyData(data);
	}

	initializeGameListeners () {
	    this.networkPlayer.once('disconnect', () => {
			this.emit("disconnect");
	    });

		this.networkPlayer.on('keyDown', (key) => {
			this._onKeyDown(key);
		});

		this.networkPlayer.on('keyUp', (key) => {
			this._onKeyUp(key);
		});

		this.networkPlayer.on('changeRot', (data) => {
			this._onChangeRot(data);
		});
	}

	_onKeyDown(key){
		switch(key.type){
			case "U":
			this.dirY -= this.speed;
			break;
			case "D":
			this.dirY += this.speed;
			break;
			case "L":
			this.dirX -= this.speed;
			break;
			case "R":
			this.dirX += this.speed;
			break;
			case "F":
			this.emit("fire");
			break;
		}

		this.emit("keyDown", key);
	}

	_onKeyUp(key){
		switch(key.type){
			case "U":
			this.dirY += this.speed;
			break;
			case "D":
			this.dirY -= this.speed;
			break;
			case "L":
			this.dirX += this.speed;
			break;
			case "R":
			this.dirX -= this.speed;
			break;
		}

		this.emit("keyUp", key);
	}

	_onChangeRot(data){
		this.angle = Math.round(data);
	}
}
