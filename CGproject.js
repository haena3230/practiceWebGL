function init() {
  // 다리 움직임을 위한 변수
  var step = 0;

  // scene 생성
  var scene = new THREE.Scene();

  // camera 생성
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );

  camera.position.set(50, 60, 100);
  camera.lookAt(scene.position);

  // renderer 생성
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color("rgb(204,204,204)"));
  renderer.setSize(window.innerWidth, window.innerHeight);

  function createLights() {
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
    shadowLight.position.set(100, 200, 50);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 0.2;

    backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-100, 200, 50);
    backLight.shadowDarkness = 0.1;
    backLight.castShadow = true;

    scene.add(backLight);
    scene.add(light);
    scene.add(shadowLight);
  }

  //색상 생성
  var basecolor = new THREE.Color("rgb(255,204,153)");
  var secondcolor = new THREE.Color("rgb(204, 153, 102)");
  var thirdcolor = new THREE.Color("rgb(051, 000, 000)");

  // 쉐도우 맵 지정
  renderer.shadowMap.enabled = true;

  // 편의성을 위한 축 생성
  var axes = new THREE.AxesHelper(20);
  axes.position.set(0, 0, 0);

  // 바닥판 생성
  var planeGeometry = new THREE.PlaneGeometry(100, 200);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(000, 204, 000)",
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // 바닥판이 바닥으로 가도록 세팅
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);

  //바닥판은 그림자를 받음
  plane.receiveShadow = true;

  // 머리 생성
  var cubeGeometry = new THREE.CubeGeometry(7, 7, 7);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: basecolor,
  });
  var head = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // 머리 위치 지정
  head.position.set(0, 19.5, 7);

  //그림자 생성 오브젝트
  head.castShadow = true;

  // 주둥이 생성
  var cubeGeometry = new THREE.CubeGeometry(7, 3, 1);
  cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var mouth = new THREE.Mesh(cubeGeometry, cubeMaterial);
  mouth.position.set(0, 17.5, 10.5);
  mouth.castShadow = true;

  // 왼쪽 귀 생성
  var cubeGeometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var Lear = new THREE.Mesh(cubeGeometry, cubeMaterial);
  Lear.position.set(-2, 24.5, 10);
  Lear.castShadow = true;

  // 오른쪽 귀 생성
  var cubeGeometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var Rear = new THREE.Mesh(cubeGeometry, cubeMaterial);
  Rear.position.set(2, 24.5, 10);
  Rear.castShadow = true;

  //코 생성
  var cubeGeometry = new THREE.CubeGeometry(1.5, 1, 1);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var nose = new THREE.Mesh(cubeGeometry, cubeMaterial);
  nose.position.set(0, 18.5, 11.5);
  nose.castShadow = true;

  // 왼쪽 눈 생성
  var sphereGeometry = new THREE.SphereGeometry(0.5, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var Leye = new THREE.Mesh(sphereGeometry, sphereMaterial);
  Leye.position.set(-1.5, 21, 10.5);
  Leye.castShadow = true;

  // 오른쪽 눈 생성
  var sphereGeometry = new THREE.SphereGeometry(0.5, 20, 20);
  var Reye = new THREE.Mesh(sphereGeometry, sphereMaterial);
  Reye.position.set(1.5, 21, 10.5);
  Reye.castShadow = true;

  // 머리 그룹
  var headgroup = new THREE.Group();
  headgroup.add(head);
  headgroup.add(mouth);
  headgroup.add(nose);
  headgroup.add(Lear);
  headgroup.add(Rear);
  headgroup.add(Leye);
  headgroup.add(Reye);

  // 목 생성
  var cubeGeometry = new THREE.CubeGeometry(2, 3, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: basecolor,
  });
  var neck = new THREE.Mesh(cubeGeometry, cubeMaterial);
  neck.position.set(0, 14.5, 6);
  neck.castShadow = true;

  // 몸통 생성
  var cubeGeometry = new THREE.CubeGeometry(10, 8, 15);
  var body = new THREE.Mesh(cubeGeometry, cubeMaterial);
  body.position.set(0, 8, 0);
  body.castShadow = true;

  // 왼쪽 앞 다리 생성
  var cubeGeometry = new THREE.CubeGeometry(2.5, 10, 2.5);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var LFleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LFleg.position.set(-7.5, 5, 6);
  LFleg.castShadow = true;

  // 오른쪽 앞 다리 생성
  var cubeGeometry = new THREE.CubeGeometry(2.5, 10, 2.5);
  var RFleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RFleg.position.set(7.5, 5, 6);
  RFleg.castShadow = true;

  // 왼쪽 뒷다리 생성
  var cubeGeometry = new THREE.CubeGeometry(2.5, 10, 2.5);
  var LBleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBleg.position.set(-7.5, 5, -6);
  LBleg.castShadow = true;

  // 오른쪽 뒷다리 생성
  var cubeGeometry = new THREE.CubeGeometry(2.5, 10, 2.5);
  var RBleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RBleg.position.set(7.5, 5, -6);
  RBleg.castShadow = true;

  // 꼬리 생성
  var cubeGeometry = new THREE.CubeGeometry(3, 3, 3);
  var tail = new THREE.Mesh(cubeGeometry, cubeMaterial);
  tail.position.set(0, 11.5, -10);
  tail.castShadow = true;

  //몸통그룹
  var bodygroup = new THREE.Group();
  bodygroup.add(neck);
  bodygroup.add(body);
  bodygroup.add(LFleg);
  bodygroup.add(LBleg);
  bodygroup.add(RFleg);
  bodygroup.add(RBleg);
  bodygroup.add(tail);

  // 캐릭터 그룹
  var doggroup = new THREE.Group();
  doggroup.add(headgroup);
  doggroup.add(bodygroup);

  // 선물BOX

  // 왼쪽 위 itembox 생성
  var cubeGeometry = new THREE.CubeGeometry(8, 8, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var LTone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LTone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var LTtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LTtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var LTbox = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LTbox.castShadow = true;

  // 왼쪽 위itembox 그룹화
  var LTitembox = new THREE.Group();
  LTitembox.add(LTone);
  LTitembox.add(LTtwo);
  LTitembox.add(LTbox);
  LTitembox.position.set(-40, 40, 0);

  // 오른쪽 위 itembox 생성
  var cubeGeometry = new THREE.CubeGeometry(8, 8, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var RTone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RTone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var RTtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RTtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var RTbox = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RTbox.castShadow = true;

  // 오른쪽 위itembox 그룹화
  var RTitembox = new THREE.Group();
  RTitembox.add(RTone);
  RTitembox.add(RTtwo);
  RTitembox.add(RTbox);
  RTitembox.position.set(40, 40, 0);

  // 왼쪽 밑 itembox 생성
  var cubeGeometry = new THREE.CubeGeometry(8, 8, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var LBone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var LBtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var LBbox = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBbox.castShadow = true;

  // 왼쪽 밑 itembox 그룹화
  var LBitembox = new THREE.Group();
  LBitembox.add(LBone);
  LBitembox.add(LBtwo);
  LBitembox.add(LBbox);
  LBitembox.position.set(-40, 10, 0);

  // 오른쪽 밑 itembox 생성
  var cubeGeometry = new THREE.CubeGeometry(8, 8, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var RBone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var RBtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var RBbox = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RBbox.castShadow = true;

  // 오른쪽 밑 itembox 그룹화
  var RBitembox = new THREE.Group();
  RBitembox.add(RBone);
  RBitembox.add(RBtwo);
  RBitembox.add(RBbox);
  RBitembox.position.set(40, 10, 0);

  //scene에 객체들 추가
  createLights();
  scene.add(axes);
  scene.add(doggroup);
  scene.add(plane);
  scene.add(LTitembox);
  scene.add(RTitembox);
  scene.add(LBitembox);
  scene.add(RBitembox);

  // 변수 전달
  document.getElementById("threejs_scene").appendChild(renderer.domElement);

  // 렌더링
  renderScene();

  // 렌더링 함수
  function renderScene() {
    //다리 움직임
    RFleg.rotation.x += 0.02 * Math.cos(step);
    step += 0.03;

    LFleg.rotation.x += -0.02 * Math.cos(step);
    step += 0.03;

    RBleg.rotation.x += -0.02 * Math.cos(step);
    step += 0.03;

    LBleg.rotation.x += 0.02 * Math.cos(step);
    step += 0.03;

    // headgroup.rotation.y += 0.02 * Math.cos(step);
    // step += 0.03;

    // bodygroup.rotation.y += 0.02 * Math.cos(step);
    // step += 0.03;

    // 렌더링
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
  }
}
window.onload = init();
