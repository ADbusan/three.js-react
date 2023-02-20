import * as THREE from 'three'
import { WEBGL } from './webgl'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { Side, TextureLoader } from 'three';

if (WEBGL.isWebGLAvailable()) {
    
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);
  // 카메라
  const camera = new THREE.PerspectiveCamera(130, window.innerWidth / window.innerHeight, 0.1,1000);
//   카메라(x,y,z)
  camera.position.set(0,1,1.8);
  camera.lookAt(new THREE.Vector3(0,0,0));


  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

//   렌더러 그림자
renderer.shadowMap.enabled = true;

//   도형추가
//   const geometry = new THREE.SphereGeometry(0.5,32,16);
//   const geometry = new THREE.IcosahedronGeometry(0,5,0);
  const geometry = new THREE.ConeGeometry(0.4,0.7,6);
  const material = new THREE.MeshStandardMaterial({
    color: 0x004fff
  });
  const cube = new THREE.Mesh(geometry,material);
  cube.rotation.y = 0.5;
  cube.position.y = 0.2;
  scene.add(cube);
  cube.receiveShadow=true;


  const geometry1 = new THREE.ConeGeometry(0.4,0.7,6);
  const material1 = new THREE.MeshStandardMaterial({
    color: 0x004fff
  });
  const cube1 = new THREE.Mesh(geometry1,material1);
  cube.position.set(-0.8,1.2,0.5);
  scene.add(cube1);
//   그림자
  cube1.castShadow = true;
  
//   바닥추가
  const planeGeometry = new THREE.PlaneGeometry(20,20,1,1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color : 0xffffff
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5*Math.PI;
  plane.position.y = -0.2;
  scene.add(plane);
//   그림자
  plane.receiveShadow = true;

 // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
  scene.add(ambientLight);

//   ambientLight.castShadow = true; 그림자 x

//   빛 해의 위치
  const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
  directionalLight.position.set(-1,1.2,1.1);
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x0000ff);
  scene.add(dlHelper);
  scene.add(directionalLight);

//   그림자/해상도
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2024;
  directionalLight.shadow.mapSize.height= 2024;
  directionalLight.shadow.radius = 8;



const hemisphereLight = new THREE.HemisphereLight(0x0000ff,0xff0000,0.3);
// scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xffffff,5);
pointLight.position.set(-1,1,0.5);
const plHelper = new THREE.PointLightHelper(pointLight, 0.1);
// scene.add(pointLight);
// scene.add(plHelper);
// 그림자
// pointLight.castShadow = true;

const rectLight = new THREE.RectAreaLight(0xffffff,2,1,1);
rectLight.position.set(1,1,1);
rectLight.lookAt(0,0,0);
// scene.add(rectLight);

const spotLight = new THREE.SpotLight(0xffffff,0.5);
spotLight.position.set(1,2,1);
// scene.add(spotLight);
// spotLight.castShadow = true;



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