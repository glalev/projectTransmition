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

		this.levels = [25,50,75,100];
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
		data.level = this.level;
		data.prfCount = this.perfectCount;
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
			instruments: this.playerInstruments,
			levels: this.levels,
		});

		this.initializePlayerListeners(newPlayer);
	}

	onPlayerDisconnect(gamePlayer){
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

	sendSoundToPlayers (sourcePlayer, instrumentId, soundId, strength){
		_.each(this.players, (player)=>{
			if(player.uniqueId != sourcePlayer.uniqueId) this.sendSound(player, instrumentId, soundId, strength);
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
				else if (this.loops[instrumentId].length == 1) this._getNewInstrumentLoop(instrumentId);
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

			this.sendSoundToPlayers(gamePlayer, data.instrumentId, data.soundId, data.strength || 1);
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
		this.sendMessageToPlayers("perfectMatch");

		if(this.perfectCount > this.levels[4]) { //Endgame
			this.pauseGame(-1);
			this.sendMessageToPlayers("gameOver");
		} else if(this.perfectCount > this.levels[3]) { //Level4
			this.sendMessageToPlayers("pause3");
			this.level = 4;
			this.pauseGame(25);
		} else if(this.perfectCount > this.levels[2]) { //Level3
			this.sendMessageToPlayers("pause2");
			this.level = 3;
			this.pauseGame(25);
		} else if(this.perfectCount > this.levels[1]) { //Level2
			this.sendMessageToPlayers("pause1");
			this.level = 2;
			this.pauseGame(25);
		} else if(this.perfectCount > this.levels[0]) { //Level1
			this.sendMessageToPlayers("pause0");
			this.level = 1;
			this.pauseGame(25);
		}

	}
}

