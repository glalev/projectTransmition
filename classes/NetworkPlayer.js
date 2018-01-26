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

	sendGameData (data){
		this.socket.emit("gameUpdate", data);
	}

	initializeSocketListeners () {
		this.socket.on('_ping', () => {
	      this.socket.emit('_pong');
	    });

	    this.socket.on('latencyUpdate', (latency) => {
	        this.latency = latency;
	    });

		this.socket.on('keyDown', (key) => {
			this.emit('keyDown', key);
	    });

		this.socket.on('keyUp', (key) => {
			this.emit('keyUp', key);
	    });

	    this.socket.on('disconnect', () => {
			this.emit("disconnect");
	    });

		this.socket.on('reconnect', () => {
			this.emit("disconnect");
		});

	}
}
