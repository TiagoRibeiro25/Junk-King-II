import { GiantHand } from "./models/GiantHand.js";
import { Grass } from "./models/Grass.js";
import { Player } from "./models/Player.js";
import { Scene } from "./models/Scene.js";
import { updateCamera } from "./updateCamera.js";

function getVolume() {
  let result = 55 - player.body.position.z;
  if (result < 0) result *= -1;
  result = 0.04 - result / 5000;
  return result;
}

// ? Load scene
const scene = new Scene();
scene.init();
scene.addLight();
scene.addFloor();
scene.render();
scene.addSkyBox();
// scene.enableCameraControls();

// ? Load player
const player = new Player();
player.init(scene.scene);
player.enableKeyboard(document);
scene.camera.lookAt(player.body.position);

// ? Load Giant Hand
const giantHand = new GiantHand();
giantHand.init(scene.scene);

// ? Load Grass
const grass = new Grass();
grass.init(scene.scene);

function render() {
  scene.renderer.render(scene.scene, scene.camera);

  scene.rotateSun(5000); // speed of rotation
  player.update();
  giantHand.animate(getVolume());
  grass.animate(scene.renderer, scene.scene, scene.camera);
  updateCamera(scene, player);

  requestAnimationFrame(render);
}

window.addEventListener("resize", () => {
  scene.camera.aspect = window.innerWidth / window.innerHeight;
  scene.camera.updateProjectionMatrix();
  scene.renderer.setSize(window.innerWidth, window.innerHeight);
});

window.onload = () => render();
