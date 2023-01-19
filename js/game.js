import getVolumeByDistance from "./getVolumeByDistance.js";
import handleHandOnPlayer from "./handleHandOnPlayer.js";
import { GiantHand } from "./models/GiantHand.js";
import { Grass } from "./models/Grass.js";
import { Pacman } from "./models/Pacman.js";
import { Trash } from "./models/Trash.js";
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

  // Load plastic
  const trash = new Trash();
  trash.init(scene.scene, { x: -4, y: -4, z: 95 });

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
  pacmanYellow.init(
    scene.scene,
    // position pacman x y z
    { x: -10.5, y: -3.8, z: -50 },
    // colors pacman
    {
      headColor: 0xffff00,
      armColor: 0xdbc114,
      handColor: 0xdbc114,
    }
  );

  // ? Load green Pacman
  const pacmanGreen = new Pacman();
  pacmanGreen.init(
    scene.scene,
    { x: 1.3, y: -3.8, z: -50 },
    {
      headColor: 0x6ff801,
      armColor: 0x1e9b1c,
      handColor: 0x1e9b1c,
    }
  );

  // ? Load green Pacman
  const pacmanBlue = new Pacman();
  pacmanBlue.init(
    scene.scene,
    { x: -14.0, y: -3.8, z: -20 },
    {
      headColor: 0x054cf7,
      armColor: 0x3ba7ef,
      handColor: 0x3ba7ef,
    }
  );

  // ? Load red Pacman
  const pacmanRed = new Pacman();
  pacmanRed.init(
    scene.scene,
    { x: 4.6, y: -3.8, z: -20 },
    {
      headColor: 0xf11212,
      armColor: 0xbb4242,
      handColor: 0xbb4242,
    }
  );

  // ? Load Grass
  const grass = new Grass();
  grass.init(scene.scene);

  // ? Load Music
  const audio = new Audio("./assets/sounds/gameMusic.mp3");
  audio.volume = 0.03;

  // Pick up trash
  let currentTrash = trash;

  let isHoldingTrash = false;

  document.addEventListener("keydown", (e) => {
    if (!isHoldingTrash) {
      if (e.code === "Space") {
        if (
          player.body.position.x - currentTrash.trashItem.position.x < 1 &&
          player.body.position.z - currentTrash.trashItem.position.z < 1
        ) {
          player.body.add(currentTrash.trashItem);
          currentTrash.trashItem.position.set(2, 2, 2);
          isHoldingTrash = true;
        }
      }
    }
  });
  document.addEventListener("keydown", (e) => {
    if (
      (isHoldingTrash &&
        ((player.body.position.x - pacmanBlue.head1.position.x < 0.1 &&
          player.body.position.z - pacmanBlue.head1.position.z < 0.1) ||
          (player.body.position.x - pacmanRed.head1.position.x < 0.1 &&
            player.body.position.z - pacmanRed.head1.position.z < 0.1) ||
          (player.body.position.x - pacmanGreen.head1.position.x < 0.1 &&
            player.body.position.z - pacmanGreen.head1.position.z < 0.1))) ||
      (player.body.position.x - pacmanYellow.head1.position.x < 0.1 &&
        player.body.position.z - pacmanYellow.head1.position.z < 0.1)
    ) {
      if (e.code === "Enter") {
        player.body.remove(currentTrash.trashItem);
        isHoldingTrash = false;
        currentTrash = new Trash();
        currentTrash.init(scene.scene, { x: -4, y: -3.5, z: 95 });
      }
    }
  });

  function render() {
    scene.renderer.render(scene.scene, scene.camera);

    scene.rotateSun(15000); // speed of rotation
    player.update();

    giantHand.animate(getVolumeByDistance(player.body.position)); // volume of sound
    giantHand2.animate(getVolumeByDistance(player.body.position)); // volume of sound

    handleHandOnPlayer(player, giantHand, 55, 69);
    handleHandOnPlayer(player, giantHand2, 22, 34);

    pacmanYellow.animate();
    pacmanGreen.animate();
    pacmanBlue.animate();
    pacmanRed.animate();

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
