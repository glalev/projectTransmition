const Game = require('./Game');
const PIXI = require('pixi.js');
const Assets = require('./Assets');
const ServerCommunication = require('./ServerCommunication');
const Splash = require('./Splash');
const manifest = require('../data/manifest');
const { Howl } = require('howler');
const { TweenMax, Power0 } = require('gsap');

class App {
  constructor(view) {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer( { width: 1280, height: 720 } );
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
        this.game = new Game();
        this.stage.addChild(this.game);
        this._addServerListeners();
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
          console.warn(resources);
      	manifest.images.forEach(image => {
			Assets.images[image.id] = resources[image.id].texture;
		});
        console.log('loading complete');
        resolve();
      });
     });
  }

  update() {
    this.renderer.render(this.stage);
    this.stage.children.forEach(child => child.update && child.update());
  }

  _addServerListeners() {
    this.comunicator.on('settings', ({id, instruments}) => {

    });

    this.comunicator.on('gameUpdate', (data) => {

    });

    this.comunicator.on('message', (data) => {
      console.log("Message received:", data);
      this._onServerMessageReceived(data);
    });

    this.game.on('keyDown', (data) => {
        this.comunicator.socket.emit('keyDown', data);
    });

    this.game.on('keyUp', (data) => {
        this.comunicator.socket.emit('keyUp', data);
    });
  }

  _onServerMessageReceived(message){
      switch (message) {
        case 'test':
        break;
      }
  }
}

window.App = App;
