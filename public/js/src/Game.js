const PIXI = require('pixi.js');
const InputManager = require('./InputManager.js');
const Field = require('./Field.js');
const CenterBar = require('./CenterBar.js');
const Characters = require('./Characters.js');
const Assets = require('./Assets.js');
const FlashingThing = require('./FlashingThing.js');
const Display = require('./Display.js');
const Video = require('./Video.js');
const Instruments = require('./Instruments.js');
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

    this._buttons = new PIXI.Sprite(Assets.images.deskButtons);
    this._buttons.y = 655;
    this._buttonLights = new FlashingThing(Assets.images.deskButtonsLight, 0.2);
    this._buttonLights.y = 610;
    this._buttonLights.x = -30;

    this.sceneLights = new FlashingThing(Assets.images.sceneLights, 0);

    this.characters = new Characters();

    this.instruments = new Instruments();

    this._fields = [];

    window.Assets = Assets;
    this._video = new Video();
    this._display = new Display({ x: 280, y: -160 });
    this._input = new InputManager();
    this._input.on('keydown', ({ keyCode, symbol }) => {
      this._playerField.checkInput(keyCode, symbol)
        .then(result => {
          this.characters.playButton(this.localPlayerId);
          this._buttonLights.flash();
          if(!result) return;
        
          if(result.level < 0.3) this._playerField.markMiss();
          this.playSound(result.instrumentId, result.level)
          this.playSound(result.instrumentId, result.level)
          this.emit('keyDown', { iId: result.instrumentId, sId: result.soundId, str: result.level, prf: result.isPerfect })
        });
    });

    Assets.sounds.playButton.volume(0.5).play();
    Assets.sounds.idleLoop.loop(true).play();
    Assets.sounds.idleLoop.fade(0, 1, 2000);
    this.centerBar = new CenterBar();
    this.addChild(this._displays, this._display, this._foreground, this._buttons, this._buttonLights, this.characters, this.instruments, this.centerBar, this.sceneLights, this._video);
  }

  update() {
    this.children.forEach(child => child.update && child.update());
  }

  initFields(fieldsData, mainField) {
    this.localPlayerId = mainField;

    fieldsData.forEach(data => {
      let field = new Field(data);
      let index = 2;
      this._fields.push(field);
      this.addChildAt(field, index);
    });
    this.characters.showCharacter(mainField);
    this.characters.characters[mainField].alpha = 1;
    this.instruments.instruments[mainField].alpha = 1;
    this.instruments.fade();
    this._playerField = this._fields[mainField];
    this._playerField.playReady();
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

  gameOver(){
    this.characters.playTiredAll();
    Assets.sounds['bgLoop'].fade(1, 0, 2000);
    setTimeout(() => {
        this._video.fade(1, 0, 1)
    }, 5500);
    Assets.sounds.skit.play();
    this._video.fade(0, 1, 1).play('skit1')
      .then(() => {        
        Assets.sounds["noiseLoop4"].fade(0,1,1000).loop(true).play();
        return this.showDisplay();
      }).then(() => {
        Assets.sounds["noiseLoop4"].stop();
        return this._display.playVideo();
      }).then(() => {
        this.returnFromDisplay();
        Assets.sounds["win"].play();
        Assets.sounds["win"].play();
        Assets.sounds["gameOverLoop"].play();
        Assets.sounds["gameOverLoop"].loop(true).fade(0, 1, 4000);
		let sprite = new PIXI.Sprite(Assets.images.credits);
        sprite.alpha = 0;
        this.addChild(sprite);
        TweenMax.to(sprite, 3, { alpha: 1, ease: Power2.easeOut });
      });
  }

  pause(id){
    this.characters.playTiredAll();
    let timeline = new TimelineMax();

    timeline.addCallback(()=>{
      if(!Assets.sounds.noiseLoop4.playing()) Assets.sounds.noiseLoop4.play();
      Assets.sounds.noiseLoop4.loop(true).fade(0,1, 1000);
      this.showDisplay();
    },1);
    timeline.addCallback(()=>{
      this._display.playStatic(Math.random() * 3 + 2);
    },4);
    timeline.addCallback(()=>{
      this.returnFromDisplay();
      Assets.sounds.noiseLoop4.fade(1,0, 1000);
      this.characters.playIdleAll();
    }, 8);
    timeline.play();
  }

  removeBlockOther(source, instrumentId, level){
      this._fields[source].checkInstrumentId(instrumentId)
        .then(result => {
          this.characters.playButton(source);
          this._buttonLights.flash();
          if(!result) return;
         this.playSound(instrumentId, Math.max(0,level-0.3));
      });
  }

  showDisplay() {
    return new Promise(resolve => {
      this.x = this.pivot.x = this.width / 2;

      TweenLite.to(this, 3, { y: 230, ease: Power2.easeInOut });
      TweenLite.to(this.scale, 3, { x: 1.3, y: 1.3, ease: Power2.easeInOut, onComplete: resolve });
    })
  }

  returnFromDisplay() {
    return new Promise(resolve => {
      TweenLite.to(this, 3, { y: 0, ease: Power2.easeInOut });
      TweenLite.to(this.scale, 3, { x: 1, y: 1, ease: Power2.easeInOut, onComplete: resolve });
    })
  }

  rumble(){
    let dummy = {val:100};
    TweenMax.to(dummy, 0.5, {dummy: 0, onUpdate: ()=>{
      //this.x = Math.random() * 10 * (dummy.val/100);
      this.y = Math.random() * 4 * (dummy.val/100);
    }});
  }
}

module.exports = Game;