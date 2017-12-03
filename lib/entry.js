
document.addEventListener("DOMContentLoaded", () => {
  console.log("here");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  window.addEventListener( 'resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  // create the shape
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var geometry2 = new THREE.BoxGeometry( 51, 51, 51 );

  // create material, color, or image texture
  var material = new THREE.MeshPhongMaterial( {color: 0x00ff00, wireframe: false} );
  var material2 = new THREE.MeshPhongMaterial( {color: 0xFFFFFF, wireframe: false} );

  let ambientLight = new THREE.AmbientLight( 0xFFFFFF, .5);
  scene.add(ambientLight);

  let light1 = new THREE.PointLight(0xFFFFFF, 1, 100);
  light1.position.set(30, 30, 30);
  scene.add(light1);

  let light = new THREE.PointLight(0xFFFFFF, 5, 1000);
  light.position.set(-20, -20, 20);
  scene.add(light);

  // create cube
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  var outside = new THREE.Mesh( geometry2, material2 );
  scene.add( outside );
  var cube2 = new THREE.Mesh( geometry, material );
  cube2.position.set(1.1, 1, 1);
  scene.add( cube2 );
  var cube3 = new THREE.Mesh( geometry, material );
  cube3.position.set(0, 1, 1);
  scene.add( cube3 );

  camera.position.z = 3;

  // game logic
  const update = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
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

});


// document.addEventListener("DOMContentLoaded", () => {
//
//   const canvasEl = document.getElementById("canvas");
//   console.log(canvasEl);
//   canvasEl.width = "100%";
//   canvasEl.height = "100%";
//
//   const ctx = canvasEl.getContext("2d");
//   ctx.clearRect(0, 0, 500, 500);
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(10, 10, 400, 400);
//   console.log(document);
//   const rootEl = document.getElementById("root");
//   const newH1 = document.createElement("h1");
//   console.log(newH1);
//   const text = document.createTextNode("Hi");
//   newH1.appendChild(text);
//   rootEl.appendChild(newH1);
// });
