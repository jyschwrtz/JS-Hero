import songNotes from './song';

const Game = (element) => {
  window.addEventListener('keydown', (e) => {
    Key.onKeydown(e);
  });
  window.addEventListener('keyup', (e) => {
    Key.onKeyup(e);
  });



};

// KEY LOGIC ADAPTED FROM https://github.com/nklsrh/BuildNewGames_ThreeJSGame/blob/gh-pages/Scripts/keyboard.js
// Will use this Key.isDown boolean to test if it is being pressed at the right time.
const Key = {
  _pressed: {},

  A: 65,
  S: 83,
  D: 68,
  F: 70,
  G: 71,

  isDown: (keyCode) => {
    return this._pressed[keyCode];
  },

  onKeydown: (e) => {
    this._pressed[e.keyCode] = true;
  },

  onKeyup: (e) => {
    delete this._pressed[e.keyCode];
  }

}
export default Game;
