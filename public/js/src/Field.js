const PIXI = require('pixi.js');
const Block = require('./Block');

const Assets = require('./Assets');
const INPUTS = [ 65, 83, 75 , 76]; //todo

class Field extends PIXI.Container {
  constructor({ x, y, width, height, zone, instruments }) {
    super();
    this.x = x;
    this.y = y;

    this._zone = zone;
    this._instruments = instruments;

    const background = new PIXI.Graphics();
    background.beginFill(0x777777);
    background.drawRect(0, 0, width, height);

    const zoneBg = new PIXI.Graphics();
    zoneBg.beginFill(0x007700);
    zoneBg.y = zone.start
    zoneBg.drawRect(0, 0, width, zone.end - zone.start);
    const zoneBgTolerance = new PIXI.Graphics();
    zoneBgTolerance.beginFill(0xaaaa00)
    zoneBgTolerance.y = zone.start - zone.tolerance / 2;
    zoneBgTolerance.drawRect(0, 0, width, (zone.end - zone.start) + zone.tolerance);
    this.addChild(background, zoneBgTolerance, zoneBg);
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

    const block = new Block({ keyCode, soundId: '' + instrumentId + soundId, x: index * 50, y: 0  });
    this._blocks.push(block);
    this.addChild(block);
  }

  checkInput(keyCode, symbol) {
    if(this._blocks[0].keyCode !== keyCode) return;


    this._killBlock(this._blocks[0]);
  }

  get _blocks() {
    return this.children.filter(child => child instanceof Block)
  }
  _killBlock(block, silent){
    this.removeChild(block);
    const isInTheZone = this._isInTheZone(block);
    if(!silent && isInTheZone.in) Assets.sounds[block.soundId].play()
  }

  _isInTheZone(block) {
    const blockTop = block.y;
    const blockBottom = block.y + block.height;
    const toleranceTop = this._zone.start - this._zone.tolerance / 2;
    const toleranceBottom = this._zone.end + this._zone.tolerance / 2;
    const zoneTop = this._zone.start;
    const zoneBottom = this._zone.end;

    if(blockBottom < toleranceTop) return { in: false, deviation: toleranceTop - blockBottom }
    if(blockTop > toleranceBottom) return { in: false, deviation: blockTop - toleranceBottom }

    let isPerfect = blockTop >= zoneTop && blockBottom <= zoneBottom;
    let deviation = isPerfect ? 0 : Math.max(Math.abs(blockTop - zoneTop), Math.abs(blockBottom - blockBottom));

    return { in: true, deviation};
  }
}

module.exports = Field;