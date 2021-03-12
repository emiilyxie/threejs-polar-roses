import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const pointLight = new THREE.PointLight( 0xffffff, .5, 0 );
const ambientLight = new THREE.AmbientLight( 0xffffff );
const meshes = [];

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#e5e5e5");

const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );

class CustomSinCurve extends THREE.Curve {

	constructor( equation, scale = 1 ) {

		super();

		this.equation = equation;
		this.zDiv = Math.random() * 3 + 0.25;
		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

    const equation = function(x) {
      return Math.sin(4 * 2 * Math.PI * x);
    }

		const tx = this.equation(t) * Math.cos( 2 * Math.PI * t );
		const ty = this.equation(t) * Math.sin( 2 * Math.PI * t );
		const tz = this.equation(t) / this.zDiv / (this.scale * 0.2);

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}

function addFlower( equation, scale, color ) {

	const path = new CustomSinCurve( equation, scale );
	const geometry = new THREE.TubeGeometry( path, 200, .5, 10, false );
	const material = new THREE.MeshPhongMaterial( { color: color } );
	//const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	meshes.push( mesh );

}

const generateEquation = () => {
	const number = Math.ceil( Math.random() * 6 );
	const trig = Math.floor( Math.random() * 2 );

	if ( trig == 1 ) {
		return (x) => Math.sin(number * 2 * Math.PI * x);
	}
	else {
		return (x) => Math.cos(number * 2 * Math.PI * x);
	}

}

const generateColor = () => {
	const color = new THREE.Color( Math.random(), Math.random(), Math.random() );
	return color;
}

addFlower(generateEquation(), 10, generateColor());
addFlower(generateEquation(), 5, generateColor());
addFlower(generateEquation(), 15, generateColor());

pointLight.position.set( 0, 0, 100 );
scene.add( pointLight );
scene.add( ambientLight );

camera.position.z = 40;
controls.update();

function animate() {
  requestAnimationFrame( animate );
  
	/*
  for (var i = 0; i < meshes.length; i++) {
		meshes[i].rotation.x += 0.01
		meshes[i].rotation.z += 0.01
	}
	*/

	controls.update();

  renderer.render( scene, camera );
}

animate();
