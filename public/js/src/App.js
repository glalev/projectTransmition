const Misc = require('./Misc.js');
const PIXI = require('pixi.js');
const _ = require('underscore');
const { Howl } = require('howler');
const { TweenMax } = require('gsap');
const Game = require('./Game');
const Assets = require('./Assets');
const ServerCommunication = require('./ServerCommunication');
const Splash = require('./Splash');
const manifest = require('../data/manifest');

class App {
  constructor(view) {
    this.WIDTH = 1280;
    this.HEIGHT = 720;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer( { width: this.WIDTH, height: this.HEIGHT } );
    this.view = view;

    this.view.appendChild(this.renderer.view);
    PIXI.ticker.shared.add(this.update, this);

    this.comunicator = new ServerCommunication();
    let loading = PIXI.Sprite.fromImage('./assets/Images/loadingBar.png');
    loading.pivot.x = 130;
    loading.pivot.y = 130;
    loading.x = 670;
    loading.y = 360;
    TweenMax.to(loading, 4, { rotation: 2 * -6.28319, ease: Power0.easeNone, repeat: -1 });
    this.stage.addChild(loading);

    this.load()
      .then(() => this.comunicator.connect())
      .then(() => {
        this.stage.removeChildren();
        this.splash = new Splash();
        this.stage.addChild(this.splash);
        return this.splash.show();
      })
      .then(()=> {
        this.stage.removeChild(this.splash);
        this.game = new Game(this.comunicator);
        this.stage.addChild(this.game);
    });
  }

  load() {
    return new Promise(resolve => {
    	manifest.sounds.forEach( sound  => {
        Assets.sounds[sound.id] = new Howl({ src: sound.src })
      });
      console.log("Sounds loaded");

      const loader = new PIXI.loaders.Loader();

      manifest.images.forEach( image  => loader.add(image.id, image.src));
      loader.load((loader, resources) => {
      	manifest.images.forEach(image => {
			Assets.images[image.id] = resources[image.id].texture;
		});

        manifest.spriteSheets.forEach(spriteSheet => {
            this.extractSpriteSheetFrames(Assets.images[spriteSheet.id], spriteSheet);
        });
        console.log('loading complete');
        resolve();
      });
     });
  }

  extractSpriteSheetFrames(image, data){
      let imgArray = [];
      _.times(data.rowCount, (y)=>{
          _.times(data.columnCount, (x)=>{
              imgArray.push(new PIXI.Texture(image,
                  new PIXI.Rectangle(
                      (data.cellX*x)+data.paddingX,
                      (data.cellY*y)+data.paddingY,
                      data.cellX, data.cellY)
                  )
              );
          });
      });

      Assets.spriteSheets[data.id] = imgArray;
  }

  update(e) {
    this.renderer.render(this.stage);
    this.stage.children.forEach(child => child.update && child.update());
  }
}

window.App = App;
