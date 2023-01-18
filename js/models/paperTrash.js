import * as THREE from "../../libs/three.module.js";

export class PaperTrash {
    constructor() {
      this.geometry = new THREE.DodecahedronGeometry(1.5);
      this.material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
      this.paper = new THREE.Mesh(this.geometry, this.material);
    }
  
    init(scene, position) {
      this.paper.position.x = position.x;
      this.paper.position.y = position.y;
      this.paper.position.z = position.z;
      scene.add(this.paper);
    }
}
