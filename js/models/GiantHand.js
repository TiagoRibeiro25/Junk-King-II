import * as THREE from "../../libs/three.module.js";
import addShadow from "../addShadow.js";
const handSound = new Audio("../../assets/sounds/handV2.mp3");

// Geometries
const armGeometry = new THREE.BoxGeometry(10, 15, 10);
const handGeometry = new THREE.BoxGeometry(15, 15, 10);
const fingerGeometry = new THREE.BoxGeometry(10, 4, 4);
const sphereGeometry = new THREE.SphereGeometry(7, 32, 32);

// Textures
const firstSkinTexture = new THREE.TextureLoader().load(
  "../../assets/metal1.jpg"
);
const secondSkinTexture = new THREE.TextureLoader().load(
  "../../assets/metal2.jpg"
);

// Positions
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

let handStop = false;

export class GiantHand {
  constructor() {
    this.firstArmPivot = new THREE.Object3D();
    this.sphere = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshStandardMaterial({ map: secondSkinTexture })
    );
    this.spherePivot = new THREE.Object3D();
    this.secondArmPivot = new THREE.Object3D();
    this.movement = 0.01;
    this.fingerPivots = [];
  }

  init(scene, handPositions, handRotations) {
    const firstArm = new THREE.Mesh(
      armGeometry,
      new THREE.MeshStandardMaterial({ map: firstSkinTexture })
    );
    firstArm.position.x = handPositions.x;
    firstArm.position.y = handPositions.y;
    firstArm.position.z = handPositions.z;

    firstArm.rotation.x = handRotations.x;
    firstArm.rotation.y = handRotations.y;
    firstArm.rotation.z = handRotations.z;
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

    const secondArm = new THREE.Mesh(
      armGeometry,
      new THREE.MeshStandardMaterial({ map: firstSkinTexture })
    );
    secondArm.position.y = 10;
    this.spherePivot.add(secondArm);

    // add a pivot to the end of the arm
    this.secondArmPivot.position.y = 10;
    secondArm.add(this.secondArmPivot);

    // hand base (cube)
    const hand = new THREE.Mesh(
      handGeometry,
      new THREE.MeshStandardMaterial({ map: firstSkinTexture })
    );
    hand.position.y = 5;
    this.secondArmPivot.add(hand);

    // hand fingers
    for (let i = 0; i < 4; i++) {
      const fingerPivot = new THREE.Object3D();
      fingerPivot.position.x = fingerPivotPositions[i].x;
      fingerPivot.position.y = fingerPivotPositions[i].y;
      fingerPivot.position.z = fingerPivotPositions[i].z;
      hand.add(fingerPivot);
      this.fingerPivots.push(fingerPivot);

      const finger = new THREE.Mesh(
        fingerGeometry,
        new THREE.MeshStandardMaterial({ map: secondSkinTexture })
      );
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
      // Thumb Finger
      if (index === 0) fingerPivot.rotation.y += this.movement * 1.3;
      // Other fingers
      else fingerPivot.rotation.x += this.movement * 1.3;
    });
  }

  animateArm(handVolume) {
    if (this.sphere.rotation.z < 1.55 || this.sphere.rotation.z > 3.17) {
      this.movement = this.movement * -1;

      if (this.movement === 0.01) handSound.play();
    }
    this.sphere.rotation.z -= this.movement;

    handSound.volume = handVolume;
  }

  toggleHand() {
    handStop = !handStop;
  }

  resetFingers() {
    this.fingerPivots.forEach((fingerPivot, index) => {
      // Thumb Finger
      if (index === 0) fingerPivot.rotation.y = 0;
      // Other fingers
      else fingerPivot.rotation.x = 0;
    });
  }

  animate(handVolume) {
    if (handStop) return;
    this.animateFingers();
    this.animateArm(handVolume);
  }
}
