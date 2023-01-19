import * as THREE from "../../libs/three.module.js";

const trashTexture = new THREE.TextureLoader().load(
  "../../assets/trash.jpg"
);

export class Trash {
    constructor() {
      this.geometry = new THREE.CubeGeometry(1, 1, 1);
      this.material = new THREE.MeshStandardMaterial({ map: trashTexture });
      this.trashItem = new THREE.Mesh(this.geometry, this.material);
    }
  
    init(scene, position) {
      this.trashItem.position.x = position.x;
      this.trashItem.position.y = position.y;
      this.trashItem.position.z = position.z;
      scene.add(this.trashItem);
    }
  }