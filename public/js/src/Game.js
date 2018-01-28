const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Field = require('./Field.js');
const CenterBar = require('./CenterBar.js');
const Characters = require('./Characters.js');
const Assets = require('./Assets.js');
const Display = require('./Display.js');
const { Power2, TweenMax } = require('gsap').TweenMax;

class Game extends PIXI.Container {

  constructor() {
    super();
    //this._background = new Background();
    this.localPlayerId = 0;
    this._displays = new PIXI.Sprite(Assets.images.displays);
    this._displays.y = 302;
    this._displays.x = 8;
    this._foreground = new PIXI.Sprite(Assets.images.fgImg);
    this._foreground.y = -180;

    this._characters = new Characters();

    window.Assets = Assets;
    this._display = new Display({ x: 280, y: -160 });
    this._input = new InputManager();
    this._input.on('keydown', ({ keyCode, symbol }) => {
      this._playerField.checkInput(keyCode, symbol)
        .then(result => {
          this._characters.playButton(this.localPlayerId);
          if(!result) return;

          this.playSound(result.instrumentId, result.level)
          this.emit('keyDown', { iId: result.instrumentId, sId: result.soundId, str: result.level, prf: result.isPerfect })

        });
    });

    Assets.sounds['idleLoop'].loop(true).play();

    this.centerBar = new CenterBar();
    this.addChild(this._display, this._foreground, this._characters, this.centerBar);
  }

  update() {
    this.children.forEach(child => child.update && child.update());
  }


  initFields(fieldsData, mainField) {
    this.localPlayerId = mainField;
    fieldsData.map(data => {
      let field = new Field(data);
      let index = this.children.length - 2;
      this.addChildAt(field, index);
      this._playerField = this._fields[mainField];
      this._playerField.playReady();
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
          this._characters.playButton(source);
          if(!result) return;
         this.playSound(instrumentId, level)
      });
  }

  showDisplay() {
    return new Promise(resolve => {
      this.x = this.pivot.x = this.width / 2;

      TweenLite.to(this, 3, { y: 230, ease: Power2.easeInOut });
      TweenLite.to(this.scale, 3, { x: 1.3, y: 1.3, ease: Power2.easeInOut, onComplete: resolve });
    })
  }

  get _fields () {
    return this.children.filter(child => child instanceof Field);
  }
}

module.exports = Game;