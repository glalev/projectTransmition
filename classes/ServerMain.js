const _ = require('underscore');
const EventEmitter = require('eventemitter3');

const app = require('express')();
const serveStatic = require('serve-static');
let io = null;

const GameLoop = require('node-gameloop');
const Player = require("./NetworkPlayer.js");
const Game = require("./Game.js");
const fps = (400/60); //100 BPM

global._ = _;
global.playerList = [];
global.gameList = [];
global.minBeat = 32;

init();
function init(){
    console.warn("#INIT BEGIN /////////////////////");

    console.warn("#INIT - Express Server start");
    app.use(serveStatic('public', {'index': 'index.html'}));

    console.warn("#INIT - Socket Server start");
    io = require('socket.io').listen(app.listen(3000));

    console.warn("#INIT END /////////////////////");

    global.mainLoop = GameLoop.setGameLoop(frameUpdate, 1000/fps);

};

/***********************************************************************************************************************
 *  // MAIN FUNCTIONS
 **********************************************************************************************************************/

io.on('connection', function(socket){
    console.log(Date.now()+': User is connecting...');
    socket.on('loginData', (data)=>{
        console.log(Date.now()+': '+data.username+' has connected');
        initializeUser(data.username, socket);
    });
});

function initializeUser(username, socket){
    const player = new Player(username, socket);
    player.id = global.playerList.push(player) - 1;
    initializePlayerListeners(player, socket);
    findGameForPlayer(player);
};

function initializePlayerListeners(player, socket){
    player.once('disconnect',()=>{
        console.log(Date.now()+': '+player.name+' has disconnected')
        global.playerList.splice(player.id, 1);
        for(let i = player.id; i < global.playerList.length; i++){
            global.playerList[i].id--;
        };
    });
};

function initializeGame(){
    console.log("Game created");
    let game = new Game();
    game.id = global.gameList.push(game) - 1;

    game.once("destroy", ()=>{
        console.log("Game destroyed");
        global.gameList.splice(game.id, 1);
        for(let i = game.id; i < global.gameList.length; i++){
            global.gameList[i].id--;
        };
    });

    return game;
};

function findGameForPlayer(player){
    let foundGame = false;
    _.each(global.gameList, (game)=>{
        if(game.hasStarted || game.players.length >= 4 || foundGame) return;
        foundGame = true;
        game.joinPlayer(player);
    });
    if(foundGame) return;

    let newGame = initializeGame();
    newGame.joinPlayer(player);
};

function frameUpdate(delta){
    _.each(global.gameList,(game) => {
        game.update(delta);
    })
};