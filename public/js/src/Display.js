const PIXI = require('pixi.js');
const Assets = require('./Assets.js');

class Display extends PIXI.Container {
  constructor({ x = 0, y = 0, width = 720, height = 320 } = {}) {
    super();
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this._videos = {}
    const background = new PIXI.Graphics();
    background.beginFill(0x223322);
    background.drawRect(0, 0, width, height);

    this.images = [
        Assets.images.CutScenes1,
        Assets.images.CutScenes2,
        Assets.images.CutScenes3,
        Assets.images.CutScenes4
    ];

    this.addChild(background);

    console.log(this);
  }

  playVideo(video = 'endingVideo') {
    const texture = PIXI.Texture.fromVideo(Assets.videos[video]);
    const sprite = new PIXI.Sprite(texture);

    sprite.width = this.w;
    sprite.height = this.h

    this.removeChildren();
    this.addChild(sprite);
  }

  playStatic(time){
    let dummy = {dummy: 0}
    const bg = new PIXI.Sprite(Assets.images.noiseNormal);
    bg.width = this.w;
    bg.height = this.h;

    const middle = new PIXI.Sprite(Assets.images.CutScenes1);
    middle.width = this.w;
    middle.height = this.h;
    middle.visible = false;

    const top = new PIXI.Sprite(Assets.images.noise50);
    top.width = this.w;
    top.height = this.h;

    TweenMax.to(dummy, time, {dummy:100, onUpdate:()=>{
        top.x = (Math.random() - 0.5) * 15;
        top.y = (Math.random() - 0.5) * 15;

        middle.x = (Math.random() - 0.5) * 15;
        middle.y = (Math.random() - 0.5) * 15;

        middle.alpha = Math.random();
        top.alpha = Math.random();
        middle.texture = this.images[Math.floor(Math.random()*this.images.length)];
        middle.visible = Math.random()>0.95;
    }, onComplete:()=>{
        this.removeChildren();
    }});

    this.addChild(bg,middle,top);
  }
}


module.exports = Display;