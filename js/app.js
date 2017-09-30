let scene, camera, renderer;
let sphere;
let addLight = false;

function init(){
    scene = new THREE.Scene();

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    
    // configure the renderer for the scene
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(WIDTH,HEIGHT);
    document.body.appendChild(renderer.domElement);

    // Create the camera
    camera = new THREE.PerspectiveCamera(45,WIDTH/HEIGHT,0.1,20000);
    camera.position.set(300,150,0);
    
    scene.add(camera);

    // Window Resize
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      });

    
    // set the lighting
    const alight= new THREE.AmbientLight(0xFFFFFF);
    scene.add(alight);

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // load bb8
    const objectLoader = new THREE.ObjectLoader();
    objectLoader.load("bb-unit-threejs/bb-unit.json",function(obj){
        scene.add(obj);
        obj.rotateY(270*Math.PI/180);
        obj.rotateZ(5*Math.PI/180);

        obj.position.y = -50;
        
        
        var geometry = new THREE.SphereGeometry( 32, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        sphere = new THREE.Mesh( geometry, material );
        sphere.scale.set(0.03,0.03,0.03);
        sphere.position.set(35,40,4);
        
        setTimeout(() => {
            addLight = true;
        },3000)
    });

}

function animate() {
    
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    if(addLight){
        addLight = false;
        scene.add( sphere );
    }

    // Render the scene.
    renderer.render(scene, camera);
    controls.update();

}

window.onload = function(){
    init();
    animate();
};
