import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry1 = new THREE.TorusGeometry(10, 3, 4, 6);
const material1 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
const torus = new THREE.Mesh(geometry1, material1);
scene.add(torus);

function addStar() {
  const geometry = new THREE.OctahedronGeometry(1, 0);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

const kevinTexture = new THREE.TextureLoader().load('imgs/kevin_zhou.jpeg');
const kevin = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: kevinTexture }));
scene.add(kevin);

kevin.position.z = -5;
kevin.position.x = 2;

const geometry2 = new THREE.IcosahedronGeometry(10, 0);
const material2 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
const icosahedron = new THREE.Mesh(geometry2, material2);
scene.add(icosahedron);

icosahedron.position.z = 30;
icosahedron.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  icosahedron.rotation.x += 0.05;
  icosahedron.rotation.y += 0.075;
  icosahedron.rotation.z += 0.05;

  kevin.rotation.y += 0.01;
  kevin.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  icosahedron.rotation.x += 0.005;
  renderer.render(scene, camera);
}

animate();
