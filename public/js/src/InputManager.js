const EventEmitter = require('eventemitter3');
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
    this.captureMouseTime = 1000/24; //24 times per second
    this.screenMiddle = {x: app.renderer.screen.width/2, y: app.renderer.screen.height/2};
    this._lastCaptureMouse = 0;

    document.addEventListener('keydown', (e) => this._onKeyDown(e));
    document.addEventListener('keyup', (e) => this._onKeyUp(e));

    this._mouseManager = new PIXI.interaction.InteractionManager(
        app.renderer,
        {
            autoPreventDefault: true
        }
    );
    this._mouseManager.on("pointermove", (e)=>this._onMouseMove(e));
  }

  _onKeyDown(e){
      if(!KEY_CODES[e.keyCode]) return;
      this.emit('keyDown', { type: KEY_CODES[e.keyCode] });
  }

  _onKeyUp(e){
      if(!KEY_CODES[e.keyCode]) return;
      this.emit('keyUp', { type: KEY_CODES[e.keyCode] });
  }

  _onMouseMove(e){
      if(!this.captureMouse) return;

      let now = Date.now();
      if((now - this._lastCaptureMouse) < this.captureMouseTime) return;
      this._lastCaptureMouse = now;

      let pos = e.data.global,
      dx = pos.x-this.screenMiddle.x,
      dy = pos.y-this.screenMiddle.y,
      rot = Math.atan2(dy, dx) * 180 / Math.PI;
      
      this.emit('mouseMove', { pos: pos, rot: rot });
  }
}

module.exports = InputManager;
