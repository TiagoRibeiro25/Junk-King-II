import getVolumeByDistance from "./getVolumeByDistance.js";
import handleHandOnPlayer from "./handleHandOnPlayer.js";
import { GiantHand } from "./models/GiantHand.js";
import { Grass } from "./models/Grass.js";
import { Pacman } from "./models/Pacman.js";
import { PlasticTrash } from "./models/plasticTrash.js";
import { PaperTrash } from "./models/paperTrash.js";
import { GlassTrash } from "./models/glassTrash.js";
import { BatteryTrash } from "./models/batteryTrash.js";
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
  const plastic = new PlasticTrash();
  plastic.init(scene.scene, { x: -14, y: -3.5, z: 95 });

  // Load battery
  const battery = new BatteryTrash();
  battery.init(scene.scene, { x: -8, y: -3.5, z: 95 });

  // Load Paper
  const paper = new PaperTrash();
  paper.init(scene.scene, { x: -2, y: -3.5, z: 95 });

  // Load glass
  const glass = new GlassTrash();
  glass.init(scene.scene, { x: 4, y: -3.5, z: 95 });

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
    -10.5, // x
    -3.8, // y
    -50, // z
    // scale pacman x y z
    0.4, // x
    0.4, // y
    0.4, // z
    // colors pacman
    0xffff00, //color head1
    0xdbc114, //color arm
    0xdbc114, //color hand
    0xffff00 //color head2
  );

  // ? Load green Pacman
  const pacmanGreen = new Pacman();
  pacmanGreen.init(
    scene.scene,
    // position pacman x y z
    1.3, // x
    -3.8, // y
    -50, // z
    // scale pacman x y z
    0.4, // x
    0.4, // y
    0.4, // z
    // colors pacman
    0x6ff801, //color head1
    0x1e9b1c, //color arm
    0x1e9b1c, //color hand
    0x6ff801 //color head2
  );

  // TODO = ROTATE green pacman
  // ? Load green Pacman
  const pacmanBlue = new Pacman();
  pacmanBlue.init(
    scene.scene,
    // position pacman x y z
    -14.0, //x
    -3.8, // y
    -20, // z
    // scale pacman x y z
    0.4, //x
    0.4, //y
    0.4, //z
    // colors pacman
    0x054cf7, //color head1
    0x3ba7ef, //color arm
    0x3ba7ef, //color hand
    0x054cf7 //color head2
  );

  // TODO = ROTATE red pacman
  // ? Load red Pacman
  const pacmanRed = new Pacman();
  pacmanRed.init(
    scene.scene,
    // position pacman x y z
    4.6, //x
    -3.8, //y
    -20, //z
    // scale pacman x y z
    0.4, //x
    0.4, //y
    0.4, //z
    // colors pacman
    0xf11212, //color head1
    0xbb4242, //color arm
    0xbb4242, //color hand
    0xf11212 //color head2
  );

  // ? Load Grass
  const grass = new Grass();
  grass.init(scene.scene);

  // ? Load Music
  const audio = new Audio("./assets/sounds/gameMusic.mp3");
  audio.volume = 0.03;

  // Pick up trash
  const trash = [plastic, paper, battery, glass]

  
  for (let i = 0; i < trash.length; i++) {
    document.addEventListener("keydown", (e) => {
      if(e.code === "Space"){
        if((player.body.position.x - trash[i].trashItem.position.x) < 0.5 && (player.body.position.z - trash[i].trashItem.position.z) < 0.5){
          player.body.add(trash[i].trashItem)
        }
      }
    })
  }

  

  function render() {
    scene.renderer.render(scene.scene, scene.camera);

    scene.rotateSun(5000); // speed of rotation
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
