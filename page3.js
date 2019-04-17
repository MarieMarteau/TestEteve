
const next = document.getElementById('next');
const Texte1 = document.getElementById('Texte1');
const Texte2 = document.getElementById('Texte2');
const Texte4 = document.getElementById('Texte4');
const Texte3 = document.getElementById('Texte3');
const Texte5 = document.getElementById('Texte5');
const page2 = document.getElementById('page2');
const flecheNext = document.getElementById('flecheNext');
const fleche2 = document.getElementById('fleche2');
const prev = document.getElementById('prev');
const eteve = document.getElementById('eteve');
const indicateur = document.getElementById('indicateur');
const scene3D = document.getElementById('AffichageScene3D');
const rappel = document.getElementById('rappel');
const fleche4 = document.getElementById('fleche4');



let compt = 0;

function showNext(){
	if(compt==0){
		fleche2.style.visibility='hidden';
		flechePrev.style.visibility='visible';
		Texte1.style.visibility='hidden';
		eteve.style.visibility='hidden';
		Texte2.style.visibility='visible';
		indicateur.style.visibility='visible';
	}
	if(compt==1){
		Texte2.style.visibility='hidden';
		indicateur.style.visibility='hidden';
		Texte3.style.visibility='visible';
		scene3D.style.visibility='visible';
	}
	if(compt==2){
		Texte3.style.visibility='hidden';
		Texte4.style.visibility='visible';
		trainee.style.visibility='visible';
	}
	if(compt==3){
		Texte4.style.visibility='hidden';
		trainee.style.visibility='hidden';
		Texte5.style.visibility='visible';
		rappel.style.visibility='visible';
		page2.style.visibility='visible';
		flecheNext.style.visibility='hidden';
		fleche4.style.visibility='visible';
	}
	compt++;
}

function showPrev(){
	if(compt==1){
		fleche2.style.visibility='visible';
		flechePrev.style.visibility='hidden';
		Texte1.style.visibility='visible';
		eteve.style.visibility='visible';
		Texte2.style.visibility='hidden';
		indicateur.style.visibility='hidden';
	}
	if(compt==2){
		Texte2.style.visibility='visible';
		indicateur.style.visibility='visible';
		Texte3.style.visibility='hidden';
		scene3D.style.visibility='hidden';
	}
	if(compt==3){
		Texte3.style.visibility='visible';
		Texte4.style.visibility='hidden';
		trainee.style.visibility='hidden';
	}
	if(compt==4){
		Texte4.style.visibility='visible';
		trainee.style.visibility='visible';
		Texte5.style.visibility='hidden';
		rappel.style.visibility='hidden';
		page2.style.visibility='hidden';
		flecheNext.style.visibility='visible';
		fleche4.style.visibility='hidden';
	}
	compt--;
}

next.addEventListener('click', showNext);
prev.addEventListener('click', showPrev);
