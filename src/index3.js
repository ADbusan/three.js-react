import * as THREE from 'three'
import { WEBGL } from './webgl'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { Side, TextureLoader } from 'three';

if (WEBGL.isWebGLAvailable()) {
    
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  // 카메라
  const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1,1000);
//   카메라(x,y,z)
  camera.position.set(0,1,1.8);
  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
  });  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
//   도형추가
  const geometry = new THREE.SphereGeometry(0.5,32,16);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const cube = new THREE.Mesh(geometry,material);
  cube.rotation.y = 0.5;
  scene.add(cube);
  
//   바닥추가
  const planeGeometry = new THREE.PlaneGeometry(20,20);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color : 0xffffff
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5*Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);

 // 빛
  const ambientLight = new THREE.AmbientLight(0xFF7F00,0.1);
//   scene.add(ambientLight);

//   빛 해의 위치
  const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
  directionalLight.position.set(-1,1,1);
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.8, 0x0000ff);
//   scene.add(dlHelper);
//   scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0x0000ff,0xff0000,0.3);
// scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xffffff,1);
// scene.add(pointLight);
pointLight.position.set(-2,0.5,0.5);
const plHelper = new THREE.PointLightHelper(pointLight, 0.1);
// scene.add(plHelper);

const rectLight = new THREE.RectAreaLight(0xffffff,2,1,1);
// scene.add(rectLight);
rectLight.position.set(0.5,0.5,1);
rectLight.lookAt(0,0,0);

const spotLight = new THREE.SpotLight(0xffffff,0.5);
scene.add(spotLight);



  function render(time){
    renderer.render(scene,camera);
    
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize(){
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/ window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);
 
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}