// KEY LOGIC ADAPTED FROM https://github.com/nklsrh/BuildNewGames_ThreeJSGame/blob/gh-pages/Scripts/keyboard.js
// Will use this Key.isDown boolean to test if it is being pressed at the right time.

class Key {
  constructor() {
    this._pressed = {};
    this._pressedVisually = {};
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

    this.addKeyListeners();
  }

  addKeyListeners() {
    window.addEventListener('keydown', (e) => {
      this.onKeydown(e);
    });
    window.addEventListener('keyup', (e) => {
      this.onKeyup(e);
    });
  }

  isDown(keyCode) {
    return this._pressed[keyCode];
  }

  isDownVisually(keyCode) {
    return this._pressedVisually[keyCode];
  }

  onKeydown(e) {
    this._pressed[e.keyCode] = true;
    this._pressedVisually[e.keyCode] = true;
  }

  onKeyup(e) {
    delete this._pressedVisually[e.keyCode];
    let buffer = 300; // buffer for leniency
    setTimeout( () => {
      delete this._pressed[e.keyCode];
    }, buffer);
  }

}

export default Key;
