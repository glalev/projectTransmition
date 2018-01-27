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

		this.playerInstruments = [
			[0,1,2,3],
			[4,5,6,7], 
			[8,9,10,11],
			[12,13,14,15]
		];

		this.level = 0;
		this.perfectCount = 0;
		this.counter = 0;
		this.unpauseCount = 0;

		this.isPaused = false;

		this.init();
	}

	init () {
	}

	update(_delta){
		if(!this.players.length) return this.destroy();
		//if(this.players.length < 4) return;
		this.counter++;

		if(this.isPaused) {
			if(this.unpauseCount == this.counter) this.isPaused = false;
			else return;
		}

		let delta = _delta/1000;


		this.advanceBeats();
		let data = this.getBeatData();
		if(!Object.keys(data).length) return;
		this.sendUpdateToPlayers(data);
	}

	joinPlayer(networkPlayer){
		console.log(Date.now()+': '+networkPlayer.name+' joined a game...');

		let newPlayer = new GamePlayer(networkPlayer, this);
		newPlayer.id = this.players.push(newPlayer) - 1;

		let newInstruments = this.playerInstruments[newPlayer.id];
		newPlayer.instruments = newInstruments;

		newPlayer.sendSettings({
			id: newPlayer.id,
			instruments: this.playerInstruments
		});

		this.initializePlayerListeners(newPlayer);
	}

	onPlayerDisconnect(gamePlayer){
		this.playerInstruments.push(gamePlayer.instruments);

		this.players.splice(gamePlayer.id, 1);
		for(let i = gamePlayer.id; i < this.players.length; i++){
			this.players[i].id--;
		};
		
		console.log("Player removed from game, remaining:",this.players.length);

		if(!this.players.length) return this.destroy();
	}

	sendUpdateToPlayers (data){
		_.each(this.players, (player)=>{
			this.sendUpdate(player, data);
		});
	}

	sendUpdate (player, data){
		player.sendUpdate(data);
	}

	sendSoundToPlayers (originId, instrumentId, soundId, strength){
		_.each(this.players, (player)=>{
			if(player.uniqueId != originId) this.sendSound(player, instrumentId, soundId, strength);
		});
	}

	sendSound (player, instrumentId, soundId, strength){
		player.sendSound(instrumentId, soundId, strength);
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
				if(beat) {
					let playerOwner = _.findIndex(this.playerInstruments, (data)=>{ //TODO: better method!!!
						return _.contains(data, instrumentId);
					});
					beat = [beat, playerOwner];
					beats[instrumentId] = beat;
				}
			});
		});
		return beats;
	}

	pauseGame(length){
		this.isPaused = true;
		this.unpauseCount = this.counter + length;
	}

	initializePlayerListeners (gamePlayer) {
		gamePlayer.once('playerSound', (data)=>{
			if(data.perfect) this._onPerfectMatch(); 

			this.sendSoundToPlayers(gamePlayer.uniqueId, data.soundId, data.instrumentId, data.strength || 1);
		});

		gamePlayer.once('disconnect', this.onPlayerDisconnect.bind(this,gamePlayer));
	}

	destroy(){
		this.emit("destroy");
	}

	_getFirstInstrumentLoop(instrumentId){
		let breakPoint = this.counter % global.minBeat;
		if(breakPoint > 0) return
		this._getNewInstrumentLoop(instrumentId);
	}

	_getNewInstrumentLoop(instrumentId){
		let loops = this.instruments[this.level][instrumentId];
		let loop = loops[_.random(0,loops.length-1)];
		this.loops[instrumentId] = _.clone(loop);
	}

	_sendUpdateToPlayer(player, data){
		player.networkPlayer.sendGameData(data);
	}

	_onPerfectMatch(){
		this.perfectCount++;

		if(this.perfectCount > 150) { //Endgame
			this.pauseGame(-1);
			this.sendMessageToPlayers("GameOver");
		} else if(this.perfectCount > 100) { //Level2
			this.level = 2;
			this.pauseGame(25);
		} else if(this.perfectCount > 50) { //Level1
			this.level = 1;
			this.pauseGame(25);
		}

	}
}

