function init() {
  // 위치 변화 변수
  var step = 0;

  // scene 생성
  var scene = new THREE.Scene();

  // camera 생성
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(40, 50, 65);
  camera.lookAt(scene.position);

  // renderer 생성
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 쉐도우 맵 지정
  renderer.shadowMap.enabled = true;

  // 편의성을 위한 축 생성
  var axes = new THREE.AxesHelper(20);
  axes.position.set(0, 0, 0);

  // 바닥판 생성
  var planeGeometry = new THREE.PlaneGeometry(100, 60);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // 바닥판이 바닥으로 가도록 세팅
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);

  //바닥판은 그림자를 받음
  plane.receiveShadow = true;

  // 머리 생성
  var cubeGeometry = new THREE.CubeGeometry(7, 7, 7);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var head = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // 머리 위치 지정
  head.position.set(0, 19.5, 7);

  //그림자 생성 오브젝트
  head.castShadow = true;

  // 왼쪽 귀 생성
  var cylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 2, 32);
  var cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var Lear = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  Lear.position.set(-2, 24.5, 10);
  Lear.castShadow = true;

  // 오른쪽 귀 생성
  var cylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 2, 32);
  var cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var Rear = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  Rear.position.set(3, 24.5, 10);
  Rear.castShadow = true;

  // 왼쪽 눈 생성
  var sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var Leye = new THREE.Mesh(sphereGeometry, sphereMaterial);
  Leye.position.set(-1.5, 21, 10.5);
  Leye.castShadow = true;

  // 오른쪽 눈 생성
  var sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var Reye = new THREE.Mesh(sphereGeometry, sphereMaterial);
  Reye.position.set(1.5, 21, 10.5);
  Reye.castShadow = true;

  // 목 생성
  var cubeGeometry = new THREE.CubeGeometry(2, 3, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var neck = new THREE.Mesh(cubeGeometry, cubeMaterial);
  neck.position.set(0, 14.5, 5.5);
  neck.castShadow = true;

  // 몸통 생성
  var cubeGeometry = new THREE.CubeGeometry(10, 10, 15);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var body = new THREE.Mesh(cubeGeometry, cubeMaterial);
  body.position.set(0, 8, 0);
  body.castShadow = true;

  // 왼쪽 앞 다리 생성
  var cubeGeometry = new THREE.CubeGeometry(3, 10, 3);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var LFleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LFleg.position.set(-6.5, 5, 6);
  LFleg.castShadow = true;
  // 오른쪽 앞 다리 생성
  var cubeGeometry = new THREE.CubeGeometry(3, 10, 3);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var RFleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RFleg.position.set(6.5, 5, 6);
  RFleg.castShadow = true;
  // 왼쪽 뒷다리 생성
  var cubeGeometry = new THREE.CubeGeometry(3, 10, 3);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var LBleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBleg.position.set(-6.5, 5, -6);
  LBleg.castShadow = true;
  // 오른쪽 뒷다리 생성
  var cubeGeometry = new THREE.CubeGeometry(3, 10, 3);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var RBleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RBleg.position.set(6.5, 5, -6);
  RBleg.castShadow = true;
  // 조명 생성
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(20, 80, 100);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(5120, 5120);

  // 속도 조절 control
  var controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
  })();

  var gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "bouncingSpeed", 0, 0.5);

  //scene에 객체들 추가
  scene.add(axes);
  scene.add(head);
  scene.add(Lear);
  scene.add(Rear);
  scene.add(Leye);
  scene.add(Reye);
  scene.add(neck);
  scene.add(body);
  scene.add(LFleg);
  scene.add(RFleg);
  scene.add(LBleg);
  scene.add(RBleg);
  scene.add(plane);
  scene.add(spotLight);

  // 변수 전달
  document.getElementById("threejs_scene").appendChild(renderer.domElement);

  // 렌더링
  renderScene();

  // 렌더링 함수
  function renderScene() {
    renderer.render(scene, camera);

    requestAnimationFrame(renderScene);
    //큐브 회전
    // cube.rotation.x += controls.rotationSpeed;
    // cube.rotation.y += controls.rotationSpeed;
    // cube.rotation.z += controls.rotationSpeed;

    // 튀기는 큐브position 변경
    // step += controls.bouncingSpeed;
    // cube.position.x = 10 * Math.cos(step);
    // cube.position.y = 10 + 10 * Math.abs(Math.sin(step));
  }
}
window.onload = init();
