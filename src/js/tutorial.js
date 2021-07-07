var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
// let mesh = new THREE.Mesh(geometry, material);
//
// scene.add(mesh);

meshX = -10;
for(var i = 0; i<15;i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX += 1;
}
// ways to change the position of the object
// mesh.position.set(2,-2,2);
// mesh.rotation.set(45,0,0);
// mesh.scale.set(1,2,1);
// mesh.position.x = 2;
// mesh.position.y = 2;
// mesh.position.z = -2;

let light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10,0,25);

scene.add(light);
let render = function() {
    requestAnimationFrame(render);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.z += 0.01;

    renderer.render(scene, camera);
};


function onMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xFF0000);
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.Pi*.5, ease: Expo.easeOut}, "=-1.5");
    }

}
render();

window.addEventListener('mousemove', onMouseMove)
