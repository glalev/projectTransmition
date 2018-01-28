const PIXI = require('pixi.js');
const Assets = require('./Assets.js');

class Characters extends PIXI.Container {
  constructor() {
    super();

    this.characters = [
      this.addCharacter(110,750, false),
      this.addCharacter(460,750, false),
      this.addCharacter(823,750, true),
      this.addCharacter(1200,750, true),
    ];

    this.isTired = false;

    this.addChild(
      this.characters[0],
      this.characters[1],
      this.characters[2],
      this.characters[3]
    );

    this.playIdleAll();

  }

  addCharacter(x,y, flip){
      let character = new PIXI.Container();

      character.idleSprite = new PIXI.Sprite(Assets.images.labAliens1);
      character.actionSprite0 = new PIXI.Sprite(Assets.images.labAliens2);
      character.actionSprite0.visible = false;
      character.actionSprite1 = new PIXI.Sprite(Assets.images.labAliens3);
      character.actionSprite1.visible = false;
      character.tiredSprite = new PIXI.Sprite(Assets.images.labAliens4);
      character.tiredSprite.visible = false;

      character.addChild(character.idleSprite, character.actionSprite0, character.actionSprite1, character.tiredSprite);
      character.isFlipped = flip;
      character.lastDir = false;
      character.x = x;
      character.y = y+500;
      character.orgX = x;
      character.orgY = y;
      character.transform.scale.x = flip ? -0.57 : 0.57;
      character.transform.scale.y = 0.57;
      character.pivot.x = 412;
      character.pivot.y = 420;
      character.alpha = 0.5;

      return character;
  }

  showCharacter(index){
    let character = this.characters[index];
    TweenMax.to(character, 0.5, {y: character.orgY});
  }

  hideCharacter(index){
    let character = this.characters[index];
    TweenMax.to(character, 0.5, {y: character.orgY+500});
  }

  playIdleAll(){
    this.isTired = false;
    this.characters.forEach((char, index)=>{
      this.playIdle(index);
    })
  }

  playIdle(index){
    let character = this.characters[index];

    character.idleSprite.visible = true;
    character.actionSprite0.visible = false;
    character.actionSprite1.visible = false;
    character.tiredSprite.visible = false;

    if(character.tiredTween) character.tiredTween.kill();
    if(character.idleTween) character.idleTween.kill();

    character.idleTween = TweenMax.fromTo(character.scale, 0.6, {x: character.isFlipped ? -0.57 : 0.57}, {x:character.isFlipped ? -0.56 : 0.56, repeat: -1, yoyo: true});
  }

  playButton(index){
    if(this.isTired) return;
    let character = this.characters[index];

    character.idleSprite.visible = false;
    character.actionSprite0.visible = false;
    character.actionSprite1.visible = false;
    character.tiredSprite.visible = false;

    if(character.lastDir){
      character.actionSprite0.visible = true;
      TweenMax.fromTo(character.skew, 0.2, {x: -0}, {x:0, 
        onComplete: ()=>{
          character.actionSprite0.visible = false;
          character.idleSprite.visible = true;
          this.playIdle(index);
      }});
    } else {
      character.actionSprite1.visible = true;
      TweenMax.fromTo(character.skew, 0.2, {x: 0}, {x:0, 
        onComplete: ()=>{
          character.actionSprite1.visible = false;
          character.idleSprite.visible = true;
          this.playIdle(index);
      }});
    }

    if(character.tiredTween) character.tiredTween.kill();
    if(character.idleTween) character.idleTween.kill();

    character.lastDir = !character.lastDir;
  }

  playTiredAll(){
    this.isTired = true;
    this.characters.forEach((char, index)=>{
      this.playTired(index);
    })
  }

  playTired(index){
    let character = this.characters[index];

    character.idleSprite.visible = false;
    character.actionSprite0.visible = false;
    character.actionSprite1.visible = false;
    character.tiredSprite.visible = true;
    if(character.tiredTween) character.tiredTween.kill();
    if(character.idleTween) character.idleTween.kill();

    character.tiredTween = TweenMax.fromTo(character.scale, 0.5, {y:0.57}, {y:0.56, yoyo: true, repeat: -1});
    character.tiredTween.timeScale(0.8 + (Math.random()*0.2));
  }

}
module.exports = Characters;