import { songNotes, beatsPerMeasure } from './song';
import Key from './key';

class Game {
  constructor(noteInterval, musicDelay) {
    this.noteInterval = noteInterval;
    this.musicDelay = musicDelay;
    this.key = new Key;

    this.element = document.getElementById('game-score');
    this.score = 0;
    this.streak = 0;

    // this.startGame();

  }

  startGame() {
    this.addMusic();
    this.addKeyListeners();
    this.setNoteChecks();
  }

  addMusic() {
    let songDiv = document.getElementById('song');
    setTimeout(() => {
      songDiv.innerHTML =
      '<audio id="audio-player" controls="controls" autoplay="autoplay" src="../music/sweet_child_o_mine.mp3" type="audio/mpeg">';
    }, this.musicDelay);
  }

  addKeyListeners() {
    window.addEventListener('keydown', (e) => {
      this.key.onKeydown(e);
    });
    window.addEventListener('keyup', (e) => {
      this.key.onKeyup(e);
    });
  }

  setNoteChecks() {
    songNotes.forEach(songNote => {
      setTimeout(
        () => this.checkNote(songNote),
        250 + this.musicDelay + this.noteInterval * (((songNote.m - 1) * beatsPerMeasure) + songNote.t));
    });
  }

  checkNote(songNote) {
    console.log(this.key.isDown(this.key.pos[songNote.pos]));
    if (this.key.isDown(this.key.pos[songNote.pos])) {
      this.score += 1;
      this.streak += 1;
    } else {
      this.streak = 0;
    }

    this.element.innerHTML = `<h1 class="score">Score: ${this.score}, Streak: ${this.streak}</h1>`;
  }

}

export default Game;
