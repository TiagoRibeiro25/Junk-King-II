import { OrbitControls } from "../../libs/OrbitControls.js";
import * as THREE from "../../libs/three.module.js";
import { addShadow } from "../addShadow.js";

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  }

  init() {
    this.camera.position.z = 100;
    this.camera.position.y = 1;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x00ffff);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  enableCameraControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
  }

  addLight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 3, 1000);
    this.sunLight.position.set(0, 50, -100);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 175;
    this.sunLight.shadow.camera.left = -150;
    this.sunLight.shadow.camera.right = 150;
    this.sunLight.shadow.camera.top = -100;
    this.sunLight.shadow.camera.bottom = 100;
    this.sunLight.intensity = 3;
    this.scene.add(this.sunLight);
  }

  addFloor() {
    const texture = new THREE.TextureLoader().load("../../assets/grass.jpg");

    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(25, 150),
      new THREE.MeshStandardMaterial({ map: texture })
    );

    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.x = -5;
    this.floor.position.y = -5;
    this.floor.position.z = 20;
    this.scene.add(this.floor);

    addShadow(this.floor);
  }

  addSkyBox() {
    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load("../../assets/heather_ft.jpg");
    const texture_bk = new THREE.TextureLoader().load("../../assets/heather_bk.jpg");
    const texture_up = new THREE.TextureLoader().load("../../assets/heather_up.jpg");
    const texture_dn = new THREE.TextureLoader().load("../../assets/heather_dn.jpg");
    const texture_rt = new THREE.TextureLoader().load("../../assets/heather_rt.jpg");
    const texture_lf = new THREE.TextureLoader().load("../../assets/heather_lf.jpg");

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++) {
      materialArray[i].side = THREE.BackSide;
    }

    const skyBoxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    const skyBox = new THREE.Mesh(skyBoxGeo, materialArray);
    this.scene.add(skyBox);
  }

  /**
   * This function rotates the sun around the scene by changing the position of the sun light.
   * @param rotationSpeed - The speed at which the sun rotates around the scene.
   */
  rotateSun(rotationSpeed) {
    this.sunLight.position.x = 40 * Math.sin(Date.now() / rotationSpeed);
    this.sunLight.position.z = 40 * Math.cos(Date.now() / rotationSpeed);
  }

  render() {
    this.rotateSun();
  }
}
