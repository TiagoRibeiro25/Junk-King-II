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
  plastic.init(scene.scene, {x: -14, y: 0, z: 95});

  // Load battery
  const battery = new BatteryTrash();
  battery.init(scene.scene, {x: -8, y: 0, z: 95})

  // Load Paper
  const paper = new PaperTrash();
  paper.init(scene.scene,  {x: -2, y: 0, z: 95})

  // Load glass
  const glass = new GlassTrash();
  glass.init(scene.scene, {x: 4, y: 0, z: 95})

 
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
  pacmanYellow.init(scene.scene,
                    -10.5, -3.8, -50,
                    0.4, 0.4, 0.4,
                    0xffff00, 0xdbc114, 0xdbc114, 0xffff00
            );

  // ? Load green Pacman
  const pacmanGreen = new Pacman();
  pacmanGreen.init(scene.scene,
                    1.30, -3.8, -50,
                    0.4, 0.4, 0.4,
                   0x6FF801, 0x1E9B1C, 0x1E9B1C, 0x6FF801
            );


            // TODO = ROTATE green pacman
  // ? Load green Pacman
  const pacmanBlue = new Pacman();
  pacmanBlue.init(scene.scene,
                    // position pacman x y z
                    -14.00, -3.8, -20,
                    // scale pacman x y z
                    0.4, 0.4, 0.4,
                   0x054CF7, 0x3BA7EF, 0x3BA7EF, 0x054CF7,
                    // rotate y axis pacman
                    // 180

                   );


            // TODO = ROTATE red pacman
  // ? Load red Pacman
  const pacmanRed = new Pacman();
  pacmanRed.init(scene.scene,
                    4.60, -3.8, -20,
                    0.4, 0.4, 0.4,
                   0xF11212, 0xBB4242, 0xBB4242, 0xF11212
            );

    
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
