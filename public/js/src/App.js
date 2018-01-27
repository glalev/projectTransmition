
const Game = require('./Game');
const PIXI = require('pixi.js');
const Assets = require('./Assets');
const ServerCommunication = require('./ServerCommunication');
const manifest = require('../data/manifest');
const fieldsData = require('../data/fields');
const { Howl } = require('howler');

class App {
  constructor(view) {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer( { width: 880, height: 600 , backgroundColor: 0x222222 } );
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
      const loader = new PIXI.loaders.Loader();
      manifest.sounds.forEach( sound  => {
        Assets.sounds[sound.name]= new Howl({ src: sound.src })
      });
      resolve();
    //   Object.keys(manifest).forEach(group => {
    //     manifest[group].forEach(({ name, src }) => loader.add(name, src))
    //     loader.load((loader, assets) => {
    //         Object.keys(assets).forEach(name => {
    //           if(assets[name].extension === "ogg"){
    //             Assets.sounds[name] = new Howl(name);
    //             console.log(Assets);
    //           }
    //         })
    //         resolve(Assets);
    //     });
    //   });
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

      this.game.spawnSound(data)
      //console.log(data);
      //Assets.sounds.bassG.play();
      //console.log(data);
    });
  }
}

window.App = App;