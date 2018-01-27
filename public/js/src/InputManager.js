const EventEmitter = require('eventemitter3');
const KEY_CODES = {
  65: 'A',
  83: 'S',
  75: 'K',
  76: 'L',
  32: 'SPACE'
}

class InputManager extends EventEmitter {

  constructor() {
    super();
    this._listeners = {}
    document.addEventListener('keydown', (e) => this._onKeyDown(e));
  }

  _onKeyDown(e){
      if(!KEY_CODES[e.keyCode]) return;

      this.emit('keydown', { keyCode: e.keyCode, symbol: KEY_CODES[e.keyCode] });
  }

}

module.exports = InputManager;