import * as THREE from '../vendor/three';
import PointerLockControls from '../vendor/PointerLockControls.js';
import OrbitControls from '../vendor/OrbitControls.js';
import { songNotes, beatsPerMeasure } from './song';
import Game from './game';

export const createScene = () => {

  //scene size
  // let width = 800,
  //   height = 600;
  let width = window.innerWidth,
    height = window.innerHeight;

  // CAMERA ATTRIBUTE
  let view_angle = 75,
    aspect = width / height,
    near = 0.1,
    far = 10000;

  let gc = document.getElementById('game-canvas');

  // ADD MUSIC
  let songDiv = document.getElementById('song');
  setTimeout(() => {
    songDiv.innerHTML =
    '<audio id="audio-player" controls="controls" autoplay="autoplay" src="../music/sweet_child_o_mine.mp3" type="audio/mpeg">';
  }, 2000);


  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    view_angle,
    aspect,
    near,
    far);

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  gc.appendChild( renderer.domElement );

  window.addEventListener( 'resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  camera.position.z = 150;

  let controls = new THREE.OrbitControls(camera, renderer.domElement);


  // Background Setup
  let backgroundGeometry = new THREE.BoxGeometry( 2000, 1000, 1000 );
  let backgroundMaterials = [ "", "", "", "", "",
    new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load( 'photos/stage.jpeg' ), side: THREE.DoubleSide } )
  ];

  let backgroundMaterial = new THREE.MeshFaceMaterial( backgroundMaterials );

  //LIGHTS

  let light = new THREE.PointLight( 0xFFFFFF, 2, 10000);
  light.position.set(0, 300, 0);
  scene.add(light);

  // let ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1);
  // scene.add(ambientLight);

  let background = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
  scene.add( background );

  // LINES
  const zStartPoint = -500,
    zEndPoint = 0,
    yStartPoint = 50,
    yEndPoint = -75;
  const xPos = [-50, -25, 0, 25, 50];

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
  const line1Geometry = new THREE.Geometry();
  line1Geometry.vertices.push(new THREE.Vector3(xPos[0], yStartPoint, zStartPoint));
  line1Geometry.vertices.push(new THREE.Vector3(xPos[0], yEndPoint, zEndPoint));
  const line1 = new THREE.Line(line1Geometry, lineMaterial);
  scene.add(line1);

  const line2Geometry = new THREE.Geometry();
  line2Geometry.vertices.push(new THREE.Vector3(xPos[1], yStartPoint, zStartPoint));
  line2Geometry.vertices.push(new THREE.Vector3(xPos[1], yEndPoint, zEndPoint));
  const line2 = new THREE.Line(line2Geometry, lineMaterial);
  scene.add(line2);

  const line3Geometry = new THREE.Geometry();
  line3Geometry.vertices.push(new THREE.Vector3(xPos[2], yStartPoint, zStartPoint));
  line3Geometry.vertices.push(new THREE.Vector3(xPos[2], yEndPoint, zEndPoint));
  const line3 = new THREE.Line(line3Geometry, lineMaterial);
  scene.add(line3);

  const line4Geometry = new THREE.Geometry();
  line4Geometry.vertices.push(new THREE.Vector3(xPos[3], yStartPoint, zStartPoint));
  line4Geometry.vertices.push(new THREE.Vector3(xPos[3], yEndPoint, zEndPoint));
  const line4 = new THREE.Line(line4Geometry, lineMaterial);
  scene.add(line4);

  const line5Geometry = new THREE.Geometry();
  line5Geometry.vertices.push(new THREE.Vector3(xPos[4], yStartPoint, zStartPoint));
  line5Geometry.vertices.push(new THREE.Vector3(xPos[4], yEndPoint, zEndPoint));
  const line5 = new THREE.Line(line5Geometry, lineMaterial);
  scene.add(line5);


  // MOVING NOTES
  const note = {};
  const vel = .75;
  // const noteInterval = 14.2; // for positional version
  const noteInterval = 237.5; // for setInterval version
  // const beatsPerMeasure = 8;
  note.yVel = vel * (yEndPoint - yStartPoint) / 100;
  note.zVel = vel * (zEndPoint - zStartPoint) / 100;

  note.radius = 7.5,

  note.colorGreen = 0x4C7048;
  note.colorRed = 0xDA3A3C;
  note.colorYellow = 0xffeb3b;
  note.colorBlue = 0x3f51b5;
  note.colorOrange = 0xff5722;

  note.geometry = new THREE.SphereGeometry(note.radius);

  note.materialGreen = new THREE.MeshPhongMaterial( { color: note.colorGreen } );
  note.materialRed = new THREE.MeshPhongMaterial( { color: note.colorRed } );
  note.materialYellow = new THREE.MeshPhongMaterial( { color: note.colorYellow } );
  note.materialBlue = new THREE.MeshPhongMaterial( { color: note.colorBlue } );
  note.materialOrange = new THREE.MeshPhongMaterial( { color: note.colorOrange } );

  let spheres = [];
  let noteMaterial;
  songNotes.forEach((songNote, idx) => {

    switch(songNote.pos) {
      case 1:
        noteMaterial = note.materialGreen;
        break;
      case 2:
        noteMaterial = note.materialRed;
        break;
      case 3:
        noteMaterial = note.materialYellow;
        break;
      case 4:
        noteMaterial = note.materialBlue;
        break;
      case 5:
        noteMaterial = note.materialOrange;
        break;
    }
    spheres[idx] = new THREE.Mesh(note.geometry, noteMaterial);
    let time = 237.5 * (((songNote.m - 1) * beatsPerMeasure) + songNote.t);

    setTimeout( () => {
      scene.add(spheres[idx]);
      spheres[idx].position.set(
        xPos[songNote.pos - 1],
        (yStartPoint),
        (zStartPoint));
      }, time
    );

    // scene.add(spheres[idx]);
    // spheres[idx].position.set(
    //   xPos[songNote.pos - 1],
    //   (yStartPoint - note.yVel * ((songNote.m - 1) * beatsPerMeasure + songNote.t - 1) * noteInterval ),
    //   (zStartPoint - note.zVel * ((songNote.m - 1) * beatsPerMeasure + songNote.t - 1) * noteInterval) );
  });

  // game logic
  const update = () => {
    spheres.forEach(sphere => {
      sphere.position.y += note.yVel;
      sphere.position.z += note.zVel;
      if (sphere.position.z > zEndPoint) {
        scene.remove(sphere);
      }
    });

  };

  // draw Scene
  const render = () => {
    renderer.render(scene, camera);
  };

  //run game loop (update, render, repeat)
  const GameLoop = () => {
    requestAnimationFrame(GameLoop);

    update();
    render();

  };

  GameLoop();
  Game(gc, songNotes, beatsPerMeasure, noteInterval);

};


export default createScene;
