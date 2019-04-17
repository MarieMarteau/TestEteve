"use strict";

function buildEteve(sceneGraph,pickingData){
	const a = 0.1;
	const b = 0.5;
	const L = 2;
	const r = 2;
	const e = 0.4;
	const lt = 0.4; //longueur triangle
	const largT = 0.1; // largeur des tiges
	const epT = 0.06; // largeur des tiges
	const hTigeV = 2;
	const lPlaque = 0.7;

        // Corps
   let pts1=[];

    pts1.push(new THREE.Vector2(0,0));
    pts1.push(new THREE.Vector2(a,0));
    pts1.push(new THREE.Vector2(a, -b));
    pts1.push(new THREE.Vector2(0, -b));
    const shape1 = new THREE.Shape( pts1 );
	
    let Points1 = [];
	Points1.push( new THREE.Vector3(L,-r,0));
	Points1.push( new THREE.Vector3(0,-(r-e)/2-e,0));
	Points1.push( new THREE.Vector3(-L,-e,0));
	const iter2 = 5;
	const angle2 = Math.PI/iter2
	for(let k=1;k<=iter2;k++){
		Points1.push( new THREE.Vector3(-L-e*Math.sin(k*angle2),-e*Math.cos(k*angle2),0));
	}
	Points1.push( new THREE.Vector3(0,(r-e)/2+e,0));
	Points1.push( new THREE.Vector3(L,r,0));
    const Spline1 =  new THREE.CatmullRomCurve3( Points1 );

    const extrudeSettings1 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: Spline1
};

    const extrudeGeometry1 = new THREE.ExtrudeBufferGeometry( shape1, extrudeSettings1 );
    const extrudeObject1 = new THREE.Mesh( extrudeGeometry1, MaterialRGB(0.9,0.9,0.9) ) ;
    extrudeObject1.material.side = THREE.DoubleSide; 
	extrudeObject1.name = "fourche"; 
    sceneGraph.add( extrudeObject1 );
	
	// Triangle
    let pts2=[];
    pts2.push(new THREE.Vector2(0,-L));
    pts2.push(new THREE.Vector2(lt*(r-e)/2/L+e,-lt));
    pts2.push(new THREE.Vector2(-lt*(r-e)/2/L-e,-lt));
    const shape2 = new THREE.Shape( pts2 );
	
    let Points2 = [];
	Points2.push( new THREE.Vector3(0,0,-a));
	Points2.push( new THREE.Vector3(0,0,0));
    const Spline2 =  new THREE.CatmullRomCurve3( Points2 );

    const extrudeSettings2 = {
	steps: 50,
	bevelEnabled: false,
	extrudePath: Spline2
};

    const extrudeGeometry2 = new THREE.ExtrudeBufferGeometry( shape2, extrudeSettings2 );
    const extrudeObject2 = new THREE.Mesh( extrudeGeometry2, MaterialRGB(0.9,0.9,0.9) ) ;
    extrudeObject2.material.side = THREE.DoubleSide; 
    sceneGraph.add( extrudeObject2 );
	extrudeObject2.name = "triangle"; 
	
	// Triangle2
    let pts6=[];
    pts6.push(new THREE.Vector2(0,-L));
    pts6.push(new THREE.Vector2(lt*(r-e)/2/L+e,-lt));
    pts6.push(new THREE.Vector2(-lt*(r-e)/2/L-e,-lt));
    const shape6 = new THREE.Shape( pts6 );
	
    let Points6 = [];
	Points6.push( new THREE.Vector3(0,0,-a));
	Points6.push( new THREE.Vector3(0,0,0));
    const Spline6 =  new THREE.CatmullRomCurve3( Points6 );

    const extrudeSettings6 = {
	steps: 50,
	bevelEnabled: false,
	extrudePath: Spline6
};

    const extrudeGeometry6 = new THREE.ExtrudeBufferGeometry( shape6, extrudeSettings6 );
    const extrudeObject6 = new THREE.Mesh( extrudeGeometry6, MaterialRGB(108/258,58/258,58/258) ) ;
    extrudeObject6.material.side = THREE.DoubleSide;
    extrudeObject6.position.set(-e/2,0,0.005);;
    extrudeObject2.add( extrudeObject6 );
	
	
	
	 // Arc cercle
    let pts3=[];

    pts3.push(new THREE.Vector2(0,0));
    pts3.push(new THREE.Vector2(-2*a,0));
    pts3.push(new THREE.Vector2(-a, -b));
    pts3.push(new THREE.Vector2(0, -b));
    const shape3 = new THREE.Shape( pts3 );
	
    let Points3 = [];
	const iter3 = 5;
	const R = Math.sqrt(r*r+4*L*L);
	const angleDeb = Math.asin(r/R);
	const angle3 = 2*angleDeb/iter3;
	for(let k=0;k<=iter3;k++){
		Points3.push( new THREE.Vector3(-L+R*Math.cos(-k*angle3+angleDeb),R*Math.sin(-k*angle3+angleDeb),0));
	}
    const Spline3 =  new THREE.CatmullRomCurve3( Points3 );

    const extrudeSettings3 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: Spline3
};

    const extrudeGeometry3 = new THREE.ExtrudeBufferGeometry( shape3, extrudeSettings3);
    const extrudeObject3 = new THREE.Mesh( extrudeGeometry3, MaterialRGB(0.9,0.9,0.9) ) ;
    extrudeObject3.material.side = THREE.DoubleSide; 
	extrudeObject3.position.set(0,0,-a);
	extrudeObject3.name = "arc"; 
    sceneGraph.add( extrudeObject3 );
	
	// Marque rouge
    let pts4=[];
	const diff = 0.001;
    pts4.push(new THREE.Vector2(0,0));
    pts4.push(new THREE.Vector2(-2*a-diff,0));
    pts4.push(new THREE.Vector2(-a - diff, -b - diff));
    pts4.push(new THREE.Vector2(0, -b - diff));
    const shape4 = new THREE.Shape( pts4 );
	
    let Points4 = [];
	Points4.push( new THREE.Vector3(-L+R*Math.cos(Math.PI/100),R*Math.sin(Math.PI/100),0));
	Points4.push( new THREE.Vector3(-L+R,0,0));
	Points4.push( new THREE.Vector3(-L+R*Math.cos(-Math.PI/100),R*Math.sin(-Math.PI/100),0));
    const Spline4 =  new THREE.CatmullRomCurve3( Points4 );

    const extrudeSettings4 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: Spline4
};

    const extrudeGeometry4 = new THREE.ExtrudeBufferGeometry( shape4, extrudeSettings4);
    const extrudeObject4 = new THREE.Mesh( extrudeGeometry4, MaterialRGB(1.0,0.0,0.0) ) ;
    extrudeObject4.material.side = THREE.DoubleSide; 
	extrudeObject4.position.set(0,0,0);
	extrudeObject4.name = "marque";
    extrudeObject3.add( extrudeObject4 );
	
	// tige verticale
	const tigeVgeometry = new THREE.BoxGeometry( largT,hTigeV,epT );
	const tigeV = new THREE.Mesh( tigeVgeometry, MaterialRGB(0,0,0) ) ;
	tigeV.position.set(-L,0,epT/2);
	tigeV.name = "tigeV"; 
	sceneGraph.add( tigeV );
	
	// plaque
	const plaqueGeometry = new THREE.BoxGeometry( epT,lPlaque,lPlaque );
	const plaque = new THREE.Mesh( plaqueGeometry, MaterialRGB(0.9,0.9,0.9) ) ;
	plaque.position.set(-largT+epT/2,hTigeV/2,0);
	plaque.name = "plaque"; 
	tigeV.add( plaque );
	
	// tige horizontale
	const tigeHgeometry = new THREE.BoxGeometry(2*L+e,largT,epT );
	const tigeH = new THREE.Mesh( tigeHgeometry, MaterialRGB(0,0,0) ) ;
	tigeH.position.set(-e/2+L,0,0);
	tigeH.name = "tigeH"; 
	tigeV.add( tigeH );
	
	
	// Bout tige
    let pts5=[];
	const diff5 = 0.06;
    pts5.push(new THREE.Vector2(0,0));
    pts5.push(new THREE.Vector2(-2*a-diff5,0));
    pts5.push(new THREE.Vector2(-a - diff5, -b - diff5));
    pts5.push(new THREE.Vector2(0, -b - diff5));
    const shape5 = new THREE.Shape( pts5 );
	
    let Points5 = [];
	Points5.push( new THREE.Vector3(-L+R*Math.cos(Math.PI/200),R*Math.sin(Math.PI/200),0));
	Points5.push( new THREE.Vector3(-L+R,0,0));
	Points5.push( new THREE.Vector3(-L+R*Math.cos(-Math.PI/200),R*Math.sin(-Math.PI/200),0));
    const Spline5 =  new THREE.CatmullRomCurve3( Points5 );

    const extrudeSettings5 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: Spline5
};

    const extrudeGeometry5 = new THREE.ExtrudeBufferGeometry( shape5, extrudeSettings5);
    const extrudeObject5 = new THREE.Mesh( extrudeGeometry5, MaterialRGB(0.0,0.0,0.0) ) ;
    extrudeObject5.material.side = THREE.DoubleSide; 
	extrudeObject5.position.set(-e/2+L+b/2-diff5/2,0,-a-diff5);
	extrudeObject5.name = "bout";
    tigeV.add( extrudeObject5 );
	
	
	//Systeme de reglage
	const rcylindreG=0.1;
	const cylindreG = new THREE.Mesh( new THREE.CylinderGeometry(rcylindreG,rcylindreG,0.5,32), MaterialRGB(0.9,0.9,0.9) ) ;
	cylindreG.position.set(0,-(r-e)/2-e - rcylindreG,0);
	cylindreG.name = "cylindreG";
	cylindreG.rotateZ(Math.PI/2-Math.atan((r-e)/2/L));
    extrudeObject1.add( cylindreG);
	
	const rcylindreP=0.02;
	const cylindreP = new THREE.Mesh( new THREE.CylinderGeometry(rcylindreP,rcylindreP,1.5,32), MaterialRGB(0,0,0) ) ;
	cylindreP.position.set(0,0,0);
	cylindreP.name = "cylindreP";
    cylindreG.add( cylindreP);
	
	// Ressort
    const circleRadius = 0.008;
	let circleShape = new THREE.Shape();
	circleShape.moveTo( 0, circleRadius );
	circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
	circleShape.quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius );
	circleShape.quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 );
	circleShape.quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );
	
    let Points7 = [];
	const A=0.05;
	const B=0.015;
	for (let t = 0;B*t<(Math.sqrt((r-e)*(r-e)/4+L*L)-1.5/2);t=t+Math.PI/4){
		Points7.push( new THREE.Vector3(A*Math.cos(t),B*t,A*Math.sin(t)));
	}
	
	const Spline7 =  new THREE.CatmullRomCurve3( Points7 );

    const extrudeSettings7 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: Spline7
};

    const extrudeGeometry7 = new THREE.ExtrudeBufferGeometry( circleShape, extrudeSettings7);
    const extrudeObject7 = new THREE.Mesh( extrudeGeometry7, MaterialRGB(0.0,0.0,0.0) ) ;
	extrudeObject7.position.set(0,1.5/2,0);
	extrudeObject7.name = "ressort";
    cylindreP.add( extrudeObject7 );
	
}

function initEteve1(sceneGraph){
	const p = new THREE.Vector3(0,1,0);
	const fourche = sceneGraph.getObjectByName("fourche");
	const triangle = sceneGraph.getObjectByName("triangle");
	const arc = sceneGraph.getObjectByName("arc");
	const tigeV = sceneGraph.getObjectByName("tigeV");
	fourche.translateX(p.x);
	fourche.translateY(p.y);
	fourche.translateZ(p.z);
	triangle.translateX(p.x);
	triangle.translateY(p.y);
	triangle.translateZ(p.z);
	arc.translateX(p.x);
	arc.translateY(p.y);
	arc.translateZ(p.z);
	tigeV.translateX(p.x);
	tigeV.translateY(p.y);
	tigeV.translateZ(p.z);
}

function initEteve2(sceneGraph){
	const p = new THREE.Vector3(4,-0.3,-6);
	//const reduz = 1;
	const fourche = sceneGraph.getObjectByName("fourche");
	const triangle = sceneGraph.getObjectByName("triangle");
	const arc = sceneGraph.getObjectByName("arc");
	const tigeV = sceneGraph.getObjectByName("tigeV");
	fourche.translateX(p.x);
	fourche.translateY(p.y);
	fourche.translateZ(p.z);
	/*fourche.scale.x=reduz;
	fourche.scale.y=reduz;
	fourche.scale.z=reduz;*/
	triangle.translateX(p.x);
	triangle.translateY(p.y);
	triangle.translateZ(p.z);
	/*triangle.scale.x=reduz;
	triangle.scale.y=reduz;
	triangle.scale.z=reduz;*/
	arc.translateX(p.x);
	arc.translateY(p.y);
	arc.translateZ(p.z);
	/*arc.scale.x=reduz;
	arc.scale.y=reduz;
	arc.scale.z=reduz;*/
	tigeV.translateX(p.x);
	tigeV.translateY(p.y);
	tigeV.translateZ(p.z);
	/*tigeV.scale.x=reduz;
	tigeV.scale.y=reduz;
	tigeV.scale.z=reduz;*/
}


function barBetween(p1,p2,barre){
	barre.position.set((p1[0]+p2[0])/2,(p1[1]+p2[1])/2,(p1[2]+p2[2])/2);
	const angle = Math.atan(-(p1[0]-p2[0])/(p1[1]-p2[1]));
	barre.rotation.z = angle;
}

function buildAvion(sceneGraph,pickingData){
	
	const Laile = 4.5;
	const laile=1.5;
	const eaile = 0.05;
	const h = 1.2;
	const r = 0.02; // rayon du pilier
	const LFront = 2;
	const lFront=0.6;
	const e = 0.3; // écart entre le bord de l'aile et le pilier
	const aFront = 2.1;
	const aBack = 5*(laile - 2*e);
	const rRoue = 0.3;
	const lRoue=0.2;
	
	// aile du bas
	const aile1Geometry = new THREE.BoxGeometry( laile,eaile,Laile );
	const aile1 = new THREE.Mesh( aile1Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	aile1.name = "aile1";
	sceneGraph.add( aile1 );
	
	// aile du bas
	const aile2Geometry = new THREE.BoxGeometry( laile,eaile,Laile );
	const aile2 = new THREE.Mesh( aile2Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	aile2.name = "aile2";	
	aile2.position.set(0,h,0);	
	aile1.add( aile2 );
	
	pilier(aile1,r, h, new THREE.Vector3(-laile/2+e,h/2,(Laile-2*e)/6));
	pilier(aile1,r, h, new THREE.Vector3(laile/2-e,h/2,(Laile-2*e)/6));
	pilier(aile1,r, h, new THREE.Vector3(-laile/2+e,h/2,-(Laile-2*e)/6));
	pilier(aile1,r, h, new THREE.Vector3(laile/2-e,h/2,-(Laile-2*e)/6));
	
	pilier(aile1,r, h, new THREE.Vector3(-laile/2+e,h/2,Laile/2-e));
	pilier(aile1,r, h, new THREE.Vector3(laile/2-e,h/2,Laile/2-e));
	pilier(aile1,r, h, new THREE.Vector3(-laile/2+e,h/2,-Laile/2+e));
	pilier(aile1,r, h, new THREE.Vector3(laile/2-e,h/2,-Laile/2+e));
	
	// aile devant
	const aileFGeometry = new THREE.BoxGeometry( lFront,eaile,LFront );
	const aileFront = new THREE.Mesh( aileFGeometry, MaterialRGB(0.3,0.3,0.3) ) ;
	aileFront.name = "aileFront";
	aileFront.position.set(-aFront+lFront/2,h/2,0);	
	aile1.add( aileFront );
	
	const H = Math.sqrt((aFront-lFront/2- laile/2)*(aFront-lFront/2 - laile/2)+h*h/4);
	const pilier5Geometry = new THREE.CylinderGeometry( r,r,H,32 );
	const pilier5 = new THREE.Mesh( pilier5Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier5.rotateZ(Math.atan(h/2/(aFront-lFront/2- laile/2))+Math.PI/2);
	pilier5.position.set(-aFront/2,3*h/4,(Laile-2*e)/6);
	aile1.add( pilier5);
	
	const pilier6Geometry = new THREE.CylinderGeometry( r,r,H,32 );
	const pilier6 = new THREE.Mesh( pilier6Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier6.rotateZ(-(Math.atan(h/2/(aFront-lFront/2- laile/2))+Math.PI/2));
	pilier6.position.set(-aFront/2,h/4,-(Laile-2*e)/6);
	aile1.add( pilier6 );
	
	const pilier7Geometry = new THREE.CylinderGeometry( r,r,H,32 );
	const pilier7 = new THREE.Mesh( pilier7Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier7.rotateZ(Math.atan(h/2/(aFront-lFront/2- laile/2))+Math.PI/2);
	pilier7.position.set(-aFront/2,3*h/4,-(Laile-2*e)/6);
	aile1.add( pilier7);
	
	const pilier8Geometry = new THREE.CylinderGeometry( r,r,H,32 );
	const pilier8 = new THREE.Mesh( pilier8Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier8.rotateZ(-(Math.atan(h/2/(aFront-lFront/2- laile/2))+Math.PI/2));
	pilier8.position.set(-aFront/2,h/4,+(Laile-2*e)/6);
	aile1.add( pilier8 );
	
	// aile derrière bas
	const aileB1Geometry = new THREE.BoxGeometry( laile-e,eaile,(Laile-2*e)/3+2*e );
	const aileBack1 = new THREE.Mesh( aileB1Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	aileBack1.name = "aileBack1";
	aileBack1.position.set(aBack,0,0);	
	aile1.add( aileBack1 );
	
	// aile derrière haut
	const aileB2Geometry = new THREE.BoxGeometry( laile-e,eaile,(Laile-2*e)/3+2*e );
	const aileBack2 = new THREE.Mesh( aileB2Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	aileBack2.name = "aileBack2";
	aileBack2.position.set(aBack,h,0);	
	aile1.add( aileBack2 );
	
	pilier(aile1,r, h, new THREE.Vector3(aBack+(laile/2-e),h/2,(Laile-2*e)/6));
	pilier(aile1,r, h, new THREE.Vector3(aBack-(laile/2-e),h/2,-(Laile-2*e)/6));
	pilier(aile1,r, h, new THREE.Vector3(aBack+(laile/2-e),h/2,-(Laile-2*e)/6));
	pilier(aile1,r, h, new THREE.Vector3(aBack-(laile/2-e),h/2,+(Laile-2*e)/6));
	
	const i = laile - 2*e;
	for (let k = 1;k<4;k++){
	
	pilier(aile1,r, h, new THREE.Vector3(laile/2-e + i*k,h/2,(Laile-2*e)/6));
	pilier(aile1,r, h, new THREE.Vector3(laile/2-e + i*k,h/2,-(Laile-2*e)/6));
	}
	
	const pilier1Geometry = new THREE.CylinderGeometry( r,r,aBack,32 );
	const pilier1 = new THREE.Mesh( pilier1Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier1.rotateZ(Math.PI/2);
	pilier1.position.set(aBack/2,0,(Laile-2*e)/6);
	aile1.add( pilier1 );	
	const pilier2Geometry = new THREE.CylinderGeometry( r,r,aBack,32 );
	const pilier2 = new THREE.Mesh( pilier2Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier2.rotateZ(Math.PI/2);
	pilier2.position.set(aBack/2,0,-(Laile-2*e)/6);
	aile1.add( pilier2 );
	const pilier3Geometry = new THREE.CylinderGeometry( r,r,aBack,32 );
	const pilier3 = new THREE.Mesh( pilier3Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier3.rotateZ(Math.PI/2);
	pilier3.position.set(aBack/2,h,(Laile-2*e)/6);
	aile1.add( pilier3 );	
	const pilier4Geometry = new THREE.CylinderGeometry( r,r,aBack,32 );
	const pilier4 = new THREE.Mesh( pilier4Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier4.rotateZ(Math.PI/2);
	pilier4.position.set(aBack/2,h,-(Laile-2*e)/6);
	aile1.add( pilier4 );
	
	const roue1 = new THREE.Mesh( new THREE.CylinderGeometry( rRoue,rRoue,lRoue,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	roue1.rotateX(Math.PI/2);
	roue1.position.set(0,-(rRoue/2+0.2),LFront);
	aile1.add( roue1 );
	
	const liaison1 = new THREE.Mesh( new THREE.CylinderGeometry( r,r,0.8+2*lRoue,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	liaison1.position.set(0,-(0.8+2*lRoue)/2+lRoue,0);
	roue1.add( liaison1);
	
	const roue2 = new THREE.Mesh( new THREE.CylinderGeometry( rRoue,rRoue,lRoue,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	roue2.rotateX(Math.PI/2);
	roue2.position.set(0,-(rRoue/2+0.2),LFront-0.8);
	aile1.add( roue2 );
	
	const roue3 = new THREE.Mesh( new THREE.CylinderGeometry( rRoue,rRoue,lRoue,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	roue3.rotateX(Math.PI/2);
	roue3.position.set(0,(-rRoue/2-0.2),-LFront);
	aile1.add( roue3 );
	
	const roue4 = new THREE.Mesh( new THREE.CylinderGeometry( rRoue,rRoue,lRoue,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	roue4.rotateX(Math.PI/2);
	roue4.position.set(0,(-rRoue/2-0.2),-LFront+0.8);
	aile1.add( roue4 );
	
	const liaison2 = new THREE.Mesh( new THREE.CylinderGeometry( r,r,0.8+2*lRoue,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	liaison2.position.set(0,-(0.8+2*lRoue)/2+lRoue,0);
	roue4.add( liaison2);
	
	const liaisonH1 = new THREE.Mesh( new THREE.CylinderGeometry( r,r,rRoue+0.1,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	liaisonH1.position.set(0,0.2,-(rRoue+0.1)/2);
	liaisonH1.rotateX(Math.PI/2);
	liaison2.add( liaisonH1);
	
	const liaisonH2 = new THREE.Mesh( new THREE.CylinderGeometry( r,r,rRoue+0.1,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	liaisonH2.position.set(0,-0.2,-(rRoue+0.1)/2);
	liaisonH2.rotateX(Math.PI/2);
	liaison2.add( liaisonH2);
	
	const liaisonH3 = new THREE.Mesh( new THREE.CylinderGeometry( r,r,rRoue+0.1,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	liaisonH3.position.set(0,0.2,-(rRoue+0.1)/2);
	liaisonH3.rotateX(Math.PI/2);
	liaison1.add( liaisonH3);
	
	const liaisonH4 = new THREE.Mesh( new THREE.CylinderGeometry( r,r,rRoue+0.1,32 ), MaterialRGB(0.3,0.3,0.3) ) ;
	liaisonH4.position.set(0,-0.2,-(rRoue+0.1)/2);
	liaisonH4.rotateX(Math.PI/2);
	liaison1.add( liaisonH4);
}

function pilier(aile1, r, h, pos){
	const Geometry = new THREE.CylinderGeometry( r,r,h,32 );
	const pilier = new THREE.Mesh( Geometry, MaterialRGB(0.3,0.3,0.3) ) ;
	pilier.position.set(pos.x,pos.y,pos.z);
	aile1.add( pilier );
}