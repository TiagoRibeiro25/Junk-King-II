import * as THREE from "../../libs/three.module.js";

export class BatteryTrash {
    constructor() {
      this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
      this.material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
      this.battery = new THREE.Mesh(this.geometry, this.material);
    }
  
    init(scene, position) {
      this.battery.position.x = position.x;
      this.battery.position.y = position.y;
      this.battery.position.z = position.z;
      this.battery.rotation.x = Math.PI
      scene.add(this.battery);
    }
}