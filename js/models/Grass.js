import * as THREE from "../../libs/three.module.js";
import addShadow from "../addShadow.js";
import { fragmentShader, vertexShader } from "./Grass/shaderVariables.js";

const uniforms = {
  time: {
    value: 0,
  },
};

// MATERIAL
const leavesMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
  side: THREE.DoubleSide,
});

// MESH
const instanceNumber = 30000;
const dummy = new THREE.Object3D();

const geometry = new THREE.PlaneGeometry(0.1, 1, 4);
geometry.translate(0, 0.5, 0); // move grass blade geometry lowest point at 0.

const instancedMesh = new THREE.InstancedMesh(
  geometry,
  leavesMaterial,
  instanceNumber
);

export class Grass {
  constructor() {
    this.clock = new THREE.Clock();
  }

  init(scene) {
    scene.add(instancedMesh);
    for (let i = 0; i < instanceNumber; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 25,
        -5,
        (Math.random() - 0.5) * 150
      );

      dummy.scale.setScalar(0.5 + Math.random() * 0.5);

      dummy.rotation.y = Math.random() * Math.PI;

      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    // grass position
    instancedMesh.position.z = 20;
    instancedMesh.position.x = -5;

    addShadow(instancedMesh);
  }

  animate() {
    // time variable -> vertex shader for wind displacement.
    leavesMaterial.uniforms.time.value = this.clock.getElapsedTime();
    leavesMaterial.uniformsNeedUpdate = true;
  }
}
