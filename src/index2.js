import * as THREE from 'three'
import { WEBGL } from './webgl'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { Side, TextureLoader } from 'three';

if (WEBGL.isWebGLAvailable()) {
    
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);
  // 카메라
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1,1000);
  camera.position.set(0,0,1);
  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
  });  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
//   도형추가
  const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFF7F00
  });
  const cube = new THREE.Mesh(geometry,material);
  cube.rotation.y = 0.5;
  scene.add(cube);
  
//   바닥추가
  const planeGeometry = new THREE.PlaneGeometry(20,20);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color : 0xffff00,
    Side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotateX(-Math.PI/2);
  plane.rotation.y = -0.5;
  scene.add(plane);

 // 빛
  const pointLight = new THREE.PointLight(0xffffbb,1);
  pointLight.position.set(0,2,12);
  scene.add(pointLight);
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