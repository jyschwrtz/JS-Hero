class Audio {
  constructor(musicDelay) {
    this.musicDelay = musicDelay;

    this.songDivEl = document.getElementById('song');
    this.muteButton = document.getElementsByClassName('mute')[0];
    this.playing = false;

    this.muteButton.onclick = this.playPauseButton.bind(this);

    // this.src = 'https://s3-us-west-1.amazonaws.com/js-hero-guitar-hero-clone/sweet_child_o_mine.mp3';
    this.src = '../music/sweet_child_o_mine.mp3';
    this.songDivEl.innerHTML =
      `<audio id="audio-player" volume="1" step="1" controls="controls" src=${this.src} type="audio/mpeg">`;
    this.audioPlayerEl = document.getElementById('audio-player');
  }

  startMusic() {
    setTimeout(() => {
      this.audioPlayerEl.play();
    }, this.musicDelay);
    this.playing = true;
  }

  muteMusic() {
    this.audioPlayerEl.setAttribute("volume", 0);
  }

  pauseMusic() {
    this.audioPlayerEl.pause();
    this.playing = false;
  }

  playMusic() {
    this.audioPlayerEl.play();
    this.playing = true;
  }

  playPauseButton() {
    return this.playing ? this.pauseMusic() : this.playMusic();
  }

}

export default Audio;
