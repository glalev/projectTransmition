const PIXI = require('pixi.js');
require('pixi-animate');
const Assets = require('./Assets.js');
const CheeringEffect = require('../lib/CheeringEffect.js').stage;

class CenterBar extends PIXI.Container {
  constructor() {
    super();
    this.size = [332,213,618,64];

    this.cheeringIsPlaying = false;

    this._loadingBar = new PIXI.Graphics();
    this._loadingBar.beginFill(0x79ff23);
    this._loadingBar.drawRect(0, 0,
      this.size[2],
      this.size[3]);

    this._loadingBar.alpha = 0.5;

    this._loadingBar.x = this.size[0];
    this._loadingBar.y = this.size[1];

    this._background = new PIXI.Sprite(Assets.images.loadingBG);
    this._background.x = this.size[0];
    this._background.y = this.size[1];

    this._waves = [
      this.createWave(0.1, 1, 30, 3, 0x6AFF7A),
      this.createWave(0.05, 3, 30, 2, 0xBDFFC4),
      this.createWave(0.2, 7, 50, 1, 0x00FF1B)
    ];

    this.currentPercent = 0;
    this.finalPercent = 400;
    this.interference = 1;

    this.setPercent(0);

    this.addChild(this._background, this._loadingBar);

    this._waves.forEach((wave)=>{
      this.addChild(wave);
    });

    this._cheeringEffect = new CheeringEffect();
    this._cheeringEffect.children[0].stop();
    this.addChild(this._cheeringEffect);

    this._cheeringEffect.transform.scale.x = 0.67;
    this._cheeringEffect.transform.scale.y = 0.67;

    console.log(this);
  }

  playCheer(){
    if(this.cheeringIsPlaying) return;
    this.cheeringIsPlaying = true;
    let fx = this._cheeringEffect.children[0];
    Assets.sounds["progressBarFx"].volume(0.5).play();
    fx.gotoAndPlay("show");
    fx.text.gotoAndStop(Math.round(Math.random()*8));
    fx.once("SHOW_END", ()=>{
      this.cheeringIsPlaying = false;
    });

  }

  increase(){
      this.setPercent(this.currentPercent+1);
  }

  setPercent(amount){
    if(amount>this.finalPercent) amount = this.finalPercent;
    this.currentPercent = amount;
    this.interference = 1-(this.currentPercent/this.finalPercent);
    this._loadingBar.transform.scale.x = (this.currentPercent/this.finalPercent);
    
    TweenMax.fromTo(this._loadingBar, 0.5, {alpha: 1}, {alpha:0.5})
  }

  update(){
    this._waves.forEach((wave)=>{
      this._drawWave(wave);
    });
  }

  createWave(deltaChange, frequency, segmentCount, lineSize, color){
    let wave = new PIXI.Graphics();

    wave.delta = 0;
    wave.deltaChange = deltaChange;
    wave.frequency = frequency;
    wave.segmentCount = segmentCount;
    wave.lineSize = lineSize;
    wave.color = color;

    return wave;
  }

  _drawWave(wave){
    wave.clear();
    let x, y = 0;
    wave.lineStyle(wave.lineSize, wave.color);

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
              this.size[0]-1,
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