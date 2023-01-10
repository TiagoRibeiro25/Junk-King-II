import * as THREE from "../libs/three.module.js";

// Shapes used in the app
export const shapes = {
  plane: new THREE.PlaneGeometry(40, 200),
  box: new THREE.BoxGeometry(2, 2, 2),
  sphere: new THREE.SphereGeometry(1, 32, 32),
  cone: new THREE.ConeGeometry(1, 2, 32),
  cylinder: new THREE.CylinderGeometry(0.5, 0.5, 2, 32),
  torus: new THREE.TorusGeometry(1, 0.4, 16, 100),
  tetrahedron: new THREE.TetrahedronGeometry(1, 0),
  octahedron: new THREE.OctahedronGeometry(1, 0),
  icosahedron: new THREE.IcosahedronGeometry(1, 0),
  dodecahedron: new THREE.DodecahedronGeometry(1, 0),
};

//TODO: Before going to production, remove unused shapes
