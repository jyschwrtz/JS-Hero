import * as THREE from '../vendor/three';
import OrbitControls from '../vendor/OrbitControls.js';
import { songNotes, beatsPerMeasure } from './song';

class GameView {
  constructor(renderer, camera, scene, noteInterval) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.noteInterval = noteInterval;

    this.note = {};

    this.zStartPoint = -500;
    this.zEndPoint = 0;
    this.yStartPoint = 50;
    this.yEndPoint = -75;
    this.xPos = [-50, -25, 0, 25, 50];

    this.spheres = [];

    this.setup();
    this.gameLoop();
  }

  setup() {
    this.setWindowResizer();
    this.addControls();
    this.backgroundSetup();
    this.setNoteAttributes();
    this.addMovingNotes();
  }

  setWindowResizer() {
    let width,
      height;

    window.addEventListener( 'resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      this.renderer.setSize( width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }

  addControls() {
    let controls =
      new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  backgroundSetup() {
    let backgroundGeometry = new THREE.BoxGeometry( 2000, 1000, 1000 );
    let backgroundMaterials = [ "", "", "", "", "",
      new THREE.MeshPhongMaterial( {
        map: new THREE.TextureLoader().load( 'photos/stage.jpeg' ),
        side: THREE.DoubleSide
      } )
    ];

    let backgroundMaterial = new THREE.MeshFaceMaterial( backgroundMaterials );

    // LIGHTS

    let light = new THREE.PointLight( 0xFFFFFF, 2, 10000);
    light.position.set(0, 300, 0);
    this.scene.add(light);

    let background = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
    this.scene.add( background );

    // LINES

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
    const line1Geometry = new THREE.Geometry();
    line1Geometry.vertices.push(new THREE.Vector3(
      this.xPos[0], this.yStartPoint, this.zStartPoint));
    line1Geometry.vertices.push(new THREE.Vector3(
      this.xPos[0], this.yEndPoint, this.zEndPoint));
    const line1 = new THREE.Line(line1Geometry, lineMaterial);
    this.scene.add(line1);

    const line2Geometry = new THREE.Geometry();
    line2Geometry.vertices.push(new THREE.Vector3(
      this.xPos[1], this.yStartPoint, this.zStartPoint));
    line2Geometry.vertices.push(new THREE.Vector3(
      this.xPos[1], this.yEndPoint, this.zEndPoint));
    const line2 = new THREE.Line(line2Geometry, lineMaterial);
    this.scene.add(line2);

    const line3Geometry = new THREE.Geometry();
    line3Geometry.vertices.push(new THREE.Vector3(
      this.xPos[2], this.yStartPoint, this.zStartPoint));
    line3Geometry.vertices.push(new THREE.Vector3(
      this.xPos[2], this.yEndPoint, this.zEndPoint));
    const line3 = new THREE.Line(line3Geometry, lineMaterial);
    this.scene.add(line3);

    const line4Geometry = new THREE.Geometry();
    line4Geometry.vertices.push(new THREE.Vector3(
      this.xPos[3], this.yStartPoint, this.zStartPoint));
    line4Geometry.vertices.push(new THREE.Vector3(
      this.xPos[3], this.yEndPoint, this.zEndPoint));
    const line4 = new THREE.Line(line4Geometry, lineMaterial);
    this.scene.add(line4);

    const line5Geometry = new THREE.Geometry();
    line5Geometry.vertices.push(new THREE.Vector3(
      this.xPos[4], this.yStartPoint, this.zStartPoint));
    line5Geometry.vertices.push(new THREE.Vector3(
      this.xPos[4], this.yEndPoint, this.zEndPoint));
    const line5 = new THREE.Line(line5Geometry, lineMaterial);
    this.scene.add(line5);
  }

  setNoteAttributes() {
    const note = {};
    const vel = .75;

    this.note.yVel = vel * (this.yEndPoint - this.yStartPoint) / 100;
    this.note.zVel = vel * (this.zEndPoint - this.zStartPoint) / 100;

    this.note.radius = 7.5;

    this.note.colorGreen = 0x4C7048;
    this.note.colorRed = 0xDA3A3C;
    this.note.colorYellow = 0xffeb3b;
    this.note.colorBlue = 0x3f51b5;
    this.note.colorOrange = 0xff5722;

    this.note.geometry = new THREE.SphereGeometry(this.note.radius);

    this.note.materialGreen =
      new THREE.MeshPhongMaterial( { color: this.note.colorGreen } );
    this.note.materialRed =
      new THREE.MeshPhongMaterial( { color: this.note.colorRed } );
    this.note.materialYellow =
      new THREE.MeshPhongMaterial( { color: this.note.colorYellow } );
    this.note.materialBlue =
      new THREE.MeshPhongMaterial( { color: this.note.colorBlue } );
    this.note.materialOrange =
      new THREE.MeshPhongMaterial( { color: this.note.colorOrange } );
  }


  addMovingNotes() {
    let noteMaterial;
    songNotes.forEach((songNote, idx) => {

      switch(songNote.pos) {
        case 1:
          noteMaterial = this.note.materialGreen;
          break;
        case 2:
          noteMaterial = this.note.materialRed;
          break;
        case 3:
          noteMaterial = this.note.materialYellow;
          break;
        case 4:
          noteMaterial = this.note.materialBlue;
          break;
        case 5:
          noteMaterial = this.note.materialOrange;
          break;
      }
      this.spheres[idx] = new THREE.Mesh(this.note.geometry, noteMaterial);
      let time = this.noteInterval * (
        ((songNote.m - 1) * beatsPerMeasure) + songNote.t
      );

      setTimeout( () => {
        this.scene.add(this.spheres[idx]);
        this.spheres[idx].position.set(
          this.xPos[songNote.pos - 1],
          (this.yStartPoint),
          (this.zStartPoint));
        }, time
      );
    });
  }

  sceneUpdate() {
    this.spheres.forEach(sphere => {
      sphere.position.y += this.note.yVel;
      sphere.position.z += this.note.zVel;
      if (sphere.position.z > this.zEndPoint) {
        this.scene.remove(sphere);
      }
    });
  }

  sceneRender() {
    this.renderer.render(this.scene, this.camera);
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));

    this.sceneUpdate();
    this.sceneRender();
  }

}



export default GameView;
