const PIXI = require('pixi.js');
require('pixi-animate');
const Block = require('./Block');
const PlayTextFlash = require('../lib/PlayText.js').stage;
const Assets = require('./Assets');
const { TimelineMax, Power2 } = require('gsap');

const INPUTS = [ 65, 83, 75 , 76]; //todo

class Field extends PIXI.Container {
  constructor({ x, y, width, height, zone, instruments }) {
    super();
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this._zone = zone;
    this._instruments = instruments;
    this._playText = new PlayTextFlash();
    this._wrongScreen = new PIXI.Sprite(Assets.images.wrongScreen);
    this._wrongScreen.width = this.w + 40;
    this._wrongScreen.x = -40;

    this._wrongScreen.alpha = 0;
    this._isActive - false;
    const background = new PIXI.Graphics();
    background.beginFill(0x777700);
    background.drawRect(0, 0, width, height);

    const zoneBg = new PIXI.Graphics();
    zoneBg.beginFill(0x007700);
    zoneBg.y = zone.start
    zoneBg.drawRect(0, 0, width, zone.end - zone.start);
    zoneBg.alpha = 0;

    const zoneBgTolerance = new PIXI.Graphics();
    zoneBgTolerance.beginFill(0xaaaa00)
    zoneBgTolerance.y = zone.start - zone.tolerance / 2;
    zoneBgTolerance.drawRect(0, 0, width, (zone.end - zone.start) + zone.tolerance);
    zoneBgTolerance.alpha = 0;

    this.addChild(zoneBgTolerance, zoneBg, this._playText, this._wrongScreen);
  }

  playReady() {
    this._playText.instance.gotoAndPlay('show');
  }

  playGo() {
    this._active = true;
    this._playText.instance.gotoAndPlay('hide');
  }

  update(){
      this._blocks.forEach((block) => {
        if(block.y > 280) { //todo
          block.alpha = 0.5;
          return this._killBlock(block, true);
        }

        block.update();
      });
  }

  addBlock(instrumentId, soundId) {
    const index = instrumentId % 4;
    const keyCode = INPUTS[index];
    const x = ((this.w - 176) / 2) - (2-index)*30;
    const target = this._zone.start-35;
    const block = new Block({ keyCode, instrumentId, soundId, x: x, y: 0, target: target });

    if(!this._active) this.playGo();
    this._blocks.push(block);
    this.addChild(block);
  }

  checkInput(keyCode, symbol) {
    let blockIndex = this._blocks.findIndex((block)=>{
      if(block.keyCode == keyCode) return true;
      else return false;
    });

    if(blockIndex < 0) return Promise.resolve(false);

    return this._killBlock(this._blocks[blockIndex]);
  }

  checkInstrumentId(instrumentId) {
    let blockIndex = this._blocks.findIndex((block)=>{
      if(block.instrumentId == instrumentId) return true;
      else return false;
    });

    if(blockIndex < 0) return Promise.resolve(false);

    return this._killBlock(this._blocks[blockIndex]);
  }

  markMiss() {
    let tl = new TimelineMax();
    this._wrongScreen.alpha = 1;
    tl
      .to(this._wrongScreen, 0.3, { alpha: 0,  ease: Power2.easeOut });
  }

  get _blocks() {
    return this.children.filter(child => {return (child instanceof Block) && (child.isAlive)})
  }

  _killBlock(block, silent){
    return new Promise(resolve => {
      block.isAlive = false;
      if(silent) return resolve(false);
      const isInTheZone = this._isInTheZone(block);

      if(isInTheZone.isPerfect) {
        this._winBlockAnim(block);
      } else {
        this._failBlockAnim(block);
      }
      resolve(isInTheZone)
    });
  }

  _winBlockAnim(block){
    block.background.blendMode = PIXI.BLEND_MODES.ADD;
    block.tween.kill()
    TweenMax.to(block.scale, 0.5, {x:2, y:2});

    TweenMax.to(block, 0.5, {y: "-="+100, x: "-="+100, alpha:0, onComplete:()=>{
      this.removeChild(block);
    }})
  };

  _failBlockAnim(block){
    TweenMax.to(block, 0.5, {alpha:0, onComplete:()=>{
      this.removeChild(block);
    }})
  };

  _isInTheZone(block) {
    const blockTop = block.y + block.top;
    const blockBottom = block.y + block.bottom;
    const toleranceTop = this._zone.start - this._zone.tolerance / 2;
    const toleranceBottom = this._zone.end + this._zone.tolerance / 2;
    const zoneTop = this._zone.start;
    const zoneBottom = this._zone.end;
    let isIn = blockBottom < toleranceTop || blockTop > toleranceBottom;
    let deviation, isPerfect = blockTop >= zoneTop && blockBottom <= zoneBottom;
    if(isPerfect) {
      deviation = 0
    } else {
        let centerBlock = block.y + block.top + (block.bottom - block.top) / 2;
        let centerZone = this._zone.start + (this._zone.end - this._zone.start) / 2;

        deviation = Math.abs(centerZone - centerBlock);
    }

    console.log(deviation);
    //let deviation = isPerfect ? 0 : // Math.max(Math.abs(blockTop - zoneTop), Math.abs(blockBottom - blockBottom));
    let level = this._getLevel(deviation)

    return { in: true, level, isPerfect, soundId: block.soundId, instrumentId: block.instrumentId, deviation };
  }

  _getLevel(deviation) {
    if(deviation === 0) return 1;
    if(deviation > 140) return 0.1// doto MAX deviation;

    return Math.max(0.1, 1 - deviation/160);
  }
}

module.exports = Field;