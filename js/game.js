import getVolumeByDistance from "./getVolumeByDistance.js";
import handleHandOnPlayer from "./handleHandOnPlayer.js";
import { GiantHand } from "./models/GiantHand.js";
import { Grass } from "./models/Grass.js";
import { Pacman } from "./models/Pacman.js";
import { Player } from "./models/Player.js";
import { Scene } from "./models/Scene.js";
import updateCamera from "./updateCamera.js";

export default function game() {
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
  giantHand.init(scene.scene, { x: -40, y: 2, z: 60 }, { x: 0, y: 0, z: 1.55 });

  // Second giant hand
  const giantHand2 = new GiantHand();
  giantHand2.init(
    scene.scene,
    { x: 30, y: 2, z: 30 },
    { x: 0, y: Math.PI, z: 1.55 }
  );

  // ? Load yellow Pacman
  const pacmanYellow = new Pacman();
  pacmanYellow.init(scene.scene);

  // ? Load Grass
  const grass = new Grass();
  grass.init(scene.scene);

  // ? Load Music
  const audio = new Audio("./assets/sounds/gameMusic.mp3");
  audio.volume = 0.03;

  function render() {
    scene.renderer.render(scene.scene, scene.camera);

    scene.rotateSun(5000); // speed of rotation
    player.update();

    giantHand.animate(getVolumeByDistance(player.body.position)); // volume of sound
    giantHand2.animate(getVolumeByDistance(player.body.position)); // volume of sound

    handleHandOnPlayer(player, giantHand, 55, 69);
    handleHandOnPlayer(player, giantHand2, 20, 35);

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
