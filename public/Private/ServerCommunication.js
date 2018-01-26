class ServerCommunicator extends EventEmitter{
    constructor(userName, socket) {
        super();
        this.socket = undefined;
        this.latency = 0;
        this.isConnecting = false;
        this.isConnected = false;
        this.init();
    }

    init () {
        this.connectToServer(()=>{
            this.createServerListeners();
            this.emit("connected");
            this.getLatency();
        });
    }

    sendLoginData () {
        let username = "Dood" + _.random(1, 1000);
        this.socket.emit('loginData', {username: username});
    }

    sendKeyDown (key) {
        this.socket.emit('keyDown', key);
    }

    sendKeyUp (key) {
        this.socket.emit('keyUp', key);
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

    connectToServer (callback){
        console.info('Attempting to connect to server...')

        this.isConnecting = true;
        this.socket = io.connect(location.host);
        this.socket.once('connect', ()=>{
            console.log('Connected to server...');
            this.isConnecting = false;
            this.isConnected = false;
            if(callback) callback();
        });
    }

    createServerListeners () {
        this.socket.on('ready', (data) => {
            console.log('Login Succesful');
            this.emit('ready');
        });

        this.socket.on('gameUpdate', (data) => {
            console.log(data);
            this.emit('gameDataUpdate', data);
        });

        this.socket.on('disconnect', () => {
            this.isConnected = false;
            location.reload();
        });
    }
}
