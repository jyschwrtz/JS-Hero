# (Guitar) Hero (Guitar Hero Clone)
## Background and Overview
Guitar Hero is a musical timing game where the user must hit the correct note at the correct time to receive points and move onto the next level.

## Functionality & MVP
Users will be able to:
 - [ ] Play a song pressing keys on the keyboard at the correct time
 - [ ] Hear and see feedback if they are playing correctly
 - [ ] Start, pause, and restart a song

The project will also include:
 - [ ] Links to connect with me (GitHub, LinkedIn)
 - [ ] A modal with instructions on how to play
 - [ ] Select difficulties for a song (if time)

## Wireframes
The app will be a single screen, housing a canvas (possibly three.js if time) where the notes are played, a dropdown for difficulty, links to GitHub and LinkedIn, and other display items shown on the following wireframe:

![wireframe](https://github.com/jyschwrtz/guitar-hero-design/raw/master/wireframes/main_page.png)

## Architecture & Technologies
This app will be implemented using the following technologies:
  * Vanilla JavaScript - structure and game logic
  * three.js - DOM manipulation and rendering
  * AWS S3 for hosting a song
  * Webpack for bundling scripts

## Implementation Timeline
#### Over the Weekend:
 - [X] Tutorials on three.js
 - [X] Setup `webpack`, index.html, and entry.js file
 - [X] Setup scene & camera angle on three.js and figured can show notes moving along a line

#### Day 1:
 - [ ] Work on game logic
   - [ ] Match keystroke timing to game's timing
   - [ ] Create series of notes coming in for user to hit

#### Day 2:
 - [ ] Finish game logic
 - [ ] Make note series create & render in order with three.js
 - [ ] Add music to game

#### Day 3:
 - [ ] Build out the score, song progress, and winning/failing bar
 - [ ] Finish up remaining game logic and three.js issues

#### Day 4:
 - [ ] Finish styling of surrounding components

## Bonus Features
 - [ ] Multiple difficulties
 - [ ] Eight inputs instead of four
 - [ ] Allow user to upload song and create note pattern for playback
