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

    console.warn(this);

    this.addChild(
      this.characters[0],
      this.characters[1],
      this.characters[2],
      this.characters[3]
    );
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

      character.lastDir = false;
      character.x = x;
      character.y = y;
      character.transform.scale.x = flip ? -0.57 : 0.57;
      character.transform.scale.y = 0.57;
      character.pivot.x = 412;
      character.pivot.y = 420;
      return character;
  }

  playIdle(index){
    TweenMax.fromTo(this.characters[index].transform.scale, 0.6, {x: 0.67}, {x:0.63, repeat: -1, yoyo: true});
  }

  playButton(index){
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
      }});
    } else {
      character.actionSprite1.visible = true;
      TweenMax.fromTo(character.skew, 0.2, {x: 0}, {x:0, 
        onComplete: ()=>{
        character.actionSprite1.visible = false;
        character.idleSprite.visible = true;
      }});
    }
    character.lastDir = !character.lastDir;
  }
}
module.exports = Characters;