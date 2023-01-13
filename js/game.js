import { getVolumeByDistance } from "./getVolumeByDistance.js";
import { GiantHand } from "./models/GiantHand.js";
import { Grass } from "./models/Grass.js";
import { Player } from "./models/Player.js";
import { Scene } from "./models/Scene.js";
import { updateCamera } from "./updateCamera.js";

export function game() {
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

  // ? Load Music
  const audio = new Audio("./assets/sounds/gameMusic.mp3");
  audio.volume = 0.03;

  function render() {
    scene.renderer.render(scene.scene, scene.camera);

    scene.rotateSun(3000); // speed of rotation
    player.update();
    giantHand.animate(getVolumeByDistance(player.body.position)); // volume of sound
    grass.animate(scene.renderer, scene.scene, scene.camera);
    updateCamera(scene, player);

    if (audio.paused) audio.play();

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", () => {
    scene.camera.aspect = window.innerWidth / window.innerHeight;
    scene.camera.updateProjectionMatrix();
    scene.renderer.setSize(window.innerWidth, window.innerHeight);
  });

  render();
}
