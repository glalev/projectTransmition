const _ = require('underscore');
const EventEmitter = require('eventemitter3');

module.exports = class GamePlayer extends EventEmitter{
	constructor (networkPlayer, game) {
		super();
		this.id = -1;
		this.uniqueId = _.uniqueId();
		this.networkPlayer = networkPlayer;
		this.networkPlayer.currentGame = game;

		this.instruments = [];
		this.loopIndex = 0;

		this.init();
	}

	init () {
		this.initializeGameListeners();
	}

	sendSound(id){
		this.networkPlayer.sendSoundData(id);
	}

	sendUpdate(data){
		this.networkPlayer.sendGameData(data);
	}

	initializeGameListeners () {
	    this.networkPlayer.once('disconnect', () => {
			this.emit("disconnect");
	    });

		this.networkPlayer.on('keyDown', (key) => {
			//console.log('down', key);
			this._onKeyDown(key);
		});

		this.networkPlayer.on('keyUp', (key) => {
			//console.log('up', key);
			this._onKeyUp(key);
		});

	}

	_onKeyDown(key){
		switch (key) {
			case 'u':
				break;
			case 'd':
				break;
			case 'r':
				break;
			case 'l':
				break;
		}

		this.emit("playerSound", key);
	}

	_onKeyUp(key){
		return;
	}
}
