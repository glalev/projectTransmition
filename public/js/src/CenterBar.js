const PIXI = require('pixi.js');

class CenterBar extends PIXI.Container {
  constructor() {
    super();
    this.size = [0,0,250,100];

    this._background = new PIXI.Graphics();
    this._background.beginFill(0x999999);
    this._background.drawRect(this.size[0], 
      this.size[1], 
      this.size[2], 
      this.size[3]);

    this._waves = [this.createWave()]; // new PIXI.Graphics();

    this.interference = 0.3;

    this.addChild(this._background);
    this.addChild(this._waves[0]);
    
  }

  update(){
    this._drawWave(this._waves[0]);
  }

  createWave(data){
    let wave = new PIXI.Graphics();

    wave.delta = 0;
    wave.deltaChange = 0.1;
    wave.frequency = 1;

    return wave;
  }

  _drawWave(wave){
    wave.clear();
    let x, y = 0;
    wave.moveTo(x,y);
    wave.lineStyle(10, 0xffffff);

    let counter = 0;
    let segments = 50;
    let increment = 1/segments;
    let waveIncrease = Math.PI * 2 / segments;

    wave.delta += wave.deltaChange;
    if(wave.delta>Math.PI*1) wave.delta = 1-wave.delta;

    for (let i = 0; i <= 1; i += increment ) {
      x = i;
      y = Math.sin( counter + wave.delta) / 2 + 0.5 + (Math.random() * this.interference);

      wave.lineTo(x*this.size[2],y*this.size[3]);

      counter += waveIncrease * wave.frequency;
    }

  }
}

module.exports = CenterBar;
/*

function SineWaveGenerator(options) {
  $.extend(this, options || {});
  
  if(!this.el) { throw "No Canvas Selected"; }
  this.ctx = this.el.getContext('2d');
  
  if(!this.waves.length) { throw "No waves specified"; }
  
  // Internal
  this._resizeWidth();
  window.addEventListener('resize', this._resizeWidth.bind(this));
  // User
  this.resizeEvent();
  window.addEventListener('resize', this.resizeEvent.bind(this));
  
  if(typeof this.initialize === 'function') {
    this.initialize.call(this);
  }
  // Start the magic
  this.loop();
}

// Defaults
SineWaveGenerator.prototype.speed = 10;
SineWaveGenerator.prototype.amplitude = 50;
SineWaveGenerator.prototype.wavelength = 50;
SineWaveGenerator.prototype.segmentLength = 10;

SineWaveGenerator.prototype.lineWidth = 2;
SineWaveGenerator.prototype.strokeStyle  = 'rgba(255, 255, 255, 0.2)';

SineWaveGenerator.prototype.resizeEvent = function() {};

// fill the screen
SineWaveGenerator.prototype._resizeWidth = function() {
  this.dpr = window.devicePixelRatio || 1;
  
  this.width = this.el.width = window.innerWidth * this.dpr;
  this.height = this.el.height = window.innerHeight * this.dpr;
  this.el.style.width = window.innerWidth + 'px';
  this.el.style.height = window.innerHeight + 'px';
  
  this.waveWidth = this.width * 0.95;
  this.waveLeft = this.width * 0.025;
}

SineWaveGenerator.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

SineWaveGenerator.prototype.time = 0;

SineWaveGenerator.prototype.update = function(time) {  
  this.time = this.time - 0.007;
  if(typeof time === 'undefined') {
    time = this.time;
  }

  var index = -1;
  var length = this.waves.length;

  while(++index < length) {
    var timeModifier = this.waves[index].timeModifier || 1;
    this.drawSine(time * timeModifier, this.waves[index]);
  }
  index = void 0;
  length = void 0;
}

// Constants
var PI2 = Math.PI * 2;
var HALFPI = Math.PI / 2;

SineWaveGenerator.prototype.ease = function(percent, amplitude) {
  return amplitude * (Math.sin(percent * PI2 - HALFPI) + 1) * 0.5;
}

SineWaveGenerator.prototype.drawSine = function(time, options) {
  options = options || {};
  amplitude = options.amplitude || this.amplitude;
  wavelength = options.wavelength || this.wavelength;
  lineWidth = options.lineWidth || this.lineWidth;
  strokeStyle = options.strokeStyle || this.strokeStyle;
  segmentLength = options.segmentLength || this.segmentLength;
  
  var x = time;
  var y = 0;  
  var amp = this.amplitude;
 
  // Center the waves
  var yAxis = this.height / 2; 
  
  // Styles
  this.ctx.lineWidth = lineWidth * this.dpr;
  this.ctx.strokeStyle = strokeStyle;
  this.ctx.lineCap = 'round';
  this.ctx.lineJoin = 'round';
  this.ctx.beginPath();
  
  // Starting Line
  this.ctx.moveTo(0, yAxis);
  this.ctx.lineTo(this.waveLeft, yAxis);
  
  for(var i = 0; i < this.waveWidth; i += segmentLength) {
    x = (time * this.speed) + (-yAxis + i) / wavelength; 
    y = Math.sin(x) + Math.random()*0.1; 
    
    // Easing
    amp = this.ease(i / this.waveWidth, amplitude); 
    
    this.ctx.lineTo(i + this.waveLeft, amp * y + yAxis);
    
    amp = void 0;
  }
  
  // Ending Line
  this.ctx.lineTo(this.width, yAxis);
  
  // Stroke it
  this.ctx.stroke();
  
  // Clean up
  options = void 0;
  amplitude = void 0;
  wavelength = void 0;
  lineWidth = void 0;
  strokeStyle = void 0;
  segmentLength = void 0;
  x = void 0;
  y = void 0;
} 

SineWaveGenerator.prototype.loop = function() {
  this.clear();
  this.update();
  
  window.requestAnimationFrame(this.loop.bind(this));
}

new SineWaveGenerator({
  el: document.getElementById('waves'),
  
  speed: 8,
  
  waves: [
    {
      timeModifier: 1,
      lineWidth: 3,
      amplitude: 150,
      wavelength: 200,
      segmentLength: 20,
//       strokeStyle: 'rgba(255, 255, 255, 0.5)'
    },
    {
      timeModifier: 1,
      lineWidth: 2,
      amplitude: 150,
      wavelength: 100,
//       strokeStyle: 'rgba(255, 255, 255, 0.3)'
    },
    {
      timeModifier: 1,
      lineWidth: 1,
      amplitude: -150,
      wavelength: 50,
      segmentLength: 10,
//       strokeStyle: 'rgba(255, 255, 255, 0.2)'
    },
    {
      timeModifier: 1,
      lineWidth: 0.5,
      amplitude: -100,
      wavelength: 100,
      segmentLength: 10,
//       strokeStyle: 'rgba(255, 255, 255, 0.1)'
    }
  ],
  
  initialize: function (){

  },
  
  resizeEvent: function() {
    var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0,"rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(1,"rgba(0, 0, 0, 0)");
    
    var index = -1;
    var length = this.waves.length;
    while(++index < length){
      this.waves[index].strokeStyle = gradient;
    }
    
    // Clean Up
    index = void 0;
    length = void 0;
    gradient = void 0;
  }
});
*/