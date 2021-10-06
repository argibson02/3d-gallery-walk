

// Const preview variables
const fov = 75;
const near = 0.1;
const far = 1000;
const fullRotation = 500;
const ambientIntensity = 0.6; // out of 1
const directionalIntensity = 1.0;
const zoomSpeed = 0.1;
const normalStrength = 1.5;

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
    let texturePromise = loader.load( imageURL );
    let normalPromise = jimp.read( imageURL );
    Promise.all( [
        texturePromise,
        normalPromise
    ] ).then( function( data ) {
        console.log( data );
        let normal = generateNormal( data[1] );
        let displacement = generateDisplacement( data[1] );
        let painting = createPainting( data[0], normal, displacement ); // texture, normal
        
        scene.add(painting);
        renderFrame(sceneCameraRenderer);
    } );
}

/**
 * @description Returns a new 3d painting of the given image as a Three js group
 * @param {Jimp} imageData
 * @returns {Group} the created painting
 */
function createPainting( texture, normal, displacement ) {
    let painting;
    painting = new THREE.Group();
    let aspectRatio = texture.image.height / texture.image.width;
    let plane = addImagePlane( aspectRatio );
    painting.add(plane);

    // TODO: parse image data
    // let imageData;
    applyTexture( plane, texture, normal, displacement );

    painting.name = "painting";

    return painting;
}

/**
 * @description Returns a plane as the basis of a painting.
 * @param {Number} aspectRatio 
 * @returns {Object3D}
 */
function addImagePlane( aspectRatio ) {
    let plane, geometry, defaultMaterial;

    geometry = new THREE.PlaneGeometry( 1, aspectRatio * 1, 1000, Math.floor(1000 * aspectRatio) );
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
    let normalData = [];

    // Convert the RGBA array into a more workable format
    let imageDataPixelArray = RGBAtoRGBPixelArray( imageData.bitmap.data, imageData.bitmap.width );
    console.log(imageDataPixelArray[0].length * imageDataPixelArray.length);
    console.log(imageData.bitmap.data.length / 4);
    console.log(imageDataPixelArray.length); // Rows
    console.log(imageDataPixelArray[0].length); // Columns
    // For each pixel besides the pixels on the edges...
    for(let row=1; row<imageDataPixelArray.length-1; row++) {
        normalData.push([])
        for(let column=1; column<imageDataPixelArray[row].length-1; column++) {
            // Convert the image to greyscale to be used as a crude height map
            converPixelToGrayscale( imageDataPixelArray[row][column] );

            // Calculate the partial derivatives of the color change by checking against left/top adjacent pixel
            // Uses the Sobel operator, read more at: https://en.wikipedia.org/wiki/Sobel_operator
            let topLeft =       imageDataPixelArray[row-1][column-1][0] / 255;
            let top =           imageDataPixelArray[row-1][column][0] / 255;
            let topRight =      imageDataPixelArray[row-1][column+1][0] / 255;
            let right =         imageDataPixelArray[row][column+1][0] / 255;
            let bottomRight =   imageDataPixelArray[row+1][column+1][0] / 255;
            let bottom =        imageDataPixelArray[row+1][column][0] / 255;
            let bottomLeft =    imageDataPixelArray[row+1][column-1][0] / 255;
            let left =          imageDataPixelArray[row][column-1][0] / 255;
            
            
            let derivativeX = (topRight + 2*right + bottomRight) - (topLeft + 2*left + bottomLeft);
            let derivativeY = (topLeft + 2*top + topRight) - (bottomLeft + 2*bottom + bottomRight);
            let derivativeZ = 1.0 / normalStrength;

            let normalVector = new THREE.Vector3(derivativeX, derivativeY, derivativeZ).normalize();

            // Convert derivatives into RGB pixels and add them to the normal
            normalData[row-1].push([
                normalVector.x * 255,
                normalVector.y * 255,
                normalVector.z * 255
            ]);
        }
    }

    // Add top and left rows of pixels to maintain image size
    for( row=0; row < normalData.length; row++ ) {
        normalData[row].unshift(normalData[row][0]);
        normalData[row].push(normalData[row][normalData[row].length-1]);
    }
    normalData.unshift(normalData[0]);
    normalData.push(normalData[normalData.length-1])

    let normalRGB = pixelArraytoRGB(normalData);
    console.log(normalRGB);
    let normal = new THREE.DataTexture( 
        normalRGB, 
        imageData.bitmap.width,
        imageData.bitmap.height,
        THREE.RGBAFormat,
        THREE.UnsignedByteType,
        THREE.UVMapping );
    normal.needsUpdate = true;
    normal.flipY = true;

    console.log(normal);
    
    return normal;
}

/**
 * @description converts RGBA to a 3d array of pixels
 * @param {Array} data 
 * @param {Number} width 
 * @returns {Array}
 */
function RGBAtoRGBPixelArray( data, width ) {
    out = [];

    for(row=0; row<data.length/width/4; row++) {
        out.push([]);
        for(column=0; column<width; column++) {
            i = row * width * 4 + column * 4
            out[row].push([
                data[i],
                data[i+1],
                data[i+2]
            ]);
        }
    }

    return out;
}

/**
 * @description converts a 3d pixel array to RBG format
 * @param {Array} data 
 * @returns {Array}
 */
function pixelArraytoRGB( data ) {
    let out = new Uint8Array( data.length * data[0].length * 4);
    for( row=0; row<data.length; row++ ) {
        for( column=0; column<data[row].length; column++ ) {
            let i = (row * data[0].length * 4) + (column * 4)
            out[i] = data[row][column][0];
            out[i+1] = data[row][column][1];
            out[i+2] = data[row][column][2];
            out[i+3] = 255;
        }
    }

    return out;
}

/**
 * @description Converts a single rgb pixel array to grayscale
 * @param {Array} pixel 
 */
function converPixelToGrayscale( pixel ) {
    let avg = (pixel[0] + pixel[1] + pixel[2]) / 3;
    pixel[0] = avg;
    pixel[1] = avg;
    pixel[2] = avg;
}

/**
 * @description Applies the proper texture to the given image
 * @param {Object3D} plane 
 * @param {Array} imageData
 * @param {Array} normal 
 */
function applyTexture( plane, imageData, normal, displacement ) {
    plane.material.map = imageData;
    plane.material.normalMap = normal;
    plane.material.normalScale.x = .3;
    plane.material.normalScale.y = .3;
    plane.material.displacementMap = displacement;
    plane.material.displacementScale = 0.005;
    plane.material.color = new THREE.Color( 0xffffff );
    plane.material.needsUpdate = true;
}

function generateDisplacement( imageData ) {
    let displacement = new THREE.DataTexture( 
        imageData.greyscale().bitmap.data, 
        imageData.bitmap.width,
        imageData.bitmap.height,
        THREE.RGBAFormat,
        THREE.UnsignedByteType,
        THREE.UVMapping );
    displacement.flipY = true;
    displacement.needsUpdate = true;
    return displacement;
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
