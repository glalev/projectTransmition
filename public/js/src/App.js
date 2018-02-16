const Misc = require('./Misc.js');
const cfg = require('./Config.js');
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
    this.WIDTH = cfg.gameSize.width;
    this.HEIGHT = cfg.gameSize.height;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer( { width: this.WIDTH, height: this.HEIGHT } );
    this.renderer.view.classList.add("gameCanvas");
    this.view = view;

    window.onresize = this.onResize.bind(this);

    this.view.appendChild(this.renderer.view);
    PIXI.ticker.shared.add(this.update, this);

    this.communicator = new ServerCommunication();
    let loading = PIXI.Sprite.fromImage('./assets/Images/loadingBar.png');
    loading.pivot.x = 130;
    loading.pivot.y = 130;
    loading.x = 670;
    loading.y = 360;
    TweenMax.to(loading, 4, { rotation: 2 * -6.28319, ease: Power0.easeNone, repeat: -1 });
    this.stage.addChild(loading);

    this.load()
      .then(() => this.communicator.connect())
      .then(() => {
        this.stage.removeChildren();
        this.splash = new Splash();
        this.stage.addChild(this.splash);
        return this.splash.show();
      })
      .then(()=> {
        this.stage.removeChild(this.splash);
        this.game = new Game(this.communicator);
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
      manifest.spritesheets.forEach( spritesheet  => loader.add(spritesheet.id, spritesheet.src));
      loader.load((loader, resources) => {
        manifest.images.forEach(image => {
    		Assets.images[image.id] = resources[image.id].texture;
    	});

        manifest.spritesheets.forEach(spritesheet => {
          resources[spritesheet.id].array = _.map(resources[spritesheet.id].textures, (texture)=>{return texture})
          Assets.spritesheets[spritesheet.id] = resources[spritesheet.id];
        });

        console.log('loading complete');
        resolve();
      });
     });
  }

  onResize(e){
      return; //Do nothing.
  }

  update(e) {
    this.renderer.render(this.stage);
    this.stage.children.forEach(child => child.update && child.update());
  }
}

window.App = App;
