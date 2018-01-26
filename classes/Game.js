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
		this.instruments = Instruments

		this.init();
	}

	init () {
	}

	update(_delta){
		if(!data.players.length) return;
		let delta = _delta/1000;
		let data = this.getBeatData();
		this.sendUpdateToPlayers(data);
	}

	joinPlayer(networkPlayer){
		console.log(Date.now()+': '+networkPlayer.name+' joined a game...');

		let newPlayer = new GamePlayer(networkPlayer, this);
		newPlayer.id = this.players.push(newPlayer);
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

	getCompressedData(){ //This is to avoid sending unnecessary data to players, only strict stuff
		this.compressedData.players = this._getCompressedPlayerData();
		return this.compressedData;
	}

	getBeatData(){

	}

	_getCompressedPlayerData(){ //todo: need more optimized method
		return _.invoke( _.filter(this.players, (ply) => { return ply.hasChanged }), 'getCompressedData');
	}

	_sendUpdateToPlayer(player, data){
		player.networkPlayer.sendGameData(data);
	}

	initializePlayerListeners (gamePlayer) {
		gamePlayer.once('disconnect', this.onPlayerDisconnect.bind(this,gamePlayer));
	}
}

