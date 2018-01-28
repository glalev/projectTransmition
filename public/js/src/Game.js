const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Field = require('./Field.js');
const CenterBar = require('./CenterBar.js');
const Background = require('./Background.js');
const Assets = require('./Assets.js');

class Game extends PIXI.Container {

  constructor() {
    super();
    //this._background = new Background();
    this._displays = new PIXI.Sprite(Assets.images.displays);
    this._displays.y = 302;
    this._displays.x = 8;
    this._foreground = new PIXI.Sprite(Assets.images.fgImg);
    this._foreground.y = -180;

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

    Assets.sounds['idleLoop'].loop(true).play();

    this.centerBar = new CenterBar();
    this.addChild(this._displays, this._foreground, this.centerBar);
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
    let instrument = data[0];
    let player = data[1];

    this._fields[player].addBlock(instrument, 1);
  }

  playSound(instrumentId, level){
      let id = '' + instrumentId + '1';

      Assets.sounds[id].volume(level).play();
  }

  removeBlockOther(source, instrumentId, level){
      this._fields[source].checkInstrumentId(instrumentId)
        .then(result => {
          if(!result) return;
         this.playSound(instrumentId, level)
      });
  }

  get _fields () {
    return this.children.filter(child => child instanceof Field);
  }
}

module.exports = Game;