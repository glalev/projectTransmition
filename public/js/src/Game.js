const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Field = require('./Field.js');
const CenterBar = require('./CenterBar.js');
const Assets = require('./Assets.js');

class Game extends PIXI.Container {

  constructor() {
    super();
    this._background = new PIXI.Sprite(Assets.images.bgImg);
    this._foreground = new PIXI.Sprite(Assets.images.fgImg);
    window.Assets = Assets;
    this._input = new InputManager();
    this._input.on('keydown', ({ keyCode, symbol }) => {
      this._playerField.checkInput(keyCode, symbol)
        .then(result => {
          if(!result) return;

          this.playSound(result.instrumentId, result.level)
          this.emit('keyDown', { iId: result.instrumentId, sId: result.soundId, str: result.level, prf: result.isPerfect })

        });
    });

    this.centerBar = new CenterBar();
    this.addChild(this._background, this.centerBar, this._foreground);
  }

  update() {
    this.children.forEach(child => child.update && child.update());
  }


  initFields(fieldsData, mainField) {
    fieldsData.map(data => {
      let field = new Field(data);
      let index = this.children.length - 2;
      this.addChildAt(field, index);
      this._playerField = this._fields[mainField];
    });
  }

  spawnSound(data){
    let instrument = parseInt(Object.keys(data), 10);
    let [ sound, player ] = data[instrument];

    this._fields[player].addBlock(instrument, sound);
  }

  playSound(instrumentId, level){
      let id = '' + instrumentId + '1';

      Assets.sounds[id].volume(level).play();
  }

  get _fields () {
    return this.children.filter(child => child instanceof Field);
  }
}

module.exports = Game;