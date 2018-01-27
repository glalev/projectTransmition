
const Game = require('./Game');
const PIXI = require('pixi.js');
const Assets = require('./Assets');
const ServerCommunication = require('./ServerCommunication');
const manifest = require('../data/manifest');

class App {
  constructor(view) {
    this.load()
      .then(()=> {
        this.game = new Game({ width: 800, height: 600, view })
        this.comunicator = new ServerCommunication();
        this.comunicator.sendLoginData();

      });
  }


  load() {
    return new Promise(resolve => {
      const loader = new PIXI.loaders.Loader();

      Object.keys(manifest).forEach(group => {
        manifest[group].forEach(({ name, src }) => loader.add(name, src))
        loader.load((loader, assets) => {
            Object.keys(assets).forEach(name => {
              if(assets[name].extension === "ogg"){
                Assets.sounds[name] = assets[name];
              }
            })
            resolve(Assets);
        });
      });
    });
  }

}

window.App = App;