window.addEventListener('load', init);
let scene;
let camera;
let renderer;
let sceneObjects = [];
let raycaster;
let mouse;

function init() {
    scene = new THREE.Scene();
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    adjustLighting();
    addBasicCube();
    animationLoop()
}

function adjustLighting() {
    let pointLight = new THREE.DirectionalLight(0xdddddd);
    pointLight.position.set(-5, -3, 3);
    scene.add(pointLight);

    let ambientLight = new THREE.AmbientLight(0x505050);
    scene.add(ambientLight)
}

function addBasicCube() {

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});

    // let geometry = new THREE.SphereGeometry(1,24,24);
    // let material = new THREE.MeshLambertMaterial();

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    scene.add(mesh);
    sceneObjects.push(mesh)
}

function animationLoop() {
    window.addEventListener('mousemove', onMouseMove);

    renderer.render(scene, camera);

    for(let object of sceneObjects) {
        object.rotation.y += 0.01;
    }

    requestAnimationFrame(animationLoop)
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
    }
}
