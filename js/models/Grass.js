import * as THREE from "../../libs/three.module.js";

////////////
// MATERIAL
////////////

let simpleNoise = `
    float N (vec2 st) { // https://thebookofshaders.com/10/
        return fract( sin( dot( st.xy, vec2(12.9898,78.233 ) ) ) *  43758.5453123);
    }
    
    float smoothNoise( vec2 ip ){ // https://www.youtube.com/watch?v=zXsWftRdsvU
    	vec2 lv = fract( ip );
      vec2 id = floor( ip );
      
      lv = lv * lv * ( 3. - 2. * lv );
      
      float bl = N( id );
      float br = N( id + vec2( 1, 0 ));
      float b = mix( bl, br, lv.x );
      
      float tl = N( id + vec2( 0, 1 ));
      float tr = N( id + vec2( 1, 1 ));
      float t = mix( tl, tr, lv.x );
      
      return mix( b, t, lv.y );
    }
  `;

const vertexShader = `
  varying vec2 vUv;
  uniform float time;
  
  ${simpleNoise}
  
	void main() {
    vUv = uv;
    float t = time * 2.;
    
    // VERTEX POSITION
    
    vec4 mvPosition = vec4( position, 0.7 );
    #ifdef USE_INSTANCING
    	mvPosition = instanceMatrix * mvPosition;
    #endif
    
    // DISPLACEMENT
    
    float noise = smoothNoise(mvPosition.xz * 0.5 + vec2(0., t));
    noise = pow(noise * 0.5 + 0.5, 2.) * 2.;
    
    // here the displacement is made stronger on the blades tips.
    float dispPower = 1. - cos( uv.y * 3.1416 * 0.5 );
    
    float displacement = noise * ( 0.3 * dispPower );
    mvPosition.z -= displacement;
    
    //
    
    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;

	}
`;

const fragmentShader = `
  varying vec2 vUv;
  
  void main() {
  	vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
    float clarity = ( vUv.y * 0.875 ) + 0.125;
    gl_FragColor = vec4( baseColor * clarity, 1 );
  }
`;

const uniforms = {
  time: {
    value: 0,
  },
};

const leavesMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
  side: THREE.DoubleSide,
});

/////////
// MESH
/////////

const instanceNumber = 30000;
const dummy = new THREE.Object3D();

const geometry = new THREE.PlaneGeometry(0.1, 1, 4);
geometry.translate(0, 0.5, 0); // move grass blade geometry lowest point at 0.

const instancedMesh = new THREE.InstancedMesh(geometry, leavesMaterial, instanceNumber);

export class Grass {
  constructor() {
    this.clock = new THREE.Clock();
  }

  init(scene) {
    scene.add(instancedMesh);
    for (let i = 0; i < instanceNumber; i++) {
      dummy.position.set((Math.random() - 0.5) * 25, -5, (Math.random() - 0.5) * 150);

      dummy.scale.setScalar(0.5 + Math.random() * 0.5);

      dummy.rotation.y = Math.random() * Math.PI;

      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    // change the position of the grass closer to the player
    instancedMesh.position.z = 20;
    instancedMesh.position.x = -5;
  }

  animate() {
    // Hand a time variable to vertex shader for wind displacement.
    leavesMaterial.uniforms.time.value = this.clock.getElapsedTime();
    leavesMaterial.uniformsNeedUpdate = true;
  }
}