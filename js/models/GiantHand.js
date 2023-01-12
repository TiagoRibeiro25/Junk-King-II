import * as THREE from "../../libs/three.module.js";
import { addShadow } from "../addShadow.js";

// Geometries
const armGeometry = new THREE.BoxGeometry(10, 15, 10);
const handGeometry = new THREE.BoxGeometry(15, 15, 10);
const fingerGeometry = new THREE.BoxGeometry(10, 4, 4);
const sphereGeometry = new THREE.SphereGeometry(7, 32, 32);
// Materials
const firstSkinMaterial = new THREE.MeshBasicMaterial({ color: 0xdbb39d });
const secondSkinMaterial = new THREE.MeshBasicMaterial({ color: 0xf9b591 });

export class GiantHand {
  constructor() {
    this.firstArmPivot = new THREE.Object3D();
    this.sphere = new THREE.Mesh(sphereGeometry, secondSkinMaterial);
    this.spherePivot = new THREE.Object3D();
    this.secondArmPivot = new THREE.Object3D();
    this.movement = 0.01;
    this.fingerPivots = [];
  }

  init(scene) {
    const firstArm = new THREE.Mesh(armGeometry, firstSkinMaterial);
    firstArm.position.x = -40;
    firstArm.position.y = 2;
    firstArm.position.z = 60;
    firstArm.rotation.z = 1.55;
    scene.add(firstArm);

    // add pivot to the end of the firstArm
    this.firstArmPivot.position.x = 0;
    this.firstArmPivot.position.y = -12;
    this.firstArmPivot.rotation.z = 1.55;
    firstArm.add(this.firstArmPivot);

    // sphere
    this.sphere.rotation.z = 3.17;
    this.firstArmPivot.add(this.sphere);

    // add pivot to the sphere to connect the second arm
    this.spherePivot.position.x = 0;
    this.spherePivot.position.y = 0;
    this.spherePivot.rotation.z = 0;
    this.sphere.add(this.spherePivot);

    const secondArm = new THREE.Mesh(armGeometry, firstSkinMaterial);
    secondArm.position.y = 10;
    this.spherePivot.add(secondArm);

    // add a pivot to the end of the arm
    this.secondArmPivot.position.y = 10;
    secondArm.add(this.secondArmPivot);

    // hand base (cube)
    const hand = new THREE.Mesh(handGeometry, firstSkinMaterial);
    hand.position.y = 5;
    this.secondArmPivot.add(hand);

    // hand fingers
    const fingerPivotPositions = [
      { x: -7, y: 0, z: 0 },
      { x: 0.9, y: 7, z: 0 },
      { x: -5, y: 7, z: 0 },
      { x: -10.8, y: 7, z: 0 },
    ];

    const fingerPositions = [
      { x: -5, y: 0, z: 0, rotation: 0 },
      { x: 5, y: 4, z: 0, rotation: 1.55 },
      { x: 5, y: 4, z: 0, rotation: 1.55 },
      { x: 5, y: 4, z: 0, rotation: 1.55 },
    ];

    // make the fingers
    for (let i = 0; i < 4; i++) {
      // Pivot
      const fingerPivot = new THREE.Object3D();
      fingerPivot.position.x = fingerPivotPositions[i].x;
      fingerPivot.position.y = fingerPivotPositions[i].y;
      fingerPivot.position.z = fingerPivotPositions[i].z;
      hand.add(fingerPivot);
      this.fingerPivots.push(fingerPivot);
      // Finger
      const finger = new THREE.Mesh(fingerGeometry, secondSkinMaterial);
      finger.position.x = fingerPositions[i].x;
      finger.position.y = fingerPositions[i].y;
      finger.position.z = fingerPositions[i].z;
      finger.rotation.z = fingerPositions[i].rotation;
      fingerPivot.add(finger);

      addShadow(finger);
    }

    addShadow(hand, firstArm, secondArm, this.sphere);
  }

  animateFingers() {
    this.fingerPivots.forEach((fingerPivot, index) => {
      if (index === 0) fingerPivot.rotation.y += this.movement * 1.3;
      else fingerPivot.rotation.x += this.movement * 1.3;
    });
  }

  animateArm() {
    if (this.sphere.rotation.z < 1.55 || this.sphere.rotation.z > 3.17) {
      this.movement = this.movement * -1;
    }
    this.sphere.rotation.z -= this.movement;
  }

  animate() {
    this.animateArm();
    this.animateFingers();
  }
}
