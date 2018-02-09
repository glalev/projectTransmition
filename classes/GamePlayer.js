const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GameObject = require('./GameObject.js');

module.exports = class GamePlayer extends GameObject{
	constructor (game, networkPlayer) {
		super([arguments]);
		this.networkPlayer = networkPlayer;
		this.networkPlayer.currentGame = game;

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

	initializeGameListeners () {
	    this.networkPlayer.once('disconnect', () => {
			this.emit("disconnect");
	    });

		this.networkPlayer.on('keyDown', (key) => {
			this._onKeyDown(data);
		});

		this.networkPlayer.on('keyUp', (key) => {
			this._onKeyUp(key);
		});
	}

	_onKeyDown(key){
		this.emit("keyDown", key);
	}

	_onKeyUp(key){
		this.emit("keyUp", key);
	}
}
