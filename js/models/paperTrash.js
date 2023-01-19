import * as THREE from "../../libs/three.module.js";

export class PaperTrash {
    constructor() {
      this.geometry = new THREE.DodecahedronGeometry(1);
      this.material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
      this.trashItem = new THREE.Mesh(this.geometry, this.material);
    }
  
    init(scene, position) {
      this.trashItem.position.x = position.x;
      this.trashItem.position.y = position.y;
      this.trashItem.position.z = position.z;
      scene.add(this.trashItem);
    }
}
