import * as THREE from "../../libs/three.module.js";
import { addShadow } from "../addShadow.js";

const footStepSound = new Audio("./assets/sounds/footsteps.mp3");
footStepSound.volume = 0.2;

const lowerThreshold = -Math.PI / 1.25;
const upperThreshold = -Math.PI / 4;

const lowerElbowThreshold = Math.PI * 2;
const upperElbowThreshold = Math.PI * 2.5;

const lowerLegThreshold = -Math.PI / 1.25;
const upperLegThreshold = -Math.PI / 4;

const lowerKneeThreshold = Math.PI * 1.5;
const upperKneeThreshold = Math.PI * 2;

const lowerCrownThreshold = -0.2;
const upperCrownThreshold = 0.1;

let speed = 0.02;
let direction = 1;
let crownSpeed = 0.01;
let crownDirection = 1;
let elbowSpeed = 0.03;
let elbowDirection = 1;
let legSpeed = 0.03;
let legDirection = 1;
let kneeSpeed = 0.02;
let kneeDirection = 1;
let movementSpeed = 0.07;

let isRightArrowPressed = false;
let isLeftArrowPressed = false;
let isUpArrowPressed = false;
let isDownArrowPressed = false;

let geometry = new THREE.BoxGeometry(1.5, 0.5, 0.5);
let material = new THREE.MeshNormalMaterial();

export class Player {
  constructor() {
    this.body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );

    this.head = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 1.2, 15),
      new THREE.MeshBasicMaterial({ color: 0xf00f00 })
    );

    this.pivotCrown = new THREE.Object3D();

    this.pivotShoulderRight = new THREE.Object3D();
    this.pivotShoulderLeft = new THREE.Object3D();
    this.pivotElbowRight = new THREE.Object3D();
    this.pivotElbowLeft = new THREE.Object3D();

    this.pivotLegRight = new THREE.Object3D();
    this.pivotLegLeft = new THREE.Object3D();
    this.pivotKneeRight = new THREE.Object3D();
    this.pivotKneeLeft = new THREE.Object3D();
  }

  createBody(scene) {
    this.body.position.set(0, 0, 90);

    scene.add(this.body);

    const body1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2, 2.2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    body1.position.set(0, -1, 0);
    this.body.add(body1);

    addShadow(this.body, body1);
  }

  createHead() {
    this.head.position.set(0, 1.6, 0);

    this.body.add(this.head);

    const eyesZ = [0.3, -0.3];

    for (let i = 0; i < 2; i++) {
      const eye = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      eye.position.set(0.7, 0.2, eyesZ[i]);
      this.head.add(eye);
    }

    addShadow(this.head);
  }

  createCrown() {
    this.pivotCrown.position.set(0, 0.6, 0);
    this.pivotCrown.rotation.set(0, 0, 0);
    this.head.add(this.pivotCrown);

    // Crown
    const crown = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.1, 3, 5),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    crown.rotation.set(-Math.PI / 2, 0, 0);
    crown.position.set(0, 0.1, 0);
    this.pivotCrown.add(crown);

    // Pyramids
    const positions = [
      { x: 0.2, y: -0.7, z: 0.2 },
      { x: 0.2, y: 0.7, z: 0.2 },
      { x: 0.7, y: 0, z: 0.2 },
      { x: -0.6, y: -0.4, z: 0.2 },
      { x: -0.6, y: 0.4, z: 0.2 },
    ];
    for (const position of positions) {
      const pyramid = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.3, 3),
        new THREE.MeshStandardMaterial({ color: 0xffff00 })
      );
      pyramid.rotation.set(Math.PI / 2, 0, 0);
      pyramid.position.set(position.x, position.y, position.z);
      crown.add(pyramid);
    }

    addShadow(crown, ...crown.children.filter((child) => child.type === "Mesh"));
  }

  createShoulders() {
    //create the right arm
    this.pivotShoulderRight.position.set(-0.25, 0.75, 2);
    this.pivotShoulderRight.rotation.set(0, 0, -Math.PI / 2);
    this.body.add(this.pivotShoulderRight);

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0.75, 0.25, -0.25);
    this.pivotShoulderRight.add(cube);

    this.pivotElbowRight.position.set(0.75, 0, 0);
    this.pivotElbowRight.rotation.set(0, 0, Math.PI * 2);
    cube.add(this.pivotElbowRight);

    const cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(0.75, 0, 0);
    this.pivotElbowRight.add(cube2);

    //create the left arm
    this.pivotShoulderLeft.position.set(-0.25, 0.75, -1.5);
    this.pivotShoulderLeft.rotation.set(0, 0, -Math.PI / 2);
    this.body.add(this.pivotShoulderLeft);

    const cube3 = new THREE.Mesh(geometry, material);
    cube3.position.set(0.75, 0.25, -0.25);
    this.pivotShoulderLeft.add(cube3);

    this.pivotElbowLeft.position.set(0.75, 0, 0);
    this.pivotElbowLeft.rotation.set(0, 0, Math.PI * 2);
    cube3.add(this.pivotElbowLeft);

    const cube4 = new THREE.Mesh(geometry, material);
    cube4.position.set(0.75, 0, 0);
    this.pivotElbowLeft.add(cube4);

    addShadow(cube, cube2, cube3, cube4);
  }

  createLegs() {
    // ? Right Leg
    this.pivotLegRight.position.set(0, -2, 0.75);
    this.pivotLegRight.rotation.set(0, 0, -Math.PI / 2);
    this.body.add(this.pivotLegRight);

    const cube5 = new THREE.Mesh(geometry, material);
    cube5.position.set(0.75, 0, 0);
    this.pivotLegRight.add(cube5);

    this.pivotKneeRight.position.set(0.75, 0, 0);
    this.pivotKneeRight.rotation.set(0, 0, Math.PI * 2);
    cube5.add(this.pivotKneeRight);

    const cube6 = new THREE.Mesh(geometry, material);
    cube6.position.set(0.75, 0, 0);
    this.pivotKneeRight.add(cube6);

    // ? Left Leg
    this.pivotLegLeft.position.set(0, -2, -0.75);
    this.pivotLegLeft.rotation.set(0, 0, -Math.PI / 2);
    this.body.add(this.pivotLegLeft);

    const cube7 = new THREE.Mesh(geometry, material);
    cube7.position.set(0.75, 0, 0);
    this.pivotLegLeft.add(cube7);

    this.pivotKneeLeft.position.set(0.75, 0, 0);
    this.pivotKneeLeft.rotation.set(0, 0, -Math.PI * 2);
    cube7.add(this.pivotKneeLeft);

    const cube8 = new THREE.Mesh(geometry, material);
    cube8.position.set(0.75, 0, 0);
    this.pivotKneeLeft.add(cube8);

    addShadow(cube5, cube6, cube7, cube8);
  }

  enableKeyboard(document) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") isUpArrowPressed = true;
      if (e.key === "ArrowDown") isDownArrowPressed = true;
      if (e.key === "ArrowLeft") isLeftArrowPressed = true;
      if (e.key === "ArrowRight") isRightArrowPressed = true;
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") isUpArrowPressed = false;
      if (e.key === "ArrowDown") isDownArrowPressed = false;
      if (e.key === "ArrowLeft") isLeftArrowPressed = false;
      if (e.key === "ArrowRight") isRightArrowPressed = false;
    });
  }

  run() {
    this.pivotCrown.rotation.x += crownDirection * crownSpeed;

    if (
      this.pivotCrown.rotation.x >= upperCrownThreshold ||
      this.pivotCrown.rotation.x <= lowerCrownThreshold
    ) {
      crownDirection *= -1;
      crownSpeed = 0.01;
    }

    this.pivotShoulderRight.rotation.z -= direction * speed;
    this.pivotShoulderLeft.rotation.z += direction * speed;

    if (
      this.pivotShoulderRight.rotation.z >= upperThreshold ||
      this.pivotShoulderRight.rotation.z <= lowerThreshold
    ) {
      direction *= -1;
      speed = 0.05;
    }

    this.pivotElbowRight.rotation.z += elbowDirection * elbowSpeed;
    this.pivotElbowLeft.rotation.z += elbowDirection * elbowSpeed;

    if (
      this.pivotElbowRight.rotation.z >= upperElbowThreshold ||
      this.pivotElbowRight.rotation.z <= lowerElbowThreshold
    ) {
      elbowDirection *= -1;
      elbowSpeed = 0.05;
    }

    this.pivotLegRight.rotation.z -= legDirection * legSpeed;
    this.pivotLegLeft.rotation.z += legDirection * legSpeed;

    if (
      this.pivotLegRight.rotation.z >= upperLegThreshold ||
      this.pivotLegRight.rotation.z <= lowerLegThreshold
    ) {
      legDirection *= -1;
      legSpeed = 0.05;
    }

    this.pivotKneeRight.rotation.z -= kneeDirection * kneeSpeed;
    this.pivotKneeLeft.rotation.z -= kneeDirection * kneeSpeed;

    if (
      this.pivotKneeRight.rotation.z >= upperKneeThreshold ||
      this.pivotKneeRight.rotation.z <= lowerKneeThreshold
    ) {
      kneeDirection *= -1;
      kneeSpeed = 0.05;
    }
  }

  stopRunning() {
    this.pivotShoulderRight.rotation.set(0, 0, -Math.PI / 2);
    this.pivotShoulderLeft.rotation.set(0, 0, -Math.PI / 2);

    this.pivotElbowRight.rotation.set(0, 0, Math.PI * 2);
    this.pivotElbowLeft.rotation.set(0, 0, Math.PI * 2);

    this.pivotLegRight.rotation.set(0, 0, -Math.PI / 2);
    this.pivotLegLeft.rotation.set(0, 0, -Math.PI / 2);

    this.pivotKneeRight.rotation.set(0, 0, Math.PI * 2);
    this.pivotKneeLeft.rotation.set(0, 0, Math.PI * 2);

    this.pivotCrown.rotation.set(0, 0, 0);

    this.run();
  }

  init(scene) {
    this.createBody(scene);
    this.createCrown();
    this.createHead();
    this.createShoulders();
    this.createLegs();
  }

  update() {
    if (
      !isRightArrowPressed &&
      !isLeftArrowPressed &&
      !isUpArrowPressed &&
      !isDownArrowPressed
    ) {
      this.stopRunning();
      footStepSound.pause();
      return;
    }
    if (isRightArrowPressed) {
      this.body.position.x += this.body.position.x < 6 ? movementSpeed : 0;
      this.body.rotation.y = 0;
    }
    if (isLeftArrowPressed) {
      this.body.position.x -= this.body.position.x > -16 ? movementSpeed : 0;
      this.body.rotation.y = Math.PI;
    }
    if (isUpArrowPressed) {
      this.body.position.z -= this.body.position.z > -54 ? movementSpeed : 0;
      this.body.rotation.y = Math.PI / 2;
    }
    if (isDownArrowPressed) {
      this.body.position.z += this.body.position.z < 94 ? movementSpeed : 0;
      this.body.rotation.y = -Math.PI / 2;
    }

    footStepSound.play();
    this.run();
  }
}
