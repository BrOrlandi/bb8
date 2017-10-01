let scene, camera, renderer;
let sphere;
let sound;
let addLight = false;
let loading = true;
let bb8;

const audios = [];


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
        console.log("BB-8 Loaded");
        bb8 = obj;

        obj.rotateY(270*Math.PI/180);
        obj.rotateZ(5*Math.PI/180);

        obj.position.y = -50;

        scene.add(obj);        
        
        var geometry = new THREE.SphereGeometry( 32, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        sphere = new THREE.Mesh( geometry, material );
        sphere.scale.set(0.03,0.03,0.03);
        sphere.position.set(35,40,4);
        
        setTimeout(() => {
            addLight = true;
        },3000)
    });

    // audio
    var listener = new THREE.AudioListener();
    camera.add( listener );

    sound = new THREE.Audio( listener );
    
    var audioLoader = new THREE.AudioLoader();
    
    //Load sounds
    for(let i=1;i<21;i++){
        audioLoader.load( 'sounds/'+i+'.ogg', function( buffer ) {
            audios.push(buffer);
        });
    }

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentMouseDown, false );

}

function animate() {
    
    if(addLight){
        addLight = false;
        scene.add( sphere );
    }

    // Render the scene.
    renderer.render(scene, camera);
    controls.update();

    if(loading && bb8 && bb8.visible){
        console.log("BB-8 Rendered");
        loading = false;
        document.querySelector('#center').style.display = 'none';
    }

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

}

window.onload = function(){
    init();
    animate();
};

function onDocumentMouseDown( event ) {
    // event.preventDefault();
    if(!loading){
        sound.setBuffer(audios[Math.floor(Math.random()*20)]);
        sound.play();
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
    .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
        console.log('Service worker registration failed, error:', error);
    });
}