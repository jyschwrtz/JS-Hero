# JS Hero (JavaScript Hero)
## Background and Overview
Guitar Hero is a musical timing game where the user must hit the correct note at the correct time to receive points and move onto the next level.

## Functionality & MVP
Users will be able to:
 - [X] Play a song pressing keys on the keyboard at the correct time
 - [X] Hear and see feedback if they are playing correctly
 - [X] Start and mute a song

The project will also include:
 - [X] Links to connect with me (GitHub, LinkedIn)
 - [X] A modal with instructions on how to play
 - [X] 3D animation using Three.js

## Wireframes
The app will be a single screen, housing a canvas (possibly Three.js if time) where the notes are played, a dropdown for difficulty, links to GitHub and LinkedIn, and other display items shown on the following wireframe:

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
 - [X] Work on game logic
   - [X] Match keystroke timing to game's timing
   - [X] Create series of notes coming in for user to hit

#### Day 2:
 - [X] Finish game logic
 - [X] Make note series create & render in order with three.js
 - [X] Add music to game

#### Day 3:
 - [X] Build out the score, song progress, and winning/failing bar
 - [X] Finish up remaining game logic and three.js issues

#### Day 4:
 - [X] Finish styling of surrounding components

## Bonus Features
 - [ ] Multiple difficulties
 - [ ] Eight inputs instead of four
 - [ ] Allow user to upload song and create note pattern for playback
