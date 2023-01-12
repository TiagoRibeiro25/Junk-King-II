import { GiantHand } from "./models/GiantHand.js";
import { Player } from "./models/Player.js";
import { Scene } from "./models/Scene.js";

function updateCamera() {
  scene.camera.position.x = player.body.position.x;
  scene.camera.position.z = player.body.position.z + 10;
  scene.camera.position.y = player.body.position.y + 2.5;
}

// Load scene
const scene = new Scene();
scene.init();
scene.addLight();
scene.addFloor();
scene.render();
// scene.enableCameraControls();

// Load player
const player = new Player();
player.init(scene.scene);
player.enableKeyboard(document);
scene.camera.lookAt(player.body.position);

// Load Giant Hand
const giantHand = new GiantHand();
giantHand.init(scene.scene);

function render() {
  scene.renderer.render(scene.scene, scene.camera);

  scene.rotateSun(5000); // speed of rotation
  player.update();
  giantHand.animate();
  updateCamera();

  requestAnimationFrame(render);
}

window.addEventListener("resize", () => {
  scene.camera.aspect = window.innerWidth / window.innerHeight;
  scene.camera.updateProjectionMatrix();
  scene.renderer.setSize(window.innerWidth, window.innerHeight);
});

window.onload = () => render();
