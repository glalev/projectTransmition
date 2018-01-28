const PIXI = require('pixi.js');
require('pixi-animate');
const Block = require('./Block');
const PlayTextFlash = require('../lib/PlayText.js').stage;
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

    this.addChild(zoneBgTolerance, zoneBg, this._playText);
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
        if(block.y === 400) { //todo
          return this._killBlock(block, true);
        }

        block.update();
      });
  }

  addBlock(instrumentId, soundId) {
    const index = instrumentId % 4;
    const keyCode = INPUTS[index];
    const block = new Block({ keyCode, instrumentId, soundId, x: (this.w - 176) / 2, y: 0  });
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

  get _blocks() {
    return this.children.filter(child => child instanceof Block)
  }

  _killBlock(block, silent){
    return new Promise(resolve => {
      this.removeChild(block);
      if(silent) return resolve(false);
      const isInTheZone = this._isInTheZone(block);
      console.log(isInTheZone);
      resolve(isInTheZone)
    });
  }

  _isInTheZone(block) {
    const blockTop = block.y + block.top;
    const blockBottom = block.y + block.bottom;
    const toleranceTop = this._zone.start - this._zone.tolerance / 2;
    const toleranceBottom = this._zone.end + this._zone.tolerance / 2;
    const zoneTop = this._zone.start;
    const zoneBottom = this._zone.end;

    if(blockBottom < toleranceTop){
      let level = this._getLevel(toleranceTop - blockBottom)
      return  { in: false, level, isPerfect: false, soundId: block.soundId, instrumentId: block.instrumentId };
    }
    if(blockTop > toleranceBottom) {
      let level = this._getLevel(blockTop - toleranceBottom)

      return  { in: false, level, isPerfect: false, soundId: block.soundId, instrumentId: block.instrumentId };
    }

    let isPerfect = blockTop >= zoneTop && blockBottom <= zoneBottom;
    let deviation = isPerfect ? 0 : Math.max(Math.abs(blockTop - zoneTop), Math.abs(blockBottom - blockBottom));
    let level = this._getLevel(deviation)

    return { in: true, level, isPerfect, soundId: block.soundId, instrumentId: block.instrumentId, deviation };
  }

  _getLevel(deviation) {
    if(deviation === 0) return 1;
    if(deviation > 100) return 0.1// doto MAX deviation;

    return (100 - deviation) / 100;
  }
}

module.exports = Field;