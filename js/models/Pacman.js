import * as THREE from "../../libs/three.module.js";
import addShadow from "../addShadow.js";

//----------------------- PACMAN GEOMETRIES AND MATERIALS------------------------------
// HEAD
const headGeometry = new THREE.SphereGeometry(
  8,
  32,
  32,
  0,
  Math.PI * 2,
  0,
  Math.PI / 2
);
const headGeometry2 = new THREE.SphereGeometry(
  8,
  32,
  32,
  0,
  Math.PI * 2,
  0,
  Math.PI / 2
);

// BRAIN
const brainGeometry = new THREE.SphereGeometry(
  7.91,
  32,
  32,
  0,
  Math.PI,
  0,
  Math.PI
);
const brainMaterial = new THREE.MeshBasicMaterial({ color: 0x0000 });

// MOUTH
const mouthGeometry = new THREE.SphereGeometry(
  8,
  32,
  32,
  0,
  Math.PI * 2,
  0,
  Math.PI / 2
);

// EYES
const EyeGeometry = new THREE.SphereGeometry(1, 12, 12);
const EyeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000 });

// ARMS
const ArmGeometry = new THREE.BoxGeometry(6, 2.4, 2.8);
const ShoulderSphereGeometry = new THREE.SphereGeometry(1, 12, 12);

// FOREARMS
const ForeArmGeometry = new THREE.CylinderGeometry(
  0.53,
  0.87,
  6,
  44,
  25,
  0,
  6.28
);
const ForeArmMaterial = new THREE.MeshBasicMaterial({ color: 0xaea758 });

// HANDS
const HandGeometry = new THREE.BoxGeometry(2, 1.95, 1);

// FINGERS AND THERE CONNECTIONS
const Finger1HandGeometry = new THREE.BoxGeometry(0.5, 0.95, 2.35);
const Finger2HandGeometry = new THREE.BoxGeometry(0.5, 0.95, 2.35);
const Finger3HandGeometry = new THREE.BoxGeometry(0.5, 0.95, 2.35);
const ThumbFingerHandGeometry = new THREE.BoxGeometry(0.55, 0.5, 1.75);
const Finger1ConnectionHandGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const Finger2ConnectionHandGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const Finger3ConnectionHandGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const ThumbFingerConnectionHandGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const Finger1HandMaterial = new THREE.MeshBasicMaterial({ color: 0xaea758 });
const Finger2HandMaterial = new THREE.MeshBasicMaterial({ color: 0xaea758 });
const Finger3HandMaterial = new THREE.MeshBasicMaterial({ color: 0xaea758 });
const ThumbFingerHandMaterial = new THREE.MeshBasicMaterial({
  color: 0xaea758,
});
const Finger1ConnectionHandMaterial = new THREE.MeshBasicMaterial({
  color: 0xaea758,
});
const Finger2ConnectionHandMaterial = new THREE.MeshBasicMaterial({
  color: 0xaea758,
});
const Finger3ConnectionHandMaterial = new THREE.MeshBasicMaterial({
  color: 0xaea758,
});
const ThumbFingerConnectionHandMaterial = new THREE.MeshBasicMaterial({
  color: 0xaea758,
});

const ShoulderSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

export class Pacman {
  constructor() {
    // -------------------------PACMAN Pivots-------------------------
    // add pivot on the begin of the left arm/shoulder
    this.leftShoulderPivot = new THREE.Object3D();
    // add pivot to connect the sphere with the left forearm
    this.leftForeArmPivot = new THREE.Object3D();
    //  add pivot to the end of the left forearm
    this.secondLeftForeArmPivot = new THREE.Object3D();
    // pivot for the first finger left hand connection
    this.leftFinger1ConnectionPivot = new THREE.Object3D();
    // pivot for the second finger left hand connection
    this.leftFinger2ConnectionPivot = new THREE.Object3D();
    // pivot for the third finger left hand connection
    this.leftFinger3ConnectionPivot = new THREE.Object3D();
    // pivot for the thumb finger left hand connection
    this.leftThumbFingerConnectionPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the first finger left hand
    this.connectFirstLeftFingerPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the second finger left hand
    this.connectSecondLeftFingerPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the third finger left hand
    this.connectThirdLeftFingerPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the thumb finger left hand
    this.connectLeftThumbFingerPivot = new THREE.Object3D();
    // add pivot on the begin of the right arm/shoulder
    this.rightShoulderPivot = new THREE.Object3D();
    // add pivot to connect the sphere with the right forearm
    this.rightForeArmPivot = new THREE.Object3D();
    //  add pivot to the end of the right forearm
    this.secondRightForeArmPivot = new THREE.Object3D();
    // pivot for the first finger right hand connection
    this.rightFinger1ConnectionPivot = new THREE.Object3D();
    // pivot for the second finger right hand connection
    this.rightFinger2ConnectionPivot = new THREE.Object3D();
    // pivot for the third finger right hand connection
    this.rightFinger3ConnectionPivot = new THREE.Object3D();
    // pivot for the thumb finger right hand connection
    this.rightThumbFingerConnectionPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the first finger right hand
    this.connectFirstRightFingerPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the second finger right hand
    this.connectSecondRightFingerPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the third finger right hand
    this.connectThirdRightFingerPivot = new THREE.Object3D();
    // add pivot to connect the sphere to the thumb finger right hand
    this.connectRightThumbFingerPivot = new THREE.Object3D();
  }

  init(scene, position, color) {
    // PACMAN COLOR
    this.headMaterial = new THREE.MeshBasicMaterial({ color: color.headColor });
    this.ArmMaterial = new THREE.MeshBasicMaterial({ color: color.armColor });
    this.HandMaterial = new THREE.MeshBasicMaterial({ color: color.handColor });
    this.mouthMaterial = new THREE.MeshBasicMaterial({
      color: color.headColor,
    });

    // --------------- PACMAN Meshes-------------------------
    // mesh first half head
    this.head1 = new THREE.Mesh(headGeometry, this.headMaterial);
    this.head1.rotateX(THREE.Math.degToRad(-15));
    this.head1.position.set(-0, 5, -5);

    // mesh second half head
    this.head2 = new THREE.Mesh(headGeometry2, this.headMaterial);
    this.head2.position.set(-0, 5, -5);
    this.head2.rotation.x = Math.PI / true;
    this.head2.rotateX(THREE.Math.degToRad(25));

    // mesh brain
    this.brain = new THREE.Mesh(brainGeometry, brainMaterial);
    this.brain.position.x = -0;
    this.brain.position.y = 5;
    this.brain.position.z = -5;

    // mesh mouth
    this.mouth = new THREE.Mesh(mouthGeometry, this.mouthMaterial);
    this.mouth.position.set(-0, 5, -5);
    // to rotate/invert the semi-sphere  to create the illusion of the mouth of the pacman
    this.mouth.rotation.x = Math.PI / true;
    this.mouth.rotateX(THREE.Math.degToRad(-5));

    // mesh leftEye
    this.leftEye = new THREE.Mesh(EyeGeometry, EyeMaterial);
    this.leftEye.position.set(-2, 9, 1);

    // mesh rightEye
    this.rightEye = new THREE.Mesh(EyeGeometry, EyeMaterial);
    this.rightEye.position.set(2, 9, 1);

    // mesh left Arm
    this.leftArm = new THREE.Mesh(ArmGeometry, this.ArmMaterial);
    this.leftArm.position.set(-7, 7, -5);

    // mesh sphere for the left shoulder
    this.leftShoulderSphere = new THREE.Mesh(
      ShoulderSphereGeometry,
      ShoulderSphereMaterial
    );

    //mesh left forearm
    this.leftForeArm = new THREE.Mesh(ForeArmGeometry, ForeArmMaterial);
    this.leftForeArm.position.z = 4;

    //mesh left hand
    this.leftHand = new THREE.Mesh(HandGeometry, this.HandMaterial);
    this.leftHand.position.y = 0.4;

    // mesh fingers and there connections
    this.leftFinger1Connection = new THREE.Mesh(
      Finger1ConnectionHandGeometry,
      Finger1ConnectionHandMaterial
    );
    this.leftFinger2Connection = new THREE.Mesh(
      Finger2ConnectionHandGeometry,
      Finger2ConnectionHandMaterial
    );
    this.leftFinger3Connection = new THREE.Mesh(
      Finger3ConnectionHandGeometry,
      Finger3ConnectionHandMaterial
    );
    this.leftThumbFingerConnection = new THREE.Mesh(
      ThumbFingerConnectionHandGeometry,
      ThumbFingerConnectionHandMaterial
    );
    this.leftThumbFingerConnection.position.x = -0.7;
    // mesh first finger left hand
    this.firstFingerLeftHand = new THREE.Mesh(
      Finger1HandGeometry,
      Finger1HandMaterial
    );
    // mesh second finger left hand
    this.secondFingerLeftHand = new THREE.Mesh(
      Finger2HandGeometry,
      Finger2HandMaterial
    );
    // mesh third finger left hand
    this.thirdFingerLeftHand = new THREE.Mesh(
      Finger3HandGeometry,
      Finger3HandMaterial
    );
    // // mesh thumb finger left hand
    this.thumbFingerLeftHand = new THREE.Mesh(
      ThumbFingerHandGeometry,
      ThumbFingerHandMaterial
    );

    // ----RIGHT SIDE BODY -----

    // mesh right Arm
    this.rightArm = new THREE.Mesh(ArmGeometry, this.ArmMaterial);
    this.rightArm.position.set(7, 7, -5);

    //mesh sphere for the right shoulder
    this.rightShoulderSphere = new THREE.Mesh(
      ShoulderSphereGeometry,
      ShoulderSphereMaterial
    );

    //mesh right forearm
    this.rightForeArm = new THREE.Mesh(ForeArmGeometry, ForeArmMaterial);
    this.rightForeArm.position.y = -0.1;
    this.rightForeArm.position.z = 4;

    //mesh right hand
    this.rightHand = new THREE.Mesh(HandGeometry, this.HandMaterial);
    this.rightHand.position.y = 0.4;

    // fingers and there connections
    this.rightFinger1Connection = new THREE.Mesh(
      Finger1ConnectionHandGeometry,
      Finger1ConnectionHandMaterial
    );
    this.rightFinger2Connection = new THREE.Mesh(
      Finger2ConnectionHandGeometry,
      Finger2ConnectionHandMaterial
    );
    this.rightFinger3Connection = new THREE.Mesh(
      Finger3ConnectionHandGeometry,
      Finger3ConnectionHandMaterial
    );
    this.rightThumbFingerConnection = new THREE.Mesh(
      ThumbFingerConnectionHandGeometry,
      ThumbFingerConnectionHandMaterial
    );
    this.rightThumbFingerConnection.position.x = 0.7;
    // mesh first finger right hand
    this.firstFingerRightHand = new THREE.Mesh(
      Finger1HandGeometry,
      Finger1HandMaterial
    );
    // mesh second finger right hand
    this.secondFingerRightHand = new THREE.Mesh(
      Finger2HandGeometry,
      Finger2HandMaterial
    );
    // mesh third finger right hand
    this.thirdFingerRightHand = new THREE.Mesh(
      Finger3HandGeometry,
      Finger3HandMaterial
    );
    //mesh thumb finger right hand
    this.thumbFingerRightHand = new THREE.Mesh(
      ThumbFingerHandGeometry,
      ThumbFingerHandMaterial
    );

    // ------------------------------------ PACMAN Pivot Positions--------------------------
    this.leftShoulderPivot.position.set(-1.8, 0, 0);
    this.secondLeftForeArmPivot.position.y = 3.4;
    this.leftFinger1ConnectionPivot.position.x = 0.75;
    this.leftFinger1ConnectionPivot.position.y = 1.05;
    this.leftFinger2ConnectionPivot.position.x = -0.05;
    this.leftFinger2ConnectionPivot.position.y = 1.05;
    this.leftFinger3ConnectionPivot.position.x = -0.75;
    this.leftFinger3ConnectionPivot.position.y = 1.05;
    this.leftThumbFingerConnectionPivot.position.x = -0.5;
    this.leftThumbFingerConnectionPivot.position.y = 0.1;
    this.connectFirstLeftFingerPivot.position.y = 1;
    this.connectSecondLeftFingerPivot.position.y = 1;
    this.connectThirdLeftFingerPivot.position.y = 1;
    this.leftThumbFingerConnection.position.x = -0.7;
    this.rightShoulderPivot.position.set(1.8, 0, 0);
    this.secondRightForeArmPivot.position.y = 3.4;
    this.rightFinger1ConnectionPivot.position.x = 0.75;
    this.rightFinger1ConnectionPivot.position.y = 1.05;
    this.rightFinger2ConnectionPivot.position.x = -0.05;
    this.rightFinger2ConnectionPivot.position.y = 1.05;
    this.rightFinger3ConnectionPivot.position.x = -0.75;
    this.rightFinger3ConnectionPivot.position.y = 1.05;
    this.rightThumbFingerConnectionPivot.position.x = 0.8;
    this.rightThumbFingerConnectionPivot.position.y = 0.1;
    this.connectFirstRightFingerPivot.position.y = 1;
    this.connectSecondRightFingerPivot.position.y = 1;
    this.connectThirdRightFingerPivot.position.y = 1;
    this.rightThumbFingerConnection.position.x = 0.7;

    // ------------------------------ PACMAN CONNECTIONS WITH THE MESHES ---------------------------------------------
    this.leftArm.add(this.leftShoulderPivot);
    this.leftShoulderPivot.add(this.leftShoulderSphere);
    this.leftShoulderSphere.add(this.leftForeArmPivot);
    this.leftForeArmPivot.add(this.leftForeArm);
    this.leftForeArm.add(this.secondLeftForeArmPivot);
    this.secondLeftForeArmPivot.add(this.leftHand);
    this.leftHand.add(this.leftFinger1ConnectionPivot);
    this.leftHand.add(this.leftFinger2ConnectionPivot);
    this.leftHand.add(this.leftFinger3ConnectionPivot);
    this.leftHand.add(this.leftThumbFingerConnectionPivot);
    this.leftFinger1ConnectionPivot.add(this.leftFinger1Connection);
    this.leftFinger2ConnectionPivot.add(this.leftFinger2Connection);
    this.leftFinger3ConnectionPivot.add(this.leftFinger3Connection);
    this.leftThumbFingerConnectionPivot.add(this.leftThumbFingerConnection);
    this.leftFinger1Connection.add(this.connectFirstLeftFingerPivot);
    this.leftFinger2Connection.add(this.connectSecondLeftFingerPivot);
    this.leftFinger3Connection.add(this.connectThirdLeftFingerPivot);
    this.leftThumbFingerConnectionPivot.add(this.connectLeftThumbFingerPivot);
    this.connectFirstLeftFingerPivot.add(this.firstFingerLeftHand);
    this.connectSecondLeftFingerPivot.add(this.secondFingerLeftHand);
    this.connectThirdLeftFingerPivot.add(this.thirdFingerLeftHand);
    this.leftThumbFingerConnection.add(this.thumbFingerLeftHand);
    this.rightArm.add(this.rightShoulderPivot);
    this.rightShoulderPivot.add(this.rightShoulderSphere);
    this.rightShoulderSphere.add(this.rightForeArmPivot);
    this.rightForeArmPivot.add(this.rightForeArm);
    this.rightForeArm.add(this.secondRightForeArmPivot);
    this.secondRightForeArmPivot.add(this.rightHand);
    this.rightHand.add(this.rightFinger1ConnectionPivot);
    this.rightHand.add(this.rightFinger2ConnectionPivot);
    this.rightHand.add(this.rightFinger3ConnectionPivot);
    this.rightHand.add(this.rightThumbFingerConnectionPivot);
    this.rightFinger1ConnectionPivot.add(this.rightFinger1Connection);
    this.rightFinger2ConnectionPivot.add(this.rightFinger2Connection);
    this.rightFinger3ConnectionPivot.add(this.rightFinger3Connection);
    this.rightThumbFingerConnectionPivot.add(this.rightThumbFingerConnection);
    this.rightFinger1Connection.add(this.connectFirstRightFingerPivot);
    this.rightFinger2Connection.add(this.connectSecondRightFingerPivot);
    this.rightFinger3Connection.add(this.connectThirdRightFingerPivot);
    this.rightThumbFingerConnectionPivot.add(this.connectRightThumbFingerPivot);
    this.connectFirstRightFingerPivot.add(this.firstFingerRightHand);
    this.connectSecondRightFingerPivot.add(this.secondFingerRightHand);
    this.connectThirdRightFingerPivot.add(this.thirdFingerRightHand);
    this.rightThumbFingerConnection.add(this.thumbFingerRightHand);

    // ------------------------- PACMAN Velocity Movements--------------
    this.velocityMovementArm = 0.004;
    this.velocityMovementFingers = 0.03;

    // -------------------------- PACMAN rotations---------------------
    // rotations left side body
    this.leftArm.rotation.x = 1.55;
    this.leftShoulderSphere.rotation.x = 3.17;
    this.leftForeArm.rotation.x = 1.55;
    this.leftForeArm.rotation.y = 25;
    this.leftFinger1Connection.rotation.x = 3.17;
    this.leftFinger2Connection.rotation.x = 3.17;
    this.leftFinger3Connection.rotation.x = 3.17;
    this.leftThumbFingerConnection.rotation.y = 30;

    // rotations right side body
    this.rightArm.rotation.x = 1.55;
    this.rightShoulderSphere.rotation.x = 3.17;
    this.rightForeArm.rotation.x = 1.55;
    this.rightForeArm.rotation.y = 25;
    this.rightFinger1Connection.rotation.x = 3.17;
    this.rightFinger2Connection.rotation.x = 3.17;
    this.rightFinger3Connection.rotation.x = 3.17;
    this.rightThumbFingerConnection.rotation.y = 30;

    // rotation pivots left side body
    this.leftShoulderPivot.rotation.x = 1.55;
    this.leftForeArmPivot.rotation.x = 70;
    this.leftFinger1ConnectionPivot.rotation.x = 3;
    this.leftFinger2ConnectionPivot.rotation.x = 3;
    this.leftFinger3ConnectionPivot.rotation.x = 3;
    this.connectFirstLeftFingerPivot.rotation.x = 30;
    this.connectSecondLeftFingerPivot.rotation.x = 30;
    this.connectThirdLeftFingerPivot.rotation.x = 30;

    // rotation pivots right side body
    this.rightShoulderPivot.rotation.x = 1.55;
    this.rightForeArmPivot.rotation.x = 70;
    this.rightFinger1ConnectionPivot.rotation.x = 3;
    this.rightFinger2ConnectionPivot.rotation.x = 3;
    this.rightFinger3ConnectionPivot.rotation.x = 3;
    this.connectFirstRightFingerPivot.rotation.x = 30;
    this.connectSecondRightFingerPivot.rotation.x = 30;
    this.connectThirdRightFingerPivot.rotation.x = 30;

    // ---------------------PACMAN MODEL -------------------------------------------
    this.Pacman = new THREE.Group();
    this.Pacman.add(
      this.head1,
      this.head2,
      this.leftArm,
      this.rightArm,
      this.brain,
      this.leftEye,
      this.rightEye,
      this.mouth
    );

    scene.add(this.Pacman);
    this.Pacman.position.set(position.x, position.y, position.z);
    this.Pacman.scale.set(0.4, 0.4, 0.4);

    addShadow(this.head1, this.head2, this.leftArm, this.rightArm, this.mouth);
  }

  // ----------------------ANIMATION SECTION-------------------------------------
  animateArmShoulders() {
    // rotation of the left shoulder on x axis
    this.leftShoulderSphere.rotation.x += this.velocityMovementArm;
    // rotation of the right shoulder on x axis
    this.rightShoulderSphere.rotation.x += this.velocityMovementArm;

    if (
      (this.leftShoulderSphere.rotation.x < 1.55 ||
        this.leftShoulderSphere.rotation.x > 3.17) &&
      (this.rightShoulderSphere.rotation.x < 1.55 ||
        this.rightShoulderSphere.rotation.x > 3.17)
    ) {
      // to control the rotation
      this.velocityMovementArm = this.velocityMovementArm * -1;
    }
  }

  animateFingers() {
    // rotation of the fingers of left hand on x axis
    this.leftFinger1Connection.rotation.x += this.velocityMovementFingers;
    this.leftFinger2Connection.rotation.x += this.velocityMovementFingers;
    this.leftFinger3Connection.rotation.x += this.velocityMovementFingers;
    // rotation of the fingers of right hand on x axis
    this.rightFinger1Connection.rotation.x += this.velocityMovementFingers;
    this.rightFinger2Connection.rotation.x += this.velocityMovementFingers;
    this.rightFinger3Connection.rotation.x += this.velocityMovementFingers;

    if (
      (this.leftFinger1Connection.rotation.x < 1.55 ||
        this.leftFinger1Connection.rotation.x > 3.17) &&
      (this.leftFinger2Connection.rotation.x < 1.55 ||
        this.leftFinger2Connection.rotation.x > 3.17) &&
      (this.leftFinger3Connection.rotation.x < 1.55 ||
        this.leftFinger3Connection.rotation.x > 3.17) &&
      (this.rightFinger1Connection.rotation.x < 1.55 ||
        this.rightFinger1Connection.rotation.x > 3.17) &&
      (this.rightFinger2Connection.rotation.x < 1.55 ||
        this.rightFinger2Connection.rotation.x > 3.17) &&
      (this.rightFinger3Connection.rotation.x < 1.55 ||
        this.rightFinger3Connection.rotation.x > 3.17)
    ) {
      // to control the rotation
      this.velocityMovementFingers = this.velocityMovementFingers * -1;
    }
  }

  animateMouth() {
    this.mouth.rotation.x -= 0.05;
  }

  animate() {
    this.animateArmShoulders();
    this.animateFingers();
    this.animateMouth();
  }
}
