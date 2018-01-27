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

	sendSound(instrumentId, soundId, strength){
		this.networkPlayer.sendSoundData(instrumentId, soundId, strength);
	}

	sendSettings(data){
		this.networkPlayer.sendSettings(data);
	}

	sendProgress(data){
		this.networkPlayer.sendProgress(data);
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

		this.networkPlayer.on('keyDown', (data) => {

			//FORMAT: {int id, float [0-1] str, bool prf};
			//console.log('down', key);
			this._onKeyDown(data);
		});

		this.networkPlayer.on('keyUp', (key) => {
			//console.log('up', key);
			this._onKeyUp(key);
		});

	}

	_onKeyDown(data){
		this.emit("playerSound", {instrumentId: data.iId, soundId: data.sId, strength: data.str, perfect: data.prf});
	}

	_onKeyUp(key){
		return;
	}
}
