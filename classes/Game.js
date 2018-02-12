const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const GamePlayer = require('./GamePlayer.js');
const Collisions = require('./collisions/Collisions.js');

module.exports = class Game extends EventEmitter{
	constructor () {
		super();
		this.id = -1;
		this.uniqueId = _.uniqueId();

		this.players = [];
		this.objects = [];

		this.hasStarted = false;
		this.isOver = false;

		this.collisions = new Collisions();

		this.init();
	}

	init () {
	}

	update(_delta){
		if(this._areWeEmpty()) return this.destroy();

		this.updateObjects();
		var data = this.getObjectData();
		this.sendUpdateToPlayers(data);
	}

	updateObjects(){
		_.each(this.objects, (object)=>{
			object.update();
		});
	}

	getObjectData(){
		let data = {};
		_.each(this.objects, (object)=>{
			if(!object.modified) return;
			data.id = object.getModifications();
		});
		return data;
	}

	joinPlayer(networkPlayer){
		console.log(Date.now()+': '+networkPlayer.name+' joined a game...');

		let newPlayer = new GamePlayer(this, networkPlayer);

		newPlayer.id = this.players.push(newPlayer) - 1;
		newPlayer.sendSettings({
			id: newPlayer.id
		});

		this.sendMessageToPlayers("connect");

		let playerData = newPlayer.getSpawnData();
		let spawnData = _.each(this.objects, (object)=>{
			return object.getSpawnData();
		});

		_.each(this.players, (player)=>{
			if(player.id == newPlayer.id) this.sendSpawnData(player, spawnData);
			else this.sendSpawnData(player, [playerData]);
		});

		this.initializePlayerListeners(newPlayer);
	}

	onPlayerDisconnect(gamePlayer){
		console.log(gamePlayer.networkPlayer.name+" removed from game");

		this.players.splice(gamePlayer.id, 1);
        for(let i = gamePlayer.id; i < 	this.players.length; i++){
        	this.players[i].id--;
        };

		this.sendMessageToPlayers("disconnect"+gamePlayer.id);

		let playerData = gamePlayer.getSpawnData();
		_.each(this.players, (player)=>{
			this.sendDestroyData(player, [playerData]);
		});

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

	sendMessageToPlayers (data){
		_.each(this.players, (player)=>{
			if(!player) return;
			this.sendMessage(player, data);
		});
	}

	sendMessage (player, data){
		player.sendMessage(data);
	}

	sendSpawnData(player, data){
		player.sendSpawnData(data);
	}

	sendDestroyData(player, data){
		player.sendDestroyData(data);
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
		return !this.players.length;
	}

	_sendUpdateToPlayer(player, data){
		player.networkPlayer.sendGameData(data);
	}
}
