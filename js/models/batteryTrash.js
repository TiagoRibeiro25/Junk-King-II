import * as THREE from "../../libs/three.module.js";

export class BatteryTrash {
    constructor() {
      this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
      this.material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
      this.trashItem = new THREE.Mesh(this.geometry, this.material);
    }
  
    init(scene, position) {
      this.trashItem.position.x = position.x;
      this.trashItem.position.y = position.y;
      this.trashItem.position.z = position.z;
      this.trashItem.rotation.x = Math.PI
      scene.add(this.trashItem);
    }
}