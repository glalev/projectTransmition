const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GamePlayer = require('./GamePlayer.js');
const Instruments = require('./Instruments.js');
//const Video = require('./Video.js');

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

		this.levels = [10,25,45,60,100];
		this.level = 0;
		this.perfectCount = 0;
		this.counter = 0;
		this.unpauseCount = 0;

		this.loopCounter = 0;

		this.hasStarted = false;
		this.isPaused = false;

		this.init();
	}

	init () {
	}

	update(_delta){
		if(this._areWeEmpty()) return this.destroy();
		//if(this.players.length < 4) return;
		this.counter++;

		this.loopCounter = this.counter % global.minBeat;

		if(!(this.loopCounter)) this.sendStartRhythmToPlayers();

		if(this.isPaused) {
			if(this.unpauseCount == this.counter) {
				this.isPaused = false;
				this.sendMessageToPlayers("unpause");
			}
			else return;
		}

		let delta = _delta/1000;
		let data = this.getBeatData();

		this.advanceBeats();
		if(!Object.keys(data).length) return;

		this.sendUpdateToPlayers(data);
	}

	joinPlayer(networkPlayer){
		console.log(Date.now()+': '+networkPlayer.name+' joined a game...');

		let newPlayer = new GamePlayer(networkPlayer, this);

		let playerSlot = 0;
		while(this.players[playerSlot]){
			playerSlot++;
		}

		this.sendMessageToPlayers("connect"+playerSlot);

		this.players[playerSlot] = newPlayer;

		newPlayer.id = playerSlot;

		let newInstruments = this.playerInstruments[newPlayer.id];
		newPlayer.instruments = newInstruments;

		newPlayer.sendSettings({
			id: newPlayer.id,
			instruments: this.playerInstruments,
			levels: this.levels,
		});

		_.each(this.players, (player, index)=>{
			if(!player) return;
			this.sendMessage(newPlayer, "connect"+index);
		});

		this.initializePlayerListeners(newPlayer);
	}

	onPlayerDisconnect(gamePlayer){
		_.each(gamePlayer.instruments, (instrumentId)=>{
			if(this.loops[instrumentId]) this.loops[instrumentId] = null;
		});

		this.players[gamePlayer.id] = null;

		this.sendMessageToPlayers("disconnect"+gamePlayer.id);

		console.log("Player removed from game,");

		if(this._areWeEmpty()) return this.destroy();
	}

	sendProgressToPlayers (data){
		_.each(this.players, (player)=>{
			if(!player) return;
			this.sendProgress(player, data);
		});
	}

	sendProgress (player, data){
		player.sendProgress(data);
	}

	sendUpdateToPlayers (data){
		_.each(this.players, (player)=>{
			if(!player) return;
			this.sendUpdate(player, data);
		});
	}

	sendUpdate (player, data){
		player.sendUpdate(data);
	}

	sendSoundToPlayers (sourcePlayer, instrumentId, soundId, strength){
		_.each(this.players, (player)=>{
			if(!player) return;
			if(player.uniqueId != sourcePlayer.uniqueId) this.sendSound(player, sourcePlayer.id, instrumentId, soundId, strength);
		});
	}

	sendSound (player, source, instrumentId, soundId, strength){
		player.sendSound(source, instrumentId, soundId, strength);
	}

	sendStartRhythmToPlayers (data){
		_.each(this.players, (player)=>{
			if(!player) return;
			if(player.isInRhythm) return;
			player.isInRhythm = true;
			this.sendMessage(player, "startBackground");
		});
	}

	sendMessageToPlayers (data){
		_.each(this.players, (player)=>{
			if(!player) return;
			this.sendMessage(player, data);
		});
	}

	sendMessage (player, data){
		player.sendMessage(data);
	}

	advanceBeats(){
		_.each(this.players, (player)=>{
			if(!player) return;
			_.each(player.instruments, (instrumentId)=>{
				if(!this.loops[instrumentId] || !this.loopCounter) this._getNewInstrumentLoop(instrumentId);
			});
		});
	}

	getBeatData(){
		let beats = {};
		_.each(this.players, (player)=>{
			if(!player) return;
			_.each(player.instruments, (instrumentId)=>{
				if(!this.loops[instrumentId]) return;

				let beat = this.loops[instrumentId][this.loopCounter];
				if(beat) {
					let playerOwner = _.findIndex(this.playerInstruments, (data)=>{ //TODO: better method!!!
						return _.contains(data, instrumentId);
					});
					beat = [beat, playerOwner];
					beats[instrumentId] = beat;
				}
			});
		});
		console.log(beats);
		return beats;
	}

	pauseGame(length){
		this.isPaused = true;
		this.unpauseCount = this.counter + length;
	}

	initializePlayerListeners (gamePlayer) {
		gamePlayer.on('playerSound', (data)=>{
			if(data.perfect) this._onPerfectMatch();

			this.sendSoundToPlayers(gamePlayer, data.instrumentId, data.soundId, data.strength || 1);
		});

		gamePlayer.once('disconnect', this.onPlayerDisconnect.bind(this,gamePlayer));
	}

	destroy(){
		this.emit("destroy");
	}

	_areWeEmpty(){
		return this.players.every(function(v) { return v === null; });
	}

	_getFirstInstrumentLoop(instrumentId){
		if(!(this.counter % global.minBeat)) return
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
		this.sendMessageToPlayers("perfectMatch");

		this.sendProgressToPlayers({level: this.level, prfCount: this.perfectCount})

		if(this.perfectCount > this.levels[4]) { //Endgame
			this.pauseGame(-1);
			this.sendMessageToPlayers("gameOver");
		} else if(this.perfectCount > this.levels[3] && this.level < 4) { //Level4
			this.sendMessageToPlayers("pause1");
			this.level = 4;
			this.pauseGame(5);
		} else if(this.perfectCount > this.levels[2] && this.level < 3) { //Level3
			this.level = 3;
			this.pauseGame(5);
		} else if(this.perfectCount > this.levels[1] && this.level < 2) { //Level2
			this.sendMessageToPlayers("pause0");
			this.level = 2;
			this.pauseGame(5);
		} else if(this.perfectCount > this.levels[0] && this.level < 1) { //Level1
			this.level = 1;
		}

	}
}

