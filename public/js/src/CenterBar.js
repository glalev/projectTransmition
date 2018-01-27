const PIXI = require('pixi.js');

class CenterBar extends PIXI.Container {
  constructor() {
    super();
    this.size = [100,0,500,100];

    this._background = new PIXI.Graphics();
    this._background.beginFill(0x999999);
    this._background.drawRect(this.size[0],
      this.size[1],
      this.size[2],
      this.size[3]);

    this._loadingBar = new PIXI.Graphics();
    this._loadingBar.beginFill(0x55555);
    this._loadingBar.drawRect(0, 0,
      this.size[2],
      this.size[3]);

    this._loadingBar.x = this.size[0];
    this._loadingBar.y = this.size[1];

    this._waves = [
      this.createWave(0.1, 1, 30, 3),
      this.createWave(0.05, 3, 30, 2),
      this.createWave(0.2, 7, 50, 1)
    ];

    this.currentPercent = 0;
    this.finalPercent = 100;
    this.interference = 1;

    this.setPercent(0);

    this.addChild(this._background);
    this.addChild(this._loadingBar);

    this._waves.forEach((wave)=>{
      this.addChild(wave);
    });

    console.log(this);
  }

  increase(){
      this.setPercent(this.currentPercent+1);
  }

  setPercent(amount){
    if(amount>this.finalPercent) amount = this.finalPercent;
    this.currentPercent = amount;
    this.interference = 1-(this.currentPercent/this.finalPercent);
    this._loadingBar.transform.scale.x = (this.currentPercent/this.finalPercent);
  }

  update(){
    this._waves.forEach((wave)=>{
      this._drawWave(wave);
    });
  }

  createWave(deltaChange, frequency, segmentCount, lineSize){
    let wave = new PIXI.Graphics();

    wave.delta = 0;
    wave.deltaChange = deltaChange;
    wave.frequency = frequency;
    wave.segmentCount = segmentCount;
    wave.lineSize = lineSize;

    return wave;
  }

  _drawWave(wave){
    wave.clear();
    let x, y = 0;
    wave.lineStyle(wave.lineSize, 0xffffff);

    let counter = 0;
    let segments = wave.segmentCount;
    let increment = 1/segments;
    let waveIncrease = Math.PI * 2 / segments;

    wave.delta += wave.deltaChange;
    if(wave.delta>Math.PI*2) wave.delta -= Math.PI*2;

    for (let i = 0; i <= 1; i += increment ) {
      let interferenceValue = (Math.random() * this.interference);
      x = i;
      y = Math.sin( counter + wave.delta + interferenceValue*Math.PI) / 2 + 0.5;

      if(i==0){
            wave.moveTo(
              this.size[0]+(x*this.size[2]),
              this.size[1]+(y*this.size[3])
            );
      }
      wave.lineTo(
        this.size[0]+(x*this.size[2]),
        this.size[1]+(y*this.size[3])
      );

      counter += waveIncrease * wave.frequency;
    }

  }
}

module.exports = CenterBar;