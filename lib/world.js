import * as THREE from '../vendor/three';
import PointerLockControls from '../vendor/PointerLockControls.js';
import OrbitControls from '../vendor/OrbitControls.js';
import songNotes from './song';

export const createScene = () => {

  //scene size
  // let width = 800,
  //   height = 600;
  let width = window.innerWidth,
    height = window.innerHeight;

  // camera attributes
  let view_angle = 75,
    aspect = width / height,
    near = 0.1,
    far = 10000;

  let gc = document.getElementById('game-canvas');

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

  let ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1);
  scene.add(ambientLight);

  let background = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
  scene.add( background );

  // Lines
  const zStartPoint = -500,
    zEndPoint = 0,
    yStartPoint = 100,
    yEndPoint = -100;
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


  // Moving notes
  const note = {};
  const vel = .5;
  const noteInterval = 15;
  const beatsPerMeasure = 8;
  note.yVel = vel * (yEndPoint - yStartPoint) / 100;
  note.zVel = vel * (zEndPoint - zStartPoint) / 100;
  note.radius = 5,
  note.color = 0xFFFFFF;
  note.geometry = new THREE.SphereGeometry(note.radius);
  note.material = new THREE.MeshPhongMaterial( { color: note.color } );
  // const sphere1 = new THREE.Mesh(note.geometry, note.material);
  // scene.add(sphere1);
  // sphere1.position.set(xPos[0], yStartPoint, zStartPoint);
  let spheres = [];
  songNotes.forEach((songNote, idx) => {
    spheres[idx] = new THREE.Mesh(note.geometry, note.material);
    scene.add(spheres[idx]);
    spheres[idx].position.set(
      xPos[songNote.pos - 1],
      (yStartPoint - note.yVel * ((songNote.m - 1) * beatsPerMeasure + songNote.t - 1) * noteInterval ),
      (zStartPoint - note.zVel * ((songNote.m - 1) * beatsPerMeasure + songNote.t - 1) * noteInterval) );
  });
  // for (let i = 2; i < 10; i++) {
  //   spheres[i] = new THREE.Mesh(note.geometry, note.material);
  //   scene.add(spheres[i]);
  //   spheres[i].position.set( xPos[1], (yStartPoint - note.yVel * i * noteInterval ), (zStartPoint - note.zVel * i * noteInterval) );
  // }

  // game logic
  const update = () => {
    spheres.forEach(sphere => {
      sphere.position.y += note.yVel;
      sphere.position.z += note.zVel;
      if (sphere.position.z === zEndPoint) {
        scene.remove(sphere);
      }
    });
    // sphere1.position.y += note.yVel;
    // sphere1.position.z += note.zVel;
    // if (sphere1.position.z === zEndPoint) {
    //   scene.remove(sphere1);
    // }

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

};


export default createScene;
