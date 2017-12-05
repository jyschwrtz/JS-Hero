import { songNotes, beatsPerMeasure } from './song';
import Key from './key';

class Game {
  constructor(noteInterval, musicDelay, key) {
    this.noteInterval = noteInterval;
    this.musicDelay = musicDelay;
    this.key = key;

    this.scoreEl = document.getElementsByClassName('score')[0];
    this.streakEl = document.getElementsByClassName('streak')[0];
    this.score = 0;
    this.streak = 0;

  }

  startGame() {
    this.addMusic();
    this.setNoteChecks();
  }

  addMusic() {
    let songDiv = document.getElementById('song');
    setTimeout(() => {
      songDiv.innerHTML =
      '<audio id="audio-player" controls="controls" autoplay="autoplay" src="../music/sweet_child_o_mine.mp3" type="audio/mpeg">';
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
      this.score += 1;
      this.streak += 1;
    } else {
      this.streak = 0;
    }

    this.scoreEl.innerHTML = `Score: ${this.score}`;
    this.streakEl.innerHTML = `Streak: ${this.streak}`;
  }

}

export default Game;
