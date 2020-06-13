function init() {
  // 기본 요소 Scene 정의
  var scene = new THREE.Scene();
  // 기본 요소 Camera 정의
  var camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 기본 요소 Renderer 정의
  var renderer = new THREE.WebGLRenderer();

  // 씬 전체의 배경색 (약한 그레이)
  renderer.setClearColor(0xeeeeee);
  // 렌더러 사이즈 브라우저 창에 맞도록
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 그림자 생성
  renderer.shadowMap.enabled = true;

  // 카메라가 어디를 보고있는지를 도와줄 좌표를 넣기 위해
  // 좌표길이 10
  var axes = new THREE.AxisHelper(10);
  scene.add(axes);

  // 바닥판 생성
  var planeGeometry = new THREE.PlaneGeometry(60, 30, 1, 1);
  var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  scene.add(plane);
  // 바닥판은 그림자를 받음
  plane.receiveShadow = true;

  // 큐브 생성
  var cubeGeometry = new THREE.BoxGeometry(6, 6, 6);
  var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0x0089a0 });
  var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
  cube.position.x = 0;
  cube.position.y = 10;
  cube.position.z = 10;
  scene.add(cube);
  // 큐브는 그림자가 생성
  cube.castShadow = true;

  // 구 생성
  var sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
  var sphereMeterial = new THREE.MeshPhongMaterial({ color: 0xfe98a0 });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMeterial);
  sphere.position.x = -15;
  sphere.position.y = 2;
  sphere.position.z = 0;
  scene.add(sphere);
  // 구는 그림자가 생성
  sphere.castShadow = true;

  // 공을 튀기는데 사용할 변수
  var step = 0;

  // 조명 추가
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, 30);
  scene.add(spotLight);
  // 조명에도 castShadow
  spotLight.castShadow = true;
  // 해상도를 높이기
  spotLight.shadow.mapSize.width = 5120;
  spotLight.shadow.mapSize.height = 5120;

  // 정 중앙에 있으면 아무것도 못보니까 카메라 밖으로 이동
  camera.position.x = 0;
  camera.position.y = 30;
  camera.position.z = 30;

  // 카메라가 쳐다보는 곳은 정웅앙
  camera.lookAt(scene.position);

  // 변수 전달
  document.getElementById("threejs_scene").appendChild(renderer.domElement);

  // scene 을 렌더링 하기 위한 함수
  renderScene();
  function renderScene() {
    renderer.render(scene, camera);

    // 큐브가 회전하도록
    requestAnimationFrame(renderScene);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    // 공이 튀기는것처럼 보이게 하도록
    step += 0.1;
    sphere.position.y = 7 + 5 * Math.cos(step);
  }
}

window.onload = init();
