"use strict"

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
        pickingData.selectedObject.translateX( translation.x );
        pickingData.selectedObject.translateY( translation.y );
		const xSphere = pickingData.selectedObject.position.x;
		const ySphere = pickingData.selectedObject.position.y;
		const cylindre = sceneGraph.getObjectByName("cylindre");
		const xC = cylindre.position.x;
		const yC = cylindre.position.y;
		const norme = Math.sqrt((xSphere-xC)*(xSphere-xC) + (ySphere-yC)*(ySphere-yC));
		pickingData.selectedObject.position.set(xC+(xSphere-xC)/norme*1.5,yC+(ySphere-yC)/norme*1.5,0);
		if(ySphere<yC){
			if (xSphere<xC){
				pickingData.selectedObject.position.set(xC-1.5,yC,0);
			}
			else{
				pickingData.selectedObject.position.set(xC+1.5,yC,0);
			}
		}
		
		const levier = sceneGraph.getObjectByName("levier");
		const p1 = [xC,yC,0];
		const p2 = [pickingData.selectedObject.position.x,pickingData.selectedObject.position.y,0];
		barBetween(p2,p1,levier);

        pickingData.selectedPlane.p.add( translation );


    }

}