const _ = require('underscore');
const EventEmitter = require('eventemitter3');

module.exports = class NetworkPlayer extends EventEmitter{
	constructor (userName, socket) {
		super();
	    this.name = userName;
		this.socket = socket;
		this.id = -1;
		this.uniqueId = _.uniqueId();
		this.latency = -1;
		this.currentGame = null;

		this.init();
	}

	init () {   
		this.initializeSocketListeners();
		this.socket.emit('ready');
		this.emit('ready');
	}

	sendSoundData (sourceId, instrumentId, soundId, strength){
		this.socket.emit("playSound", {source: sourceId, instrumentId: instrumentId, soundId: soundId, str: strength});
	}

	sendSettings (data){
		this.socket.emit("settings", data);
	}

	sendProgress (data){
		this.socket.emit("progressUpdate", data);
	}

	sendGameData (data){
		this.socket.emit("gameUpdate", data);
	}

	sendMessage (data){
		this.socket.emit("message", data);
	}

	initializeSocketListeners () {
		this.socket.on('_ping', () => {
	      this.socket.emit('_pong');
	    });

	    this.socket.on('latencyUpdate', (latency) => {
	        this.latency = latency;
	    });

		this.socket.on('keyDown', (data) => {
			this.emit('keyDown', data);
	    });

	    this.socket.on('disconnect', () => {
			this.emit("disconnect");
	    });

		this.socket.on('reconnect', () => {
			this.emit("disconnect");
		});

	}
}
