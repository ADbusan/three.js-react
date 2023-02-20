import * as THREE from 'three'
import { WEBGL } from './webgl'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


if (WEBGL.isWebGLAvailable()) {
    const FogColor = 0x004fff;
    const objColor = 0xffffff;
    const FloorColor = 0x555555;
    
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(FogColor);
  // 안개 두가지
  // scene.fog = new THREE.Fog(FogColor, 1 , 8);
  scene.fog = new THREE.FogExp2(FogColor, 0.1);
  // 카메라
  const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1,1000);
//   카메라(x,y,z)
  camera.position.set(0,2,3);
  camera.lookAt(0,0,0);


  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

//   카메라 이후
  const controls = new OrbitControls(camera,renderer.domElement)
  controls.minDistance = 3;
// 마우스 휠로 카메라 거리 조작시 최소값 , 기본값(Float)는 0입니다
  controls.maxDistance = 6;
//   마우스 휠로 카메라 거리조작시 최대 값, 기본값(Float)는 무제한
  controls.maxPolarAngle = Math.PI / 2 -0.1; // 각도 제한
  controls.enableDamping =true; //마우스 우클릭으로 카메라 위치변경
// 컨트롤 업데이트
  controls.update();
//   도형추가
  const geometry = new THREE.TorusGeometry(0.7,0.3,12,80);
  const material = new THREE.MeshStandardMaterial({
    color: objColor
  });
  const obj = new THREE.Mesh(geometry,material);
  obj.position.y = 0.8;
  scene.add(obj);
//   바닥추가
  const planeGeometry = new THREE.PlaneGeometry(30,30,1,1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color : FloorColor,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5*Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);
 // 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff,1);
  directionalLight.position.set(1,1,1);
  scene.add(directionalLight);



  function animate(){
    requestAnimationFrame(animate)
    obj.rotation.y +=0.01
    renderer.render(scene,camera);
    
  }
  animate()

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