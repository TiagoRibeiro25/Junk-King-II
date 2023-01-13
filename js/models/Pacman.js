import * as THREE from "../../libs/three.module.js";
import addShadow from "../addShadow.js";

// GEOMETRIES
const headGeometry = new THREE.SphereGeometry( 8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const headGeometry2 = new THREE.SphereGeometry( 8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const brainGeometry = new THREE.SphereGeometry(7.91, 32, 32, 0, Math.PI, 0, Math.PI);
const mouthGeometry = new THREE.SphereGeometry(8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const EyeGeometry = new THREE.SphereGeometry(1, 12, 12);
const ArmGeometry = new THREE.BoxGeometry(6, 2.4, 2.8);
const ForeArmGeometry = new THREE.CylinderGeometry(0.53, 0.87, 6, 44, 25, 0, 6.28);
const HandGeometry = new THREE.BoxGeometry(2, 1.95, 1);
const Finger1HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const Finger2HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const Finger3HandGeometry = new THREE.BoxGeometry( 0.5, 0.95, 2.35);
const ThumbFingerHandGeometry = new THREE.BoxGeometry( 0.55, 0.5, 1.75);
const Finger1ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const Finger2ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const Finger3ConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);
const ThumbFingerConnectionHandGeometry = new THREE.SphereGeometry( 0.2, 32, 32);

export class yellowPacman {
    
init(scene){
    
}
}
