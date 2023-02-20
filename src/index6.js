import * as THREE from 'three'
import { WEBGL } from './webgl'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)


  // 카메라
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1,4000);
//   카메라(x,y,z)
  camera.position.set(0,20,100);
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
  controls.minDistance = 20;
// 마우스 휠로 카메라 거리 조작시 최소값 , 기본값(Float)는 0입니다
  controls.maxDistance = 800;
//   마우스 휠로 카메라 거리조작시 최대 값, 기본값(Float)는 무제한
  controls.enableDamping =true; //마우스 우클릭으로 카메라 위치변경
// 컨트롤 업데이트
  controls.update();

  const skymaterialArray = [];
  const texture_ft = new THREE.TextureLoader().load('../static/Skyimg/quirk_ft.jpg')
  const texture_bk = new THREE.TextureLoader().load('../static/Skyimg/quirk_bk.jpg')
  const texture_up = new THREE.TextureLoader().load('../static/Skyimg/quirk_up.jpg')
  const texture_dn = new THREE.TextureLoader().load('../static/Skyimg/quirk_dn.jpg')
  const texture_rt = new THREE.TextureLoader().load('../static/Skyimg/quirk_rt.jpg')
  const texture_lt = new THREE.TextureLoader().load('../static/Skyimg/quirk_lf.jpg')
  skymaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_ft,
    })
  )
  skymaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_bk,
    })
  )
  skymaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_up,
    })
  )
  skymaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_dn,
    })
  )
  skymaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_rt,
    })
  )
  skymaterialArray.push(
    new THREE.MeshStandardMaterial({
        map: texture_lt,
    })
  )
//   반복문
    for (let i = 0; i<6 ; i++){
        skymaterialArray[i].side = THREE.BackSide
    } 

//   도형추가
  const skygeometry = new THREE.BoxGeometry(1400,1400,1400);
//   const skymaterial = new THREE.MeshStandardMaterial({
//     color: 0x333333,
//     map: texture
//   });
//   skymaterial.side = THREE.BackSide;
  const sky = new THREE.Mesh(skygeometry,skymaterialArray);
  scene.add(sky);
 // 빛

  const ambientLight = new THREE.AmbientLight(0xffffff,1)
  scene.add(ambientLight);


  function animate(){
    requestAnimationFrame(animate)
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