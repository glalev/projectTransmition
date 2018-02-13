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
		this.collisions.update();
		//this.handleCollisions();

		var data = this.getObjectData();
		if(Object.keys(data).length) this.sendUpdateToPlayers(data);
	}

	updateObjects(){
		_.each(this.objects, (object)=>{
			if(!object) return; //In case they get destroyed while parsing
			object.update();
		});
	}

	getObjectData(){
		let data = {};
		_.each(this.objects, (object)=>{
			if(!object.modifications.length || !object.networked) return;
			data[object.uniqueId] = object.getModifications();
		});
		return data;
	}

	handleCollisions(){
		_.each(this.objects, (object)=>{
			object.handleCollisions();
		});
	}

	joinPlayer(networkPlayer){
		console.log(Date.now()+': '+networkPlayer.name+' joined a game...');

		let spawnData = _.map(this.objects, (object)=>{
			if(!object.networked) return;
			return object.getSpawnData();
		});

		let newPlayer = new GamePlayer(this, networkPlayer);
		this.sendSpawnData(newPlayer, spawnData);

		newPlayer.sendSettings({
			playerId: newPlayer.playerId,
			uniqueId: newPlayer.uniqueId
		});
		this.sendMessageToPlayers({msg:"connect"});

		this.initializePlayerListeners(newPlayer);
	}

	onPlayerDisconnect(gamePlayer){
		console.log(gamePlayer.networkPlayer.name+" removed from game");

		this.players.splice(gamePlayer.playerId, 1);
        for(let i = gamePlayer.playerId; i < this.players.length; i++){
        	this.players[i].playerId--;
        };

		this.sendMessageToPlayers({msg:"disconnect"});

		gamePlayer.destroy();

		if(this._areWeEmpty()) return this.destroy();
	}

	sendUpdateToPlayers (data){
		_.each(this.players, (player)=>{
			this.sendUpdate(player, data);
		});
	}

	sendUpdate (player, data){
		player.sendUpdate(data);
	}

	sendMessageToPlayers (data){
		_.each(this.players, (player)=>{
			this.sendMessage(player, data);
		});
	}

	sendMessage (player, data){
		player.sendMessage(data);
	}

	sendSpawnDataToPlayers(data){
		_.each(this.players, (player)=>{
			this.sendSpawnData(player, data);
		});
	}

	sendSpawnData(player, data){
		player.sendSpawnData(data);
	}

	sendDestroyDataToPlayers(data){
		_.each(this.players, (player)=>{
			player.sendDestroyData(data);
		});
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
