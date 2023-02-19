import * as THREE from 'three'
import { WEBGL } from './webgl'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { TextureLoader } from 'three';

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff);
  // 카메라
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1,1000);
  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
  });
  // 빛
  const pointLight = new THREE.PointLight(0xffffff,1);
  pointLight.position.set(0,2,12);
  scene.add(pointLight);
  

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
// 텍스터 추가
  const textureLoder = new THREE.TextureLoader();
  const textureBaseColor = textureLoder.load('../static/image/Stone_Path_008_basecolor.jpg');
  const textureNomalMap = textureLoder.load('../static/image/Stone_Path_008_normal.jpg');
  const textureHeightMap = textureLoder.load('../static/image/Stone_Path_008_height.png');
  const textureRoughnessMap = textureLoder.load('../static/image/Stone_Path_008_roughness.jpg');

  camera.position.z = 10;

  const geometry = new THREE.SphereGeometry( 1, 32, 16 );
  const material = new THREE.MeshStandardMaterial( { 
    map : textureBaseColor
    } );
  const sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );

  const geometry1 = new THREE.SphereGeometry( 1, 32, 16 );
  const material1 = new THREE.MeshStandardMaterial( { 
    map : textureBaseColor,
    normalMap : textureNomalMap
    } );
  const sphere1 = new THREE.Mesh( geometry1, material1 );
  scene.add( sphere1 );
  sphere1.position.x= 3;

  const geometry2 = new THREE.SphereGeometry( 1, 32, 16 );
  const material2 = new THREE.MeshStandardMaterial( { 
    map : textureBaseColor,
    normalMap :textureNomalMap,
    displacementMap :textureHeightMap,
    displacementScale : 0.5
    } );
  const sphere2 = new THREE.Mesh( geometry2, material2 );
  scene.add( sphere2 );
  sphere2.position.x= -3;

  const geometry3 = new THREE.SphereGeometry( 1, 32, 16 );
  const material3 = new THREE.MeshStandardMaterial( { 
    map : textureBaseColor,
    normalMap :textureNomalMap,
    displacementMap :textureHeightMap,
    displacementScale : 0.5,
    roughnessMap:textureRoughnessMap,
    roughness:1
    } );
  const sphere3 = new THREE.Mesh( geometry3, material3 );
  scene.add( sphere3 );
  sphere3.position.x= -6;



  
  function render (time){
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    
    sphere1.rotation.x += 0.01;
    sphere1.rotation.y += 0.01;
    
    sphere2.rotation.x += 0.01;
    sphere2.rotation.y += 0.01;

    sphere3.rotation.x += 0.01;
    sphere3.rotation.y += 0.01;
    

    renderer.render(scene, camera);
    requestAnimationFrame(render);
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