const _ = require('underscore');
const EventEmitter = require('eventemitter3');

module.exports = class GamePlayer extends EventEmitter{
	constructor (networkPlayer, game) {
		super();
		this.id = -1;
		this.uniqueId = _.uniqueId();
		this.networkPlayer = networkPlayer;
		this.networkPlayer.currentGame = game;

		this.x = 0;
		this.y = 0;
		this.hp = 100;

		this.moveSpeed = 100;

		this.compressedData = {id: this.uniqueId, x:0, y:0};

		this.direction = {x: 0, y: 0};

		this.hasChanged = false;

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
	}

	_onKeyUp(key){
		switch (key) {
			case 'u':
			case 'd':
				this.direction.y = 0;
				break;
			case 'r':
			case 'l':
				this.direction.x = 0;
				break;
		}
	}
}
