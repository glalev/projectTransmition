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
		this.counter = 0;

		this.isPaused = false;

		this.init();
	}

	init () {
		this.availableInstruments = Object.keys(this.instruments);
	}

	update(_delta){
		if(!this.players.length) return;
		//if(this.players.length < 4) return;
		if(this.isPaused) return;

		let delta = _delta/1000;

		this.counter++;

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

		_.each(gamePlayer.instruments, (instrumentId)=>{
			this.availableInstruments.push(instrumentId);
		});

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

	sendSoundToPlayers(originId, instrumentId, strength){
		_.each(this.players, (player)=>{
			if(player.uniqueId != originId) this.sendSound(player, instrumentId, strength);
		});
	}

	sendSound(player, instrumentId, strength){
		player.sendSound(instrumentId, strength);
	}

	sendMessageToPlayers (data){
		_.each(this.players, (player)=>{
			this.sendMessage(player, data);
		});
	}

	sendMessage (player, data){
		player.sendMessage(data);
	}

	advanceBeats(){
		_.each(this.players, (player)=>{
			_.each(player.instruments, (instrumentId)=>{
				if(!this.loops[instrumentId]) this._getFirstInstrumentLoop(instrumentId);
				else if (!this.loops[instrumentId].length) this._getNewInstrumentLoop(instrumentId);
				else this.loops[instrumentId].shift();
			});
		});
	}

	getBeatData(){
		let beats = {};
		_.each(this.players, (player)=>{
			_.each(player.instruments, (instrumentId)=>{
				if(!this.loops[instrumentId]) return;

				let beat = this.loops[instrumentId][0];
				if(beat) beats[instrumentId] = beat;
			});
		});
		return beats;
	}

	_getFirstInstrumentLoop(instrumentId){
		let breakPoint = this.counter % global.minBeat;
		if(breakPoint > 0) return
		this._getNewInstrumentLoop(instrumentId);
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

	_onPerfectMatch(){
		this.perfectCount++;

		if(this.perfectCount > 150) { //Endgame
			this.isPaused = true;
			this.sendMessageToPlayers("GameOver");
		} else if(this.perfectCount > 100) { //Level2
			this.level = 2;
		} else if(this.perfectCount > 50) { //Level1
			this.level = 1;
		}

	}

	initializePlayerListeners (gamePlayer) {
		gamePlayer.once('playerSound', (data)=>{
			if(data.perfect) this._onPerfectMatch(); 

			this.sendSoundToPlayers(gamePlayer.uniqueId, data.instrumentId, data.strength || 1);
		});

		gamePlayer.once('disconnect', this.onPlayerDisconnect.bind(this,gamePlayer));
	}
}

