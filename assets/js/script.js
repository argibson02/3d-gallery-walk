// Const preview variables
const fov = 75;
const near = 0.1;
const far = 1000;

/**
 * @description Initialize a Three JS Scene, camera, and renderer. Returns the scene created.
 * @param {String} elementId The jQuery selector used for the given container of the preview "#element-id"
 * 
 * @returns {Array} [scene, camera, renderer]
 */
function initPreview( elementId ) {
    let scene, camera, renderer;

    let containerWidth = $( elementId ).width();
    let containerHeight = $( elementId ).height();

    console.log(containerWidth + ", " + containerHeight);

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

}

initPreview("#preview");