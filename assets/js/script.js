

// Const preview variables
const fov = 75;
const near = 0.1;
const far = 1000;
const fullRotation = 500;
const ambientIntensity = 0.6; // out of 1
const directionalIntensity = 1.0;
const zoomSpeed = 0.1;

// Global Variables
var moving = false;

/**
 * @description Initialize a Three JS Scene, camera, and renderer. Returns the scene created. Note that the element must be sized BEFORE this is run.
 * @param {String} elementId The jQuery selector used for the given container of the preview "#element-id"
 * 
 * @returns {Array} [scene, camera, renderer]
 */
function initPreview( elementId ) {
    let scene, camera, renderer;

    let containerWidth = $( elementId ).width();
    let containerHeight = $( elementId ).height();

    // console.log(containerWidth + ", " + containerHeight);

    // Create the scene, camera, and renderer needed for three.js
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(       // Can also use orthagonal camera
            75,
            containerWidth / containerHeight,   // Aspect ratio
            near,
            far 
        ); 
    renderer = new THREE.WebGLRenderer();

    // Set the size of the renderer and add it to the page
    renderer.setSize( containerWidth, containerHeight );
    document.querySelector( elementId ).appendChild( renderer.domElement );

    // Move the camera to a good position and set Z as up
    camera.position.y = 3;
    camera.up = new THREE.Vector3( 0, 0, 1 );
    camera.lookAt( 0, 0, 0 );

    // Add lighting to the scene
    let ambientLight = new THREE.AmbientLight( 0xffffff, ambientIntensity );
    scene.add( ambientLight );

    let directionalLight = new THREE.DirectionalLight( 0xffffff, directionalIntensity );
    directionalLight.position.z = 3;
    directionalLight.position.y = 2;
    scene.add( directionalLight );
    
    // Return and set values for user control used later
    renderer.domElement.scene = scene;
    renderer.domElement.camera = camera;
    return [scene, camera, renderer];
}

// Test - Carousel container should be black
var sceneCameraRenderer = initPreview("#preview");
var scene = sceneCameraRenderer[0],
    camera = sceneCameraRenderer[1],
    renderer = sceneCameraRenderer[2];
console.log(renderer);

/**
 * @description Renders a new frame to the page
 * @param {Array} sceneCameraRenderer An array of the Three Scene, Camera, and Renderer
 */
function renderFrame( sceneCameraRenderer ) {
    let scene, camera, renderer;
    scene = sceneCameraRenderer[0];
    camera = sceneCameraRenderer[1];
    renderer = sceneCameraRenderer[2];

    renderer.render( scene, camera );
}

// Test - carousel container should be grey
sceneCameraRenderer[0].background = new THREE.Color( 0xCCCCCC );
renderFrame(sceneCameraRenderer);

/**
 * @description Generates a new painting based off the url and adds it to the scene
 * @param {String} imageURL 
 */
function addPainting( imageURL ) {
    // Using Jimp loader
    // jimp.read( imageURL ).then( imageData => {
    //     let painting = createPainting( imageData );
    //     scene.add(painting);
    // } );

    // Using threeJS loader
    let loader = new THREE.TextureLoader();
    loader.load(imageURL, function( texture ) {
        console.log(texture);
        let painting = createPainting(texture);
        scene.add(painting);
        renderFrame(sceneCameraRenderer);
    } );
}

/**
 * @description Returns a new 3d painting of the given image as a Three js group
 * @param {Jimp} imageData
 * @returns {Group} the created painting
 */
function createPainting( texture, normal ) {
    let painting;
    painting = new THREE.Group();
    
    let aspectRatio = texture.image.height / texture.image.width;
    let plane = addImagePlane( aspectRatio );
    painting.add(plane);

    // TODO: parse image data
    // let imageData;
    // let normal = generateNormal( imageData );
    applyTexture( plane, texture, normal );

    painting.name = "painting"

    return painting;
}

/**
 * @description Returns a plane as the basis of a painting.
 * @param {Number} aspectRatio 
 * @returns {Object3D}
 */
function addImagePlane( aspectRatio ) {
    let plane, geometry, defaultMaterial;

    geometry = new THREE.PlaneGeometry( 1, aspectRatio * 1 );
    defaultMaterial = new THREE.MeshStandardMaterial();
    plane = new THREE.Mesh( geometry, defaultMaterial );

    // Set the up axis as Z for proper rotation
    plane.up = new THREE.Vector3( 0, 0, 1 );

    plane.lookAt(0, 3, 0);

    return plane;
}

/**
 * @description Returns a frame of the given aspect ratio
 * @param {Number} aspectRatio 
 */
function addFrame( aspectRatio ) {
    let frame;
    // TODO
    return frame;
}

/**
 * @description Creates a normal map of the given image
 * @param {Array} imageData 
 */
function generateNormal( imageData ) {
    let normal;
    // TODO
    return normal;
}

/**
 * @description Applies the proper texture to the given image
 * @param {Object3D} plane 
 * @param {Array} imageData
 * @param {Array} normal 
 */
function applyTexture( plane, imageData, normal ) {
    plane.material.map = imageData;
    plane.material.color = new THREE.Color( 0xffffff );
    plane.material.needsUpdate = true;
}

// Test - The carousel should contain a painting (currently just a plane)
addPainting( "https://lh3.googleusercontent.com/AyiKhdEWJ7XmtPXQbRg_kWqKn6mCV07bsuUB01hJHjVVP-ZQFmzjTWt7JIWiQFZbb9l5tKFhVOspmco4lMwqwWImfgg=s0" );

// TODO: move this into init? or somewhere where it doesn't rely on global variables

renderer.domElement.addEventListener( "mousedown", function() {
    moving=true;
} );

renderer.domElement.addEventListener( "mousemove" , function(event) {
    if(moving) {
        //console.log(event.target);
        rotatePainting( 
            event.movementX, 
            event.movementY, 
            event.target.scene );
    }
} );

renderer.domElement.addEventListener( "mouseup", function() {
    moving=false;
} );

renderer.domElement.addEventListener( "dblclick", function(event) {
    event.target.scene.getObjectByName("painting").lookAt(0, 0, 1);
    renderFrame(sceneCameraRenderer);
} );

renderer.domElement.addEventListener( "wheel", function (event) {

    console.log(event);
    camera.zoom += zoomSpeed * -1 * Math.sign(event.deltaY);
    camera.updateProjectionMatrix(); // Must be called after changing camera parameters
    renderFrame(sceneCameraRenderer);
} );

/**
 * @description Rotates the painting object based on the pixels moved by the mouse this frame
 * @param {Number} movementX 
 * @param {Number} movementY 
 * @param {Object3D} scene 
 */
function rotatePainting(movementX, movementY, scene) {
    let painting = scene.getObjectByName("painting"); 
    let zRot = (movementX/fullRotation) * Math.PI * 2;
    let xRot = (movementY/fullRotation) * Math.PI * 2;

    painting.rotateZ(zRot);
    painting.rotateX(xRot);

    renderFrame(sceneCameraRenderer);
}

