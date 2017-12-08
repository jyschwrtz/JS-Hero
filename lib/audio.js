class Audio {
  constructor(musicDelay) {
    this.musicDelay = musicDelay;

    this.songDivEl = document.getElementById('song');
    this.muteButton = document.getElementsByClassName('mute')[0];
    this.playPauseButton = document.getElementsByClassName('play-pause')[0];
    this.src = 'https://s3-us-west-1.amazonaws.com/js-hero-guitar-hero-clone/sweet_child_o_mine.mp3';
    this.songDivEl.innerHTML =
      `<audio id="audio-player" step="1" controls="controls" src=${this.src} type="audio/mpeg">`;
    this.audioPlayerEl = document.getElementById('audio-player');

    this.playing = false;
    this.audioPlayerEl.volume = 1;

    this.playPauseButton.onclick = this.playPause.bind(this);
    this.muteButton.onclick = this.mute.bind(this);
  }

  startMusic() {
    setTimeout(() => {
      this.audioPlayerEl.play();
    }, this.musicDelay);
    this.playing = true;
  }

  muteMusic() {
    this.audioPlayerEl.volume = 0;
    this.muteButton.innerHTML = "Unmute";
  }

  unmuteMusic() {
    this.audioPlayerEl.volume = 1;
    this.muteButton.innerHTML = "Mute";
  }

  mute() {
    const vol = this.audioPlayerEl.volume;
    return vol > 0 ? this.muteMusic() : this.unmuteMusic();
  }

  pauseMusic() {
    this.audioPlayerEl.pause();
    this.playing = false;
    this.playPauseButton.innerHTML = "Play";
  }

  playMusic() {
    this.audioPlayerEl.play();
    this.playing = true;
    this.playPauseButton.innerHTML = "Pause";
  }

  playPause() {
    return this.playing ? this.pauseMusic() : this.playMusic();
  }

  fadeOut() {
    // 5 second fade out
    const decInterval = this.audioPlayerEl.volume / 20;
    const fadeAudio = setInterval(() => {
      if (this.audioPlayerEl.volume >= 0.1) {
        this.audioPlayerEl.volume -= decInterval;
      } else {
        clearInterval(fadeAudio);
        this.audioPlayerEl.pause();
      }
    }, 250);
  }

}

export default Audio;
