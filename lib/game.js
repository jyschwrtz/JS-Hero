import { songNotes, beatsPerMeasure } from './song';
import Key from './key';

class Game {
  constructor(noteInterval, musicDelay, key) {
    this.noteInterval = noteInterval;
    this.musicDelay = musicDelay;
    this.key = key;

    this.scoreEl = document.getElementsByClassName('score')[0];
    this.streakEl = document.getElementsByClassName('streak')[0];
    this.multiplierEl = document.getElementsByClassName('multiplier')[0];
    this.score = 0;
    this.streak = 0;
    this.multiplier = 1;

  }

  startGame() {
    this.addMusic();
    this.setNoteChecks();
  }

  addMusic() {
    let songDiv = document.getElementById('song');
    let src = 'https://s3-us-west-1.amazonaws.com/js-hero-guitar-hero-clone/sweet_child_o_mine.mp3';
    setTimeout(() => {
      songDiv.innerHTML =
      `<audio id="audio-player" controls="controls" autoplay="autoplay" src=${src} type="audio/mpeg">`;
    }, this.musicDelay);
  }

  setNoteChecks() {
    songNotes.forEach(songNote => {
      let timeDelay = 250;
      if (songNote.m > 48) {
        timeDelay = 350;
      }
      setTimeout(
        () => this.checkNote(songNote),
        timeDelay + this.musicDelay + this.noteInterval * (((songNote.m - 1) * beatsPerMeasure) + songNote.t));
    });
  }

  checkNote(songNote) {
    console.log(this.key.isDown(this.key.pos[songNote.pos]));
    if (this.key.isDown(this.key.pos[songNote.pos])) {
      if (this.streak < 10) {
        this.multiplier = 1;
      } else if (this.streak > 30) {
        this.multiplier = 4;
      } else if (this.streak > 20) {
        this.multiplier = 3;
      } else if (this.streak > 10) {
        this.multiplier = 2;
      }
      this.score += 100 * Number(this.multiplier);
      this.streak += 1;
    } else {
      this.streak = 0;
    }

    this.scoreEl.innerHTML = `Score: ${this.score}`;
    this.streakEl.innerHTML = `Streak: ${this.streak}`;
    this.multiplierEl.innerHTML = `Multiplier: ${this.multiplier}X`;
  }

}

export default Game;
