const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GameObject = require('./GameObject.js');

module.exports = class GamePlayer extends GameObject{
	constructor (game, networkPlayer) {
		super(game, 1);
		this.playerId = -1;
		this.networkPlayer = networkPlayer;
		this.networkPlayer.currentGame = game;

		this.networked = true;

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
		switch(key){
			case "U":
			break;
			case "D":
			break;
			case "L":
			break;
			case "R":
			break;
			case "F":
			break;
		}

		this.emit("keyDown", key);
	}

	_onKeyUp(key){
		switch(key){
			case "U":
			break;
			case "D":
			break;
			case "L":
			break;
			case "R":
			break;
			case "F":
			break;
		}

		this.emit("keyUp", key);
	}

	_onChangeRot(data){
		this.angle = Math.round(data);
	}
}
