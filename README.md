# JS Hero (JavaScript Hero)
[Live Demo](https://jyschwrtz.github.io/JS-Hero/)

JS Hero is musical browser game where the player must time their song playing (typing) to hit the correct note at the correct time.  Players receive points upon a successful note hit, see their note streak, and a couple other features.  This app was created using Three.js and JavaScript in under a week.

![game-screenshot](https://raw.githubusercontent.com/jyschwrtz/guitar-hero-design/master/photos/game_play.png)

## Features
* Play a song on the keyboard (guitar) by pressing keys in time with the music
* 3D animated notes
* Button to add view controls to look around the 3D scene
* Modal with instructions on how to play

#### Gameplay
The hidden complexity of this game occurs in synchronizing the timing of visual, user-input, timing checks, with an imperfect audio track.  The resulting game plays well with minor hiccups in the timing throughout.
![gameplay](https://raw.githubusercontent.com/jyschwrtz/guitar-hero-design/master/photos/instructions.png)

#### Look Around (3D Animation in Three.js)
This was my first attempt working with Three.js after watching a tutorial over the previous weekend.  Designing in 3D and adding in a time element proved to be a challenging but enjoyable process.
![look-around](https://github.com/jyschwrtz/guitar-hero-design/blob/master/gifs/look_around.gif?raw=true)

#### Song Creation
Below is a code snippet of the song creation.  Each note has a measure (m), beat (t), and position (pos) of the note, with an optional hold component.  The set of notes was iterated over to create the various note objects and timing checks through a series of setTimeouts and other checks.
```
{m:45, t: 1, pos: 4},
{m:45, t: 2, pos: 4},
{m:45, t: 3, pos: 3},
{m:45, t: 4, pos: 2},
{m:45, t: 5, pos: 5},
{m:45, t: 6, pos: 2},
{m:45, t: 7, pos: 4},
{m:45, t: 8, pos: 2},

{m:46, t: 1, pos: 3},
{m:46, t: 2, pos: 3},
{m:46, t: 3, pos: 2},
{m:46, t: 4, pos: 1},
{m:46, t: 5, pos: 5},
{m:46, t: 6, pos: 3},
{m:46, t: 7, pos: 4, hold: 2},
// {m:46, t: 8, pos: 3},
```

#### Instructions Modal
The instructions on how to play can be seen below:
![instructions](https://raw.githubusercontent.com/jyschwrtz/guitar-hero-design/master/photos/instructions.png)

## Project Design
JS Hero was implemented based on the popular console game, Guitar Hero.  Due to a short time-frame, the focus was to get a single song playable and also learn the basics of Three.js in the process, while writing code using OOP design.

Below is a code snippet from the audio class demonstrating the OOP design implemented in this project:
```
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
```

## Technologies
#### JavaScript
Vanilla JavaScript was used throughout much of this project.  The object oriented programming aspects were utilized in using classes to separate and organize code.

#### Three.js
Three.js library was used for all the 3D animation throughout the game.

#### AWS S3
Amazon Web Services S3 was used to host the song file.

## Additional Resources
* [Proposal]()

## Future features
* More songs
* Multiple difficulties
* Allow for song upload and note creation pattern for playback
