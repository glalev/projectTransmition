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
    this._listeners = {}
    document.addEventListener('keydown', (e) => this._onKeyDown(e));
    document.addEventListener('keyup', (e) => this._onKeyUp(e));
  }

  _onKeyDown(e){
      if(!KEY_CODES[e.keyCode]) return;
      this.emit('keyDown', { type: KEY_CODES[e.keyCode] });
  }
  
  _onKeyUp(e){
      if(!KEY_CODES[e.keyCode]) return;
      this.emit('keyUp', { type: KEY_CODES[e.keyCode] });
  }

}

module.exports = InputManager;
