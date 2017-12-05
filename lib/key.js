// KEY LOGIC ADAPTED FROM https://github.com/nklsrh/BuildNewGames_ThreeJSGame/blob/gh-pages/Scripts/keyboard.js
// Will use this Key.isDown boolean to test if it is being pressed at the right time.

class Key {
  constructor() {
    this._pressed = {};
    this.pos = {
      1: 65,
      2: 83,
      3: 68,
      4: 70,
      5: 71
    };
    this.A = 65;  // songNote.pos: 1
    this.S = 83;  // songNote.pos: 2
    this.D = 68;  // songNote.pos: 3
    this.F = 70;  // songNote.pos: 4
    this.G = 71;  // songNote.pos: 5
  }

  isDown(keyCode) {
    return this._pressed[keyCode];
  }

  onKeydown(e) {
    this._pressed[e.keyCode] = true;
  }

  onKeyup(e) {
    let buffer = 300; // buffer for leniency
    setTimeout( () => {
      delete this._pressed[e.keyCode];
    }, buffer);
  }

}

export default Key;
