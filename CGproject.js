function init() {
  // scene 생성
  var scene = new THREE.Scene();

  // camera 생성
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );

  camera.position.set(0, 40, 150);
  camera.lookAt(scene.position);

  // renderer 생성
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color("rgb(204,204,204)"));
  renderer.setSize(window.innerWidth, window.innerHeight);

  function createLights() {
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

    shadowLight = new THREE.DirectionalLight(0xffffff, 1);
    shadowLight.position.set(100, 200, 50);
    shadowLight.castShadow = true;

    backLight = new THREE.DirectionalLight(0xffffff, 0.1);
    backLight.position.set(-100, 200, 50);
    backLight.castShadow = true;

    scene.add(backLight);
    scene.add(light);
    scene.add(shadowLight);
  }
  // 쉐도우 맵 지정
  renderer.shadowMap.enabled = true;

  // 색상 생성
  var basecolor = new THREE.Color("rgb(255,204,153)");
  var secondcolor = new THREE.Color("rgb(204, 153, 102)");
  var thirdcolor = new THREE.Color("rgb(051, 000, 000)");
  var linecolor = new THREE.Color("rgb(153, 0,0 )");

  // 편의성을 위한 축 생성
  var axes = new THREE.AxesHelper(20);
  axes.position.set(0, 0, 0);

  // 바닥판 생성
  var planeGeometry = new THREE.PlaneGeometry(100, 200);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(102,102,120)",
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

  // 귀 생성
  var cubeGeometry = new THREE.CubeGeometry(2, 2, 1.5);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });

  var Lear = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var Rear = new THREE.Mesh(cubeGeometry, cubeMaterial);

  Lear.position.set(-2, 24.5, 10);
  Lear.castShadow = true;

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

  // 눈 생성
  var sphereGeometry = new THREE.SphereGeometry(0.5, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var Leye = new THREE.Mesh(sphereGeometry, sphereMaterial);
  var Reye = new THREE.Mesh(sphereGeometry, sphereMaterial);

  Leye.position.set(-1.5, 21, 10.5);
  Leye.castShadow = true;

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
  var cubeGeometry = new THREE.CubeGeometry(4, 3, 2);
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

  // 다리 생성
  var cubeGeometry = new THREE.CubeGeometry(2.5, 8, 2.5);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: secondcolor,
  });
  var LFleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var RFleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var LBleg = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var RBleg = new THREE.Mesh(cubeGeometry, cubeMaterial);

  //다리 위치  지정
  LFleg.position.set(-7, 6, 6);
  LFleg.castShadow = true;

  LBleg.position.set(-7, 6, -6);
  LBleg.castShadow = true;

  RFleg.position.set(7, 6, 6);
  RFleg.castShadow = true;

  RBleg.position.set(7, 6, -6);
  RBleg.castShadow = true;

  // 발 생성
  var cubeGeometry = new THREE.CubeGeometry(3, 1.5, 2.5);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: thirdcolor,
  });
  var LFfoot = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var LBfoot = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var RFfoot = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var RBfoot = new THREE.Mesh(cubeGeometry, cubeMaterial);

  //발 위치 지정
  LFfoot.position.set(-7, 1, 6);
  LFfoot.castShadow = true;

  LBfoot.position.set(-7, 1, -6);
  LBfoot.castShadow = true;

  RFfoot.position.set(7, 1, 6);
  RFfoot.castShadow = true;

  RBfoot.position.set(7, 1, -6);
  RBfoot.castShadow = true;

  // 발과 다리 그룹화
  var LFleggroup = new THREE.Group();
  LFleggroup.add(LFleg);
  LFleggroup.add(LFfoot);

  var LBleggroup = new THREE.Group();
  LBleggroup.add(LBleg);
  LBleggroup.add(LBfoot);

  var RFleggroup = new THREE.Group();
  RFleggroup.add(RFleg);
  RFleggroup.add(RFfoot);

  var RBleggroup = new THREE.Group();
  RBleggroup.add(RBleg);
  RBleggroup.add(RBfoot);

  // 다리 그룹화
  var leggroup = new THREE.Group();
  leggroup.add(LFleggroup);
  leggroup.add(LBleggroup);
  leggroup.add(RFleggroup);
  leggroup.add(RBleggroup);

  // 꼬리 생성
  var cubeGeometry = new THREE.CubeGeometry(3, 3, 3);
  var tail = new THREE.Mesh(cubeGeometry, cubeMaterial);
  tail.position.set(0, 11.5, -10);
  tail.castShadow = true;

  //몸통그룹
  var bodygroup = new THREE.Group();
  bodygroup.add(neck);
  bodygroup.add(body);
  bodygroup.add(leggroup);
  bodygroup.add(tail);

  // 캐릭터 그룹
  var doggroup = new THREE.Group();
  doggroup.add(headgroup);
  doggroup.add(bodygroup);

  // 선물BOX

  // 왼쪽 위 itembox 생성
  var cubeGeometry = new THREE.CubeGeometry(8, 8, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: linecolor,
  });
  var LTone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LTone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var LTtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LTtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(255,204,204 )",
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
    color: linecolor,
  });
  var RTone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RTone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var RTtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RTtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(255, 255,204 )",
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
    color: linecolor,
  });
  var LBone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var LBtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(200, 153,102 )",
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
    color: linecolor,
  });
  var RBone = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBone.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(2, 8, 8);
  var RBtwo = new THREE.Mesh(cubeGeometry, cubeMaterial);
  LBtwo.castShadow = true;

  var cubeGeometry = new THREE.CubeGeometry(7.9, 7.9, 7.9);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(153, 204, 204 )",
  });
  var RBbox = new THREE.Mesh(cubeGeometry, cubeMaterial);
  RBbox.castShadow = true;

  // 클릭 이벤트를 위한 객체
  var LTmesh = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial()
  );
  LTmesh.name = "Box1";
  LTmesh.position.set(-40, 40, 0);

  // 오른쪽 밑 itembox 그룹화
  var RBitembox = new THREE.Group();
  RBitembox.add(RBone);
  RBitembox.add(RBtwo);
  RBitembox.add(RBbox);
  RBitembox.position.set(40, 10, 0);

  // 선택을 위한 객체
  var LTselect = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2, 2),
    new THREE.MeshStandardMaterial({
      color: linecolor,
    })
  );
  LTselect.name = "Select1";
  LTselect.position.set(-40, 30, 0);

  var LBselect = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2, 2),
    new THREE.MeshStandardMaterial({
      color: linecolor,
    })
  );
  LBselect.name = "Select2";
  LBselect.position.set(-40, 2, 0);

  var RTselect = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2, 2),
    new THREE.MeshStandardMaterial({
      color: linecolor,
    })
  );
  RTselect.name = "Select3";
  RTselect.position.set(40, 30, 0);

  var RBselect = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2, 2),
    new THREE.MeshStandardMaterial({
      color: linecolor,
    })
  );
  RBselect.name = "Select4";
  RBselect.position.set(40, 2, 0);

  //scene에 객체들 추가
  createLights();
  scene.add(axes);
  scene.add(doggroup);
  scene.add(plane);
  scene.add(LTitembox);
  scene.add(RTitembox);
  scene.add(LBitembox);
  scene.add(RBitembox);
  scene.add(LTmesh);
  scene.add(LTselect);
  scene.add(LBselect);
  scene.add(RTselect);
  scene.add(RBselect);

  // 움직임을 위한 변수
  var legmove = 0;
  var dogmove = 0;

  // 속도 조절
  var controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
  })();

  // 전달
  document.getElementById("threejs_scene").appendChild(renderer.domElement);

  var framesPerSecond = 60;
  var speed = 0;

  var animate = function () {
    // 프레임 처리
    setTimeout(function () {
      requestAnimationFrame(animate);
    }, 1000 / framesPerSecond);

    if (speed > 0) {
      doggroup.rotation.y += speed;
      speed -= 0.001;
    }

    //다리 움직임
    legmove += 0.05;
    LFleggroup.rotation.x += -0.005 * Math.cos(legmove);
    LBleggroup.rotation.x += 0.005 * Math.cos(legmove);
    RFleggroup.rotation.x += 0.005 * Math.cos(legmove);
    RBleggroup.rotation.x += -0.005 * Math.cos(legmove);

    // 몸통움직임
    dogmove += controls.bouncingSpeed;
    doggroup.position.y = 1 + Math.cos(dogmove);

    // 선물박스 움직임
    LTitembox.rotation.y += controls.rotationSpeed;
    LTitembox.rotation.z += controls.rotationSpeed;

    LBitembox.rotation.y = 1 + controls.rotationSpeed;
    LBitembox.rotation.z += controls.rotationSpeed;

    RTitembox.rotation.y = 2 + controls.rotationSpeed;
    RTitembox.rotation.z += controls.rotationSpeed;

    RBitembox.rotation.y = 3 + controls.rotationSpeed;
    RBitembox.rotation.z += controls.rotationSpeed;

    // 랜더링을 수행합니다.
    renderer.render(scene, camera);
  };

  animate();

  // 마우스 클릭 이벤트를 위한 함수
  function onDocumentMouseDown(event) {
    event.preventDefault();
    var mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      if (intersects[0].object.name == "Box1") {
        speed += 0.05;
      } else if (intersects[0].object.name == "Select1") {
        if (confirm("1번 선물을 선택하시겠습니까?")) {
          alert("강아지가 선물을 좋아합니다!");
          alert("다시 하시겠습니까?");
        }
      } else if (intersects[0].object.name == "Select2") {
        if (confirm("2번 선물을 선택하시겠습니까?")) {
          alert("강아지가 선물을 싫어합니다!");
          alert("다시 하시겠습니까?");
        }
      } else if (intersects[0].object.name == "Select3") {
        if (confirm("3번 선물을 선택하시겠습니까?")) {
          alert("강아지가 선물을 싫어합니다!");
          alert("다시 하시겠습니까?");
        }
      } else if (intersects[0].object.name == "Select4") {
        if (confirm("4번 선물을 선택하시겠습니까?")) {
          alert("강아지가 선물을 싫어합니다!");
          alert("다시 하시겠습니까?");
        }
      }
    }
  }

  document.addEventListener("mousedown", onDocumentMouseDown, false);
}

window.onload = init();
