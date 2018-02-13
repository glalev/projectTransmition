const EventEmitter = require('eventemitter3');
const _ = require('underscore');
const cfg = require("./Config.js");

const KEY_CODES = {
  87: 'U',
  83: 'D',
  65: 'L',
  68: 'R'
}

class InputManager extends EventEmitter {

  constructor() {
    super();
    this.captureMouse = true;
    this.captureMouseTime = 1000/cfg.serverFps;
    this.screenMiddle = {x: app.renderer.screen.width/2, y: app.renderer.screen.height/2};

    this._keys = {};

    document.addEventListener('keydown', (e) => this._onKeyDown(e));
    document.addEventListener('keyup', (e) => this._onKeyUp(e));

    this._mouseManager = new PIXI.interaction.InteractionManager(
        app.renderer,
        {
            autoPreventDefault: true
        }
    );
    let throttledMove = _.throttle(this._onMouseMove.bind(this), this.captureMouseTime)

    this._mouseManager.on("pointermove", (e)=>throttledMove(e));
    this._mouseManager.on("mousedown", (e)=>this._onMouseClick(e));
  }

  _onKeyDown(e){
      if(!KEY_CODES[e.keyCode] || this._keys[e.keyCode]) return;
      this._keys[e.keyCode] = true;
      this.emit('keyDown', { type: KEY_CODES[e.keyCode] });
  }

  _onKeyUp(e){
      if(!KEY_CODES[e.keyCode] || !this._keys[e.keyCode]) return;
      this._keys[e.keyCode] = false;
      this.emit('keyUp', { type: KEY_CODES[e.keyCode] });
  }

  _onMouseMove(e){
      if(!this.captureMouse) return;

      let pos = e.data.global,
      dx = pos.x-this.screenMiddle.x,
      dy = pos.y-this.screenMiddle.y,
      rot = Math.atan2(dy, dx);

      this.emit('mouseMove', { pos: pos, rot: rot });
  }

  _onMouseClick(e){
      this.emit('click');
  }
}

module.exports = InputManager;
