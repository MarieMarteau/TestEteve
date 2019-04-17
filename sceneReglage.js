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
	
	

	buildEteve(sceneGraph,pickingData);
	initEteve1(sceneGraph);
	
	const plaque = sceneGraph.getObjectByName("plaque");
	const cylindreG=sceneGraph.getObjectByName("cylindreG");
	pickingData.selectableObjects=[];
	pickingData.selectableObjects.push(cylindreG);
	
}


function onKeyDown(event, pickingData, orbitControl) {
}

function onKeyUp(event, pickingData, orbitControl) {
}



function onMouseDown(event,raycaster,pickingData,screenSize,camera) {

	// Gestion du picking
    if( pickingData.enabled===true ) { // activation si la touche CTRL est enfoncée

        // Coordonnées du clic de souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;

        // Calcul d'un rayon passant par le point (x,y)
        //  c.a.d la direction formé par les points p de l'espace tels que leurs projections sur l'écran par la caméra courante soit (x,y).
        raycaster.setFromCamera(new THREE.Vector2(x,y),camera);

        // Calcul des interections entre le rayon et les objets passés en paramètres
        const intersects = raycaster.intersectObjects( pickingData.selectableObjects );

        const nbrIntersection = intersects.length;
        if( nbrIntersection>0 ) {

            // Les intersections sont classés par distance le long du rayon. On ne considère que la première.
            const intersection = intersects[0];

            // Sauvegarde des données du picking
            pickingData.selectedObject = intersection.object; // objet selectionné
            pickingData.selectedPlane.p = intersection.point.clone(); // coordonnées du point d'intersection 3D
            pickingData.selectedPlane.n = camera.getWorldDirection().clone(); // normale du plan de la caméra

            pickingData.enableDragAndDrop = true;

        }
    }

}


function onMouseUp(event,pickingData) {
    pickingData.enableDragAndDrop = false;
}

function onMouseMove( event, pickingData, screenSize, camera, sceneGraph ) {

	// Gestion du drag & drop
    if( pickingData.enableDragAndDrop===true) {

		// Coordonnées de la position de la souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;

        // Projection inverse passant du point 2D sur l'écran à un point 3D
        const selectedPoint = Vector3(x, y, 0.5 /*valeur de z après projection*/ );
        selectedPoint.unproject( camera );

        // Direction du rayon passant par le point selectionné
        const p0 = camera.position;
        const d = selectedPoint.clone().sub( p0 );

        // Intersection entre le rayon 3D et le plan de la camera
        const p = pickingData.selectedPlane.p;
        const n = pickingData.selectedPlane.n;
        // tI = <p-p0,n> / <d,n>
        const tI = ( (p.clone().sub(p0)).dot(n) ) / ( d.dot(n) );
        // pI = p0 + tI d
        const pI = (d.clone().multiplyScalar(tI)).add(p0); // le point d'intersection

        // Translation à appliquer
        const translation = pI.clone().sub( p );

        // Translation de l'objet et de la représentation visuelle
        //pickingData.selectedObject.translateX( translation.x );
        //pickingData.selectedObject.translateY( translation.y);
		
		const ressort = sceneGraph.getObjectByName("ressort");
		const tigeV = sceneGraph.getObjectByName("tigeV");
		if(tigeV.rotation.z>-Math.PI/18 && translation.x<=0){
			tigeV.rotateZ(-Math.PI/20*Math.sqrt(translation.y*translation.y + translation.x*translation.x));
			pickingData.selectedObject.translateY( Math.sqrt(translation.y*translation.y + translation.x*translation.x) );
			ressort.scale.y=ressort.scale.y *(ressort.scale.y*1.4-Math.sqrt(translation.y*translation.y + translation.x*translation.x))/(ressort.scale.y*1.4);
			
			}
		else if(tigeV.rotation.z<Math.PI/18){
			tigeV.rotateZ(Math.PI/20*Math.sqrt(translation.y*translation.y + translation.x*translation.x));
			pickingData.selectedObject.translateY( -Math.sqrt(translation.y*translation.y + translation.x*translation.x) );
			ressort.scale.y=ressort.scale.y *(ressort.scale.y*1.4+Math.sqrt(translation.y*translation.y + translation.x*translation.x))/(ressort.scale.y*1.4);
			console.log(ressort.scale.y);
		}
		
		pickingData.selectedPlane.p.add( translation );


    }

}


// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs, time,pickingData) {
	const plaque = sceneThreeJs.sceneGraph.getObjectByName("plaque");
	const tigeV = sceneThreeJs.sceneGraph.getObjectByName("tigeV");
	const ressort =sceneThreeJs.sceneGraph.getObjectByName("ressort");
	let angle = tigeV.rotation.z;
	const reduz = 1.0045;
	const reduzRess = 1.0008;

    const t = time/1000;//time in second
	/*if (pickingData.descente&&angle>-Math.PI/10 ){
		tigeV.rotateZ(-0.002);
		angle = plaque.rotation.z;
		bas.scale.y = bas.scale.y*reduz;
		bas.scale.x = bas.scale.x*reduz;
		bas.scale.z = bas.scale.z*reduz;
		ressort.scale.y = ressort.scale.y*reduzRess;
	}
	
	if (pickingData.remontee&&angle<0){
		tigeV.rotateZ(0.002);
		angle = plaque.rotation.z;
		bas.scale.y = bas.scale.y/reduz;
		bas.scale.x = bas.scale.x/reduz;
		bas.scale.z = bas.scale.z/reduz;
		ressort.scale.y = ressort.scale.y/reduzRess;
	}*/
    render(sceneThreeJs);
}







// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = sceneInit.createCamera(0,0,8);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(2.5,3,2));
	sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(-5,5,-2));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    
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
