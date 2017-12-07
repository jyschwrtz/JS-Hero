import * as THREE from '../vendor/three';
import OrbitControls from '../vendor/OrbitControls.js';

class ViewControls {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;

    this.displayEl = document.getElementsByClassName('game-display')[0];
    this.lookAroundEl = document.getElementsByClassName('look-around')[0];
    this.lookAroundEl.onclick = this.toggleLookAround.bind(this);
    this.controls =
      new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = false;
  }

  addControls() {
    this.controls.enabled = true;
    this.lookAroundEl.innerHTML = "Fix Camera View";
  }

  removeControls() {
    this.controls.enabled = false;
    this.lookAroundEl.innerHTML = "Look Around";
  }

  lookAround() {
    this.addControls();
    this.displayEl.className = "game-display hidden";
  }

  fixView() {
    this.removeControls();
    this.displayEl.className = "game-display";
  }

  toggleLookAround() {
    return this.controls.enabled ? this.fixView() : this.lookAround();
  }

}

export default ViewControls;
