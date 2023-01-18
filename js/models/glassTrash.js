import * as THREE from "../../libs/three.module.js";

export class GlassTrash {
    constructor() {
      this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
      this.material = new THREE.MeshBasicMaterial({ color: 0x90EE90 });
      this.glass = new THREE.Mesh(this.geometry, this.material);
    }
  
    init(scene, position) {
      this.glass.position.x = position.x;
      this.glass.position.y = position.y;
      this.glass.position.z = position.z;
      this.glass.rotation.x = Math.PI
      scene.add(this.glass);
    }
}
