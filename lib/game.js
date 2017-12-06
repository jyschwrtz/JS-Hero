import * as THREE from '../vendor/three';
import PointerLockControls from '../vendor/PointerLockControls.js';
import OrbitControls from '../vendor/OrbitControls.js';

import Key from './key';
import Audio from './audio';
import GameNotes from './game_notes';
import GameView from './game_view';

class Game {
  constructor() {
    this.noteInterval = 238.5;
    this.musicDelay = 1800;
    this.key = new Key();

    this.createGameView();
  }

  startGame() {
    this.addMusic();
    this.addGameNotes();
  }

  createGameView() {
    // SCENE SIZE
    let width = window.innerWidth,
      height = window.innerHeight;

    // CAMERA ATTRIBUTE
    let viewAngle = 75,
      aspect = width / height,
      near = 0.1,
      far = 10000;

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      viewAngle,
      aspect,
      near,
      far);

    camera.position.z = 150;

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.getElementById('game-canvas').appendChild( renderer.domElement );

    this.gameView = new GameView(
      renderer, camera, scene, this.noteInterval, this.key
    );
  }

  addMusic() {
    this.music = new Audio(this.musicDelay);
    // this.music.startMusic();
  }

  addGameNotes() {
    this.gameNotes = new GameNotes(
      this.noteInterval, this.musicDelay, this.key
    );
    this.gameNotes.setNoteChecks();
  }

}

export default Game;
