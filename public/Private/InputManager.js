class InputManager extends EventEmitter{
    constructor(game) {
        super();

        this.game = game;
        this.input = this.game.input;
        this.keys = {
            u: Phaser.Keyboard.UP,
            d: Phaser.Keyboard.DOWN,
            r: Phaser.Keyboard.RIGHT,
            l: Phaser.Keyboard.LEFT
        };
        this.init();
    }

    init () {
    }

    hookCommands () {

        _.each(this.keys, (keyValue, key)=>{
            this.keys[key] = this.input.keyboard.addKey(keyValue);
            this.input.keyboard.addKeyCapture(keyValue);

            this.keys[key].onDown.add(()=>{ this._onKeyDown(key); }, this);
            this.keys[key].onUp.add(()=>{ this._onKeyUp(key); }, this);
        });
    }

    _onKeyDown (key){
        this.emit("keyDown", key);
    }

    _onKeyUp (key){
        this.emit("keyUp", key);
    }
}