(function () {
  init();
})();
function init() {
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));

  renderer.setSize(window.innerWidth, window.innerHeight);
  // 쉐도우 맵
  renderer.shadowMap.enabled = true;

  var axes = new THREE.AxesHelper(20);

  axes.position.set(0, 0, 0);
  var planeGeometry = new THREE.PlaneGeometry(50, 50);

  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;

  plane.position.set(0, 0, 0);
  //그림자를 받음
  plane.receiveShadow = true;

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);

  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });

  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.set(0, 10, 0);
  //그림자 생성 오브젝트
  sphere.castShadow = true;

  var spotLight = new THREE.SpotLight(0xffffff);

  spotLight.position.set(0, 50, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(5120, 5120);

  scene.add(axes);

  scene.add(sphere);

  scene.add(plane);

  scene.add(spotLight);

  camera.position.set(-30, 40, 30);

  camera.lookAt(scene.position);

  document.getElementById("threejs_scene").appendChild(renderer.domElement);

  renderer.render(scene, camera);
}
