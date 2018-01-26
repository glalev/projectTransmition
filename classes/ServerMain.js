const _ = require('underscore');
const EventEmitter = require('eventemitter3');

const app = require('express')();
const serveStatic = require('serve-static');
let io = null;

const Player = require("./NetworkPlayer.js");
const Game = require("./Game.js");
const maxFPS = (100/60);

global._ = _;
global.playerList = [];
global.gameList = [];
global.mainLoop = require('mainloop.js');

init();
function init(){
    console.warn("#INIT BEGIN /////////////////////");

    console.warn("#INIT - Express Server start");
    app.use(serveStatic('public', {'index': 'index.html'}));

    console.warn("#INIT - Socket Server start");
    io = require('socket.io').listen(app.listen(3000));

    console.warn("#INIT END /////////////////////");

    global.mainLoop.setMaxAllowedFPS(maxFPS);
    global.mainLoop.setBegin(frameStart.bind(this))
        .setUpdate(frameUpdate.bind(this))
        .setEnd(frameEnd.bind(this));

    global.mainLoop.start();

    initializeGame();
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
    let game = new Game();
    game.id = global.gameList.push(game) - 1;
};

function findGameForPlayer(player){
    global.gameList[0].joinPlayer(player);
};

function frameStart(){

};

function frameUpdate(delta){
    _.each(global.gameList,(game) => {
        game.update(delta);
    })
};

function frameEnd(){

};
