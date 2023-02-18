import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff);
  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);
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


  // 매쉬
  const geometry01 = new THREE.BoxGeometry( 1, 1, 1 );
  const material01 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );

  const cube = new THREE.Mesh( geometry01, material01 );
  scene.add( cube );


  
  const geometry02 = new THREE.TorusGeometry( 10, 1, 15, 100 );
  const material02 = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
  const torus = new THREE.Mesh( geometry02, material02 );
  scene.add( torus );
  const geometry = new THREE.SphereGeometry( 1, 8, 4 );
  const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
  const sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
  camera.position.z = 15;
  sphere.position.x = 2;



  
  function render (time){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    

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
