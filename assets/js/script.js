// Const preview variables
const fov = 75;
const near = 0.1;
const far = 1000;

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
    camera.position.z = 3;
    camera.up = new THREE.Vector3( 0, 0, 1 );
    camera.lookAt( 0, 0, 0 );
    
    return [scene, camera, renderer];
}

// Test - Carousel container should be black
var sceneCameraRenderer = initPreview("#preview");
var scene = sceneCameraRenderer[0],
    camera = sceneCameraRenderer[1],
    renderer = sceneCameraRenderer[2];

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
 * @description Returns a new 3d painting of the given image as a Three js group
 * @param {String} imageURL
 * @returns {Group} the created painting
 */
function createPainting( imageURL ) {
    let painting, imageData;

    painting = new THREE.Group();

    // TODO: get image aspect ratio
    let aspectRatio = 3/4;  // TEST
    let plane = addImagePlane( aspectRatio );
    painting.add(plane);

    // TODO: parse image data
    // let imageData;
    // let normal = generateNormal( imageData );

    // applyTexture( plane, imageData, normal );

    return painting;
}

/**
 * @description Returns a plane as the basis of a painting
 * @param {Number} aspectRatio 
 * @returns {Object3D}
 */
function addImagePlane( aspectRatio ) {
    let plane, geometry, defaultMaterial;

    geometry = new THREE.PlaneGeometry( 1, aspectRatio * 1 );
    defaultMaterial = new THREE.MeshBasicMaterial();
    plane = new THREE.Mesh( geometry, defaultMaterial );

    // Set the up axis as Z for proper rotation
    plane.up = new THREE.Vector3( 0, 0, 1 );

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
    // TODO
}

// Test - The carousel should contain a painting
let painting = createPainting( "https://www.vangoghgallery.com/img/starry_night_full.jpg" );
scene.add(painting);
renderFrame(sceneCameraRenderer);
