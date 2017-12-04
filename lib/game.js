// import songNotes from './song';

const Game = (element, songNotes, beatsPerMeasure, noteInterval) => {
  window.addEventListener('keydown', (e) => {
    Key.onKeydown(e);
  });
  window.addEventListener('keyup', (e) => {
    Key.onKeyup(e);
  });

  songNotes.forEach(songNote => {
    setTimeout(() => checkNote(songNote), 2100 + noteInterval * (((songNote.m - 1) * beatsPerMeasure) + songNote.t));
  });


};

const checkNote = (songNote) => {

  console.log(songNote);
  if (Key.isDown(Key.pos[songNote.pos])) {
    console.log(true);
  } else {
    console.log(false);
  }
};

// KEY LOGIC ADAPTED FROM https://github.com/nklsrh/BuildNewGames_ThreeJSGame/blob/gh-pages/Scripts/keyboard.js
// Will use this Key.isDown boolean to test if it is being pressed at the right time.
const Key = {
  _pressed: {},

  pos: {
    1: 65,
    2: 83,
    3: 68,
    4: 70,
    5: 71
  },

  A: 65,  // songNote.pos: 1
  S: 83,  // songNote.pos: 2
  D: 68,  // songNote.pos: 3
  F: 70,  // songNote.pos: 4
  G: 71,  // songNote.pos: 5

  isDown: (keyCode) => {
    return Key._pressed[keyCode];
  },

  onKeydown: (e) => {
    Key._pressed[e.keyCode] = true;
  },

  onKeyup: (e) => {
    delete Key._pressed[e.keyCode];
  }

};
export default Game;
