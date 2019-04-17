"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null
    };

    // Les données associées au picking
    const pickingData = {
        descente:false,
		remontee:false,
		enabled: true,		// Mode picking en cours ou désactivé (CTRL enfoncé)
        enableDragAndDrop: false, // Drag and drop en cours ou désactivé
        selectableObjects: [],    // Les objets selectionnables par picking
        selectedObject: null,     // L'objet actuellement selectionné
        selectedPlane: {p:null,n:null}, // Le plan de la caméra au moment de la selection. Plan donné par une position p, et une normale n.
    }


    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph, pickingData);

    // *************************** //
    // Creation d'un lanceur de rayon (ray caster) de Three.js pour le calcul de l'intersection entre un objet et un rayon
    // *************************** //
    const raycaster = new THREE.Raycaster();

    // *************************** //
    // Fonction de rappels
    // *************************** //

    // Récupération de la taille de la fenetre en tant que variable à part
    const screenSize = {
        w:sceneThreeJs.renderer.domElement.clientWidth,
        h:sceneThreeJs.renderer.domElement.clientHeight
    };

    // Fonction à appeler lors du clic de la souris: selection d'un objet
    //  (Création d'un wrapper pour y passer les paramètres souhaités)
    const wrapperMouseDown = function(event) { onMouseDown(event,raycaster,pickingData,screenSize,sceneThreeJs.camera); };
    document.addEventListener( 'mousedown', wrapperMouseDown );

    const wrapperMouseUp = function(event) { onMouseUp(event,pickingData); };
    document.addEventListener( 'mouseup', wrapperMouseUp );

    // Fonction à appeler lors du déplacement de la souris: translation de l'objet selectionné
    const wrapperMouseMove = function(event) { onMouseMove(event, pickingData, screenSize, sceneThreeJs.camera,sceneThreeJs.sceneGraph) };
    document.addEventListener( 'mousemove', wrapperMouseMove );

    // Fonction de rappels pour le clavier: activation/désactivation du picking par CTRL
    const wrapperKeyDown = function(event) { onKeyDown(event,pickingData,sceneThreeJs.controls); };
    const wrapperKeyUp = function(event) { onKeyUp(event,pickingData,sceneThreeJs.controls); };
    document.addEventListener( 'keydown', wrapperKeyDown );
    document.addEventListener( 'keyup', wrapperKeyUp );

    // *************************** //
    // Lancement de l'animation
    // *************************** //
    animationLoop(sceneThreeJs,pickingData);
}

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph, pickingData) {
	const textures = getTexturesFromAtlasFile( "sky.jpg", 6 );
	const materials = [];
	for ( let i = 0; i < 6; i ++ ) {
		materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );
	}
	const skyBox = new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 100, 100 ), materials );
	skyBox.name="skyBox";
	skyBox.geometry.scale( 1, 1, - 1 );
	sceneGraph.add( skyBox );

	buildAvion(sceneGraph, pickingData);
	const aile1 = sceneGraph.getObjectByName("aile1");
	aile1.position.set(-1,0,0);
	
}



// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs, time,pickingData) {
	
	const t = time/1000;//time in second
	
	const skyBox = sceneThreeJs.sceneGraph.getObjectByName("skyBox");
	const aile1 = sceneThreeJs.sceneGraph.getObjectByName("aile1");
	
	if(-Math.PI/6<Math.pow(1.5,t)*0.01*Math.sin(t) && Math.pow(1.5,t)*0.01*Math.sin(t)< Math.PI/6){
	
		skyBox.rotateY(-0.3/Math.pow(1.7,t));
		aile1.rotation.x = Math.pow(1.5,t)*0.01*Math.sin(t);
	}
	else{
		aile1.position.y -= 0.1;
		aile1.position.y -= 0.1;
		aile1.rotateZ(-0.02);
	}
	
    render(sceneThreeJs);
}







// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = sceneInit.createCamera(0,0,10);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(1,2,2));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    //sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera );

    window.addEventListener('resize', function(event){onResize(sceneThreeJs);}, false);
}

// Fonction de gestion d'animation
function animationLoop(sceneThreeJs,pickingData) {

    // Fonction JavaScript de demande d'image courante à afficher
    requestAnimationFrame(

        // La fonction (dite de callback) recoit en paramètre le temps courant
        function(timeStamp){
            animate(sceneThreeJs,timeStamp,pickingData); // appel de notre fonction d'animation
            animationLoop(sceneThreeJs,pickingData); // relance une nouvelle demande de mise à jour
        }

    );

}

// Fonction appelée lors du redimensionnement de la fenetre
function onResize(sceneThreeJs) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneThreeJs.camera.aspect = width / height;
    sceneThreeJs.camera.updateProjectionMatrix();

    sceneThreeJs.renderer.setSize(width, height);
}

function Vector3(x,y,z) {
    return new THREE.Vector3(x,y,z);
}

function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}

// Creation de repères visuels indiquants les axes X,Y,Z entre [-1,1]
function initFrameXYZ( sceneGraph ) {

    const rCylinder = 0.01;
    const rCone = 0.04;
    const alpha = 0.1;

    // Creation des axes
    const axeXGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(1,0,0), rCylinder, rCone, alpha);
    const axeX = new THREE.Mesh(axeXGeometry, MaterialRGB(1,0,0));

    const axeYGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(0,1,0), rCylinder, rCone, alpha);
    const axeY = new THREE.Mesh(axeYGeometry, MaterialRGB(0,1,0));

    const axeZGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(0,0,1), rCylinder, rCone, alpha);
    const axeZ = new THREE.Mesh(axeZGeometry, MaterialRGB(0,0,1));

    axeX.receiveShadow = true;
    axeY.receiveShadow = true;
    axeZ.receiveShadow = true;

    sceneGraph.add(axeX);
    sceneGraph.add(axeY);
    sceneGraph.add(axeZ);

    // Sphère en (0,0,0)
    const rSphere = 0.05;
    const sphereGeometry = primitive.Sphere(Vector3(0,0,0), rSphere);
    const sphere = new THREE.Mesh(sphereGeometry, MaterialRGB(1,1,1));
    sphere.receiveShadow = true;
    sceneGraph.add(sphere);



    // Creation des plans
    const L = 1;
    const planeXYGeometry = primitive.Quadrangle(Vector3(0,0,0), Vector3(L,0,0), Vector3(L,L,0), Vector3(0,L,0));
    const planeXY = new THREE.Mesh(planeXYGeometry, MaterialRGB(1,1,0.7));

    const planeYZGeometry = primitive.Quadrangle(Vector3(0,0,0),Vector3(0,L,0),Vector3(0,L,L),Vector3(0,0,L));
    const planeYZ = new THREE.Mesh(planeYZGeometry,MaterialRGB(0.7,1,1));

    const planeXZGeometry = primitive.Quadrangle(Vector3(0,0,0),Vector3(0,0,L),Vector3(L,0,L),Vector3(L,0,0));
    const planeXZ = new THREE.Mesh(planeXZGeometry,MaterialRGB(1,0.7,1));

    planeXY.receiveShadow = true;
    planeYZ.receiveShadow = true;
    planeXZ.receiveShadow = true;


    sceneGraph.add(planeXY);
    sceneGraph.add(planeYZ);
    sceneGraph.add(planeXZ);

}


function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) { // permet de découper une image
	let textures = [];
	for ( let i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}
	let imageObj = new Image();
	imageObj.onload = function () {
		let canvas, context;
		let tileWidth = imageObj.height;
		for ( let i = 0; i < textures.length; i ++ ) {
			canvas = document.createElement( 'canvas' );
			context = canvas.getContext( '2d' );
			canvas.height = tileWidth;
			canvas.width = tileWidth;
			context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
			textures[ i ].image = canvas;
			textures[ i ].needsUpdate = true;
		}
	};
	imageObj.src = atlasImgUrl;
	return textures;
}
