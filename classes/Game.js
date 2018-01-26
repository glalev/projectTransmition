const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GamePlayer = require('./GamePlayer.js');
const Instruments = require('./Instruments.js');

module.exports = class Game extends EventEmitter{
	constructor () {
		super();
		this.id = -1;
		this.uniqueId = _.uniqueId();

		this.players = [];
		this.instruments = Instruments;
		this.loops = {};
		this.availableInstruments = [];

		this.level = 0;
		this.perfectCount = 0;

		this.init();
	}

	init () {
		this.availableInstruments = Object.keys(this.instruments);
	}

	update(_delta){
		if(!this.players.length) return;
		let delta = _delta/1000;

		this.advanceBeats();
		let data = this.getBeatData();
		if(!Object.keys(data).length) return;
		this.sendUpdateToPlayers(data);
	}

	joinPlayer(networkPlayer){
		console.log(Date.now()+': '+networkPlayer.name+' joined a game...');

		let newPlayer = new GamePlayer(networkPlayer, this);
		newPlayer.id = this.players.push(newPlayer);
		let newInstrument = this.availableInstruments.pop();

		newPlayer.instruments.push(newInstrument);
		this.initializePlayerListeners(newPlayer);
	}

	onPlayerDisconnect(gamePlayer){
		this.players.splice(gamePlayer.id, 1);
		for(let i = gamePlayer.id; i < this.players.length; i++){
			this.players[i].id--;
		};
	}

	sendUpdateToPlayers(data){
		_.each(this.players, (player)=>{
			this.sendUpdate(player, data);
		});
	}

	sendUpdate (player, data){
		player.sendUpdate(data);
	}

	advanceBeats(){
		_.each(this.players, (player)=>{
			_.each(player.instruments, (instrumentId)=>{
				if(!this.loops[instrumentId] || !this.loops[instrumentId].length) this._getNewInstrumentLoop(instrumentId);
				else this.loops[instrumentId].shift();
			});
		});
	}

	getBeatData(){
		let beats = {};
		_.each(this.players, (player)=>{
			_.each(player.instruments, (instrumentId)=>{
				let beat = this.loops[instrumentId][0];
				if(beat) beats[instrumentId] = beat;
			});
		});
		return beats;
	}

	_getNewInstrumentLoop(instrumentId){
		let loops = this.instruments[instrumentId][this.level];
		let loop = loops[_.random(0,loops.length-1)];
		this.loops[instrumentId] = _.clone(loop);
	}

	_getNewPlayerIntruments(){
		return availableInstruments.shift();
	}

	_sendUpdateToPlayer(player, data){
		player.networkPlayer.sendGameData(data);
	}

	initializePlayerListeners (gamePlayer) {
		gamePlayer.once('disconnect', this.onPlayerDisconnect.bind(this,gamePlayer));
	}
}

