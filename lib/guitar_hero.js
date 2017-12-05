import * as THREE from '../vendor/three';
import PointerLockControls from '../vendor/PointerLockControls.js';
import OrbitControls from '../vendor/OrbitControls.js';

import Game from "./game";
import GameView from "./game_view";

document.addEventListener("DOMContentLoaded", () => {
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

  //Audio
  let musicDelay = 1875;
  let noteInterval = 238.5;

  let gameView = new GameView(renderer, camera, scene, noteInterval);
  let game = new Game(noteInterval, musicDelay);
  game.startGame();

});
