var filesToCache = [
    'bb-unit-threejs/bb-unit.json',
    'bb-unit-threejs/Body_AO.jpg',
    'bb-unit-threejs/Body_Diffuse.jpg',
    'bb-unit-threejs/Body_Illumination.jpg',
    'bb-unit-threejs/Body_Normal.jpg',
    'bb-unit-threejs/Body_Reflection.jpg',
    'bb-unit-threejs/Body_Specular.jpg',
    'bb-unit-threejs/Head_AO.jpg',
    'bb-unit-threejs/Head_Diffuse.jpg',
    'bb-unit-threejs/Head_Illumination.jpg',
    'bb-unit-threejs/Head_Normal.jpg',
    'bb-unit-threejs/Head_Reflection.jpg',
    'bb-unit-threejs/Head_Specular.jpg',
    'js/lib/OrbitControls.js',
    'js/lib/three.min.js',
    'sounds/1.ogg',
    'sounds/2.ogg',
    'sounds/3.ogg',
    'sounds/4.ogg',
    'sounds/5.ogg',
    'sounds/6.ogg',
    'sounds/7.ogg',
    'sounds/8.ogg',
    'sounds/9.ogg',
    'sounds/10.ogg',
    'sounds/11.ogg',
    'sounds/12.ogg',
    'sounds/13.ogg',
    'sounds/14.ogg',
    'sounds/15.ogg',
    'sounds/16.ogg',
    'sounds/17.ogg',
    'sounds/18.ogg',
    'sounds/19.ogg',
    'sounds/20.ogg',
    'fonts/Starjedi.ttf'
];

var staticCacheName = 'cache-v1';
  
self.addEventListener('install', function(event) {
event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
    return cache.addAll(filesToCache);
    })
);
});

self.addEventListener('fetch', function(e) {
e.respondWith(
    caches.match(e.request).then(function(response) {
    return response || fetch(e.request);
    })
);
});