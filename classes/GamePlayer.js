const _ = require('underscore');
const EventEmitter = require('eventemitter3');

module.exports = class GamePlayer extends EventEmitter{
	constructor (networkPlayer, game) {
		super();
		this.id = -1;
		this.uniqueId = _.uniqueId();
		this.networkPlayer = networkPlayer;
		this.networkPlayer.currentGame = game;

		this.instrumentLoops = [];
		this.loopIndex = 0;

		this.init();
	}

	init () {
		this.initializeGameListeners();
	}

	getCompressedData(){
		this.hasChanged = false;
		this.compressedData.x = this.x;
		this.compressedData.y = this.y;
		return this.compressedData;
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
				this.direction.y = -1;
				break;
			case 'd':
				this.direction.y = 1;
				break;
			case 'r':
				this.direction.x = 1;
				break;
			case 'l':
				this.direction.x = -1;
				break;
		}

		this.emit("playerSound", key);
	}

	_onKeyUp(key){
		return;
	}
}
