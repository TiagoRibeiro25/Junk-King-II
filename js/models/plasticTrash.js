import * as THREE from "../../libs/three.module.js";

export class PlasticTrash {
    constructor() {
      this.geometry = new THREE.CylinderGeometry(1, 1, 4, 8);
      this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      this.plastic = new THREE.Mesh(this.geometry, this.material);
    }
  
    init(scene, position) {
      this.plastic.position.x = position.x;
      this.plastic.position.y = position.y;
      this.plastic.position.z = position.z;
      scene.add(this.plastic);
    }
  }