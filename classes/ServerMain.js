const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const cfg = require("./Config.js");

const app = require('express')();
const serveStatic = require('serve-static');
let io = null;

const GameLoop = require('node-gameloop');
const AWSManager = require("./AWSManager.js");
const Player = require("./NetworkPlayer.js");
const Game = require("./Game.js");

global._ = _;
global.playerList = [];
global.gameList = [];
global.awsMan = new AWSManager();

init();
function init(){
    console.warn("#INIT BEGIN /////////////////////");

    console.warn("#INIT - Express Server start");
    app.use(serveStatic('public', {'index': 'index.html'}));

    console.warn("#INIT - Socket Server start");
    io = require('socket.io').listen(app.listen(3000));

    console.warn("#INIT END /////////////////////");

    global.mainLoop = GameLoop.setGameLoop(frameUpdate, 1000/cfg.fps);
};

/***********************************************************************************************************************
 *  // MAIN FUNCTIONS
 **********************************************************************************************************************/

io.on('connection', function(socket){
    console.log(Date.now()+': User is connecting...');

    socket.on('loginData', (data)=>{
        console.log(Date.now()+': '+data.username+' has connected');
        global.awsMan.login(data.username, data.password).then((loginSuccesfull)=>{
            if(!loginSuccesfull) return socket.emit("loginFail");
            socket.emit("loginSuccess");
            initializeUser(data.username, socket);
        });
    });

    socket.on('registerData', (data)=>{
        console.log(Date.now()+': '+data.username+' has registered');
        global.awsMan.login(data.username, data.password, data.email).then((registerData)=>{
            if(registerData.ERROR) return socket.emit("registerFail", registerData);
            socket.emit("registerSuccess");
            global.awsMan.createUser(data.username, data.password, data.email);
        });
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
        global.awsMan.logout(player.name);
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
        if(game.isOver || game.hasStarted || game.players.length >= cfg.maxPlayersPerGame || foundGame) return;
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
