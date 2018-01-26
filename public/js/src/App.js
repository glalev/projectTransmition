
const Game = require('./Game');


class App {
  constructor(view) {
    this.game = new Game({ width: 800, height: 600, view });
  }

}

window.App = App;