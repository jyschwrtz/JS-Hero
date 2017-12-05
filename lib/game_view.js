import * as THREE from '../vendor/three';
import OrbitControls from '../vendor/OrbitControls.js';
import { songNotes, beatsPerMeasure } from './song';

class GameView {
  constructor(renderer, camera, scene, noteInterval, key) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.noteInterval = noteInterval;
    this.key = key;

    this.note = {};

    this.zStartPoint = -500;
    this.zEndPoint = 0;
    this.yStartPoint = 50;
    this.yEndPoint = -75;
    this.xPos = [-50, -25, 0, 25, 50];

    this.rotation = -Math.atan(
      (this.zEndPoint - this.zStartPoint) / (this.yStartPoint - this.yEndPoint)
    );

    this.spheres = [];
    this.cylinders = [];

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
      height = window.innerHeight * .9;
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

    let lights = [];
    lights[0] = new THREE.PointLight( 0xFFFFFF, 1, 10000);
    lights[0].position.set(0, 300, 0);
    lights[1] = new THREE.PointLight( 0xFFFFFF, 1, 2000);
    lights[1].position.set(0, 200, 100);
    lights.forEach(light => this.scene.add(light));

    let background = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
    this.scene.add( background );

    // LINES

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
    for (let i = 0; i < 5; i++) {
      let lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(new THREE.Vector3(
        this.xPos[i], this.yStartPoint, this.zStartPoint));
      lineGeometry.vertices.push(new THREE.Vector3(
        this.xPos[i], this.yEndPoint, this.zEndPoint));
      let line = new THREE.Line(lineGeometry, lineMaterial);
      this.scene.add(line);
    }

  }

  setNoteAttributes() {
    const note = {};
    this.note.vel = .75;

    this.note.yVel = this.note.vel * (this.yEndPoint - this.yStartPoint) / 100;
    this.note.zVel = this.note.vel * (this.zEndPoint - this.zStartPoint) / 100;

    this.note.radius = 7.5;

    this.note.colors = [];
    this.note.colors[0] = 0x4C7048; // Green
    this.note.colors[1] = 0xDA3A3C; // Red
    this.note.colors[2] = 0xffeb3b; // Yellow
    this.note.colors[3] = 0x3f51b5; // Blue
    this.note.colors[4] = 0xff5722; // Orange
    this.note.colors[5] = 0xffffff; // White - selected

    this.note.geometry = new THREE.SphereGeometry(this.note.radius);

    this.note.materials = [];
    this.note.colors.forEach( (color, idx) => {
    this.note.materials[idx] =
       new THREE.MeshPhongMaterial( { color: this.note.colors[idx] } );
    });

    const circleGeometry = new THREE.CircleGeometry(this.note.radius);
    const circles = [];
    for (let i = 0; i < 5; i ++) {
      circles[i] = new THREE.Mesh(circleGeometry, this.note.materials[i]);
    }

    circles.forEach((circle, idx) => {
      circle.position.set(
      this.xPos[idx],
      this.yEndPoint,
      this.zEndPoint
      );
      circle.rotateX(-.2);

      // LIGHT UP CIRCLE WHEN KEY IS PRESSED
      setInterval( () => {
        if (this.key.isDownVisually(this.key.pos[idx + 1])) {
           circle.material = this.note.materials[5];
         } else {
           circle.material = this.note.materials[idx];
         }
      }, 100);

      this.scene.add(circle);
    });
  }

  addMovingNotes() {
    let noteMaterial;
    songNotes.forEach((songNote, idx) => {

      noteMaterial = this.note.materials[songNote.pos - 1];

      this.spheres[idx] = new THREE.Mesh(this.note.geometry, noteMaterial);

      let time = this.noteInterval * (
        ((songNote.m - 1) * beatsPerMeasure) + songNote.t
      );

      if (songNote.m > 48) {
        time += 100;
      }

      if (songNote.hold) {


        let cylinderMaterial = this.note.materials[songNote.pos - 1];
        let cylinderGeometry = new THREE.CylinderGeometry(
          3.5, 3.5, (songNote.hold * this.note.vel * 20)
        );
        this.cylinders[idx] = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this.cylinders[idx].rotateX(this.rotation);
      }

      setTimeout( () => {
        if (this.cylinders[idx]) {
          let hold = songNote.hold;
            this.cylinders[idx].position.set(
            this.xPos[songNote.pos - 1],
            this.yStartPoint - 2 * hold * this.note.yVel,
            this.zStartPoint - 2 * hold * this.note.zVel
          );
          this.scene.add(this.cylinders[idx]);
        }
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
    this.cylinders.forEach(cylinder => {
      if (cylinder) {
        cylinder.position.y += this.note.yVel;
        cylinder.position.z += this.note.zVel;
        if (cylinder.position.z > this.zEndPoint) {
          this.scene.remove(cylinder);
        }
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
