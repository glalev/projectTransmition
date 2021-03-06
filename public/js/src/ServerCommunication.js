const EventEmitter = require('eventemitter3');
const io = require('socket.io-client');

class ServerCommunicator extends EventEmitter {
    constructor(userName, socket) {
        super();
        this.socket = undefined;
        this.latency = 0;
        this.isConnecting = false;
        this.isConnected = false;
    }

    connect() {
      return new Promise(resolve => {
        console.info('Attempting to connect to server...')

        //this.isConnecting = true;
        this.socket = io(location.host);
        this.socket.once('connect', ()=>{
            console.log('Connected to server...');
            //this.isConnecting = false;
            this.isConnected = true;

            this.createServerListeners();
            this.getLatency();
            this.sendLoginData();
            resolve();
        });
      });
    }

    sendLoginData () {
        let username = "Dood" + Math.floor(Math.random() * 1000) + 1 ;
        this.socket.emit('loginData', {username: username});
    }

    sendKeyDown (data) {
        this.socket.emit('keyDown', data);
    }

    getLatency () {
        let startTime = Date.now();

        this.socket.once('_pong', ()=>{
          this.latency = Date.now() - startTime;
          this.socket.emit('latencyUpdate', this.latency);
          this.emit("latencyUpdate");
        });

        this.socket.emit('_ping');
    }

    createServerListeners () {
        console.log('added listeners');

        this.socket.on('ready', (data) => {
            console.log('Login Succesful');
            this.emit('ready');
        });

        this.socket.on('progressUpdate', (data) => {
            this.emit('progressUpdate', data);
        });

        this.socket.on('settings', (data) => this.emit('settings', data));

        this.socket.on('playSound', (data) => {
            this.emit('playSound', data);
        });

        this.socket.on('message', (data) => {
            this.emit('message', data);
        });

        this.socket.on('gameUpdate', (data) => this.emit('gameUpdate', data));

        this.socket.on('disconnect', () => {
            this.isConnected = false;
            location.reload();
        });
    }
}

module.exports = ServerCommunicator;