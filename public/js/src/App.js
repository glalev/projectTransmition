const Game = require('./Game');
const PIXI = require('pixi.js');
const Assets = require('./Assets');
const ServerCommunication = require('./ServerCommunication');
const manifest = require('../data/manifest');
const fieldsData = require('../data/fields');
const { Howl } = require('howler');
const { gsap } = require('gsap');

class App {
  constructor(view) {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer( { width: 1280, height: 720 } );
    this.view = view;

    this.view.appendChild(this.renderer.view);
    PIXI.ticker.shared.add(this.update, this);

    this.comunicator = new ServerCommunication();
    this.load()
      .then(() => this.comunicator.connect())
      .then(()=> {
        this.game = new Game()
        this.stage.addChild(this.game)
      })
      .then(()=> this._addServerListenres());
  }


  load() {
    return new Promise(resolve => {
    	manifest.sounds.forEach( sound  => {
        Assets.sounds[sound.id]= new Howl({ src: sound.src })
      });
      console.log("Sounds loaded");

      const loader = new PIXI.loaders.Loader();

      manifest.images.forEach( image  => loader.add(image.id, image.src));
      manifest.video.forEach( image  => loader.add(image.id, image.src));
      //Assets.images[image.id] =

      loader.load((loader, resources) => {

      		manifest.images.forEach(image => {
							Assets.images[image.id] = resources[image.id].texture;
		      });

          manifest.video.forEach(video => {
							Assets.videos[video.id] = PIXI.Texture.fromVideo(resources[video.id].url);
		      });

          console.log('loading complete');

          resolve()
      });
     });
  }

  update() {
    this.renderer.render(this.stage);
    this.stage.children.forEach(child => child.update && child.update());

  }

  _addServerListenres() {
    this.comunicator.on('settings', ({id, instruments}) => {
      let data = fieldsData.map((field, i) => {
        field.instruments = instruments[i]
        return field;
      })
      this.game.initFields(data, id)
    });

    this.comunicator.on('gameUpdate', (data) => {
      Object.keys(data).forEach((key)=>{
        data[key][0] = key;
        this.game.spawnSound(data[key]);
      });

    });

    this.comunicator.on('playSound', (data) => {
      this.game.removeBlockOther(data.source, data.instrumentId, data.str);
    });

    this.comunicator.on('progressUpdate', (data) => {
      this.game.centerBar.setPercent(data.prfCount);
    });

    this.comunicator.on('message', (data) => {
      console.log("Message received:", data);
      this._onServerMessageReceived(data);
    });

    this.game.on('keyDown', (data) => {
        this.comunicator.socket.emit('keyDown', data); //todo no cool place to be
    });

  }

  _onServerMessageReceived(message){
      switch (message) {
        case 'startBackground':
          Assets.sounds['idleLoop'].fade(1,0,1000)
          Assets.sounds['bgLoop'].loop(true).play();
          break;
        case 'perfectMatch':
          this.game.centerBar.playCheer();

          break;
        default:

      }
  }
}

window.App = App;