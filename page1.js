
const next = document.getElementById('next');
const Texte1 = document.getElementById('Texte1');
const Texte2 = document.getElementById('Texte2');
const Texte4 = document.getElementById('Texte4');
const Texte3 = document.getElementById('Texte3');
const Titre = document.getElementById('Titre');
const avionSeul = document.getElementById('avionSeul');
const portance = document.getElementById('portance');
const portance2 = document.getElementById('portance2');
const trainee = document.getElementById('trainee');
const trainee2 = document.getElementById('trainee2');
const page2 = document.getElementById('page2');
const flecheNext = document.getElementById('flecheNext');
const fleche2 = document.getElementById('fleche2');
const prev = document.getElementById('prev');

let compt = 0;

function showNext(){
	if(compt==0){
		Titre.style.visibility='hidden';
		ContainerTexte1.style.visibility='visible';
		Texte1.style.visibility='visible';
		avionSeul.style.visibility='visible';
		prev.style.visibility='visible';
	}
	if(compt==1){
		Texte1.style.visibility='hidden';
		Texte2.style.visibility='visible';
	}
	if(compt==2){
		Texte2.style.visibility='hidden';
		Texte3.style.visibility='visible';
		trainee.style.visibility='visible';
		trainee2.style.visibility='visible';
	}
	if(compt==3){
		Texte3.style.visibility='hidden';
		Texte4.style.visibility='visible';
		trainee.style.visibility='hidden';
		trainee2.style.visibility='hidden';
		portance.style.visibility='visible';
		portance2.style.visibility='visible';
		page2.style.visibility='visible';
		flecheNext.style.visibility='hidden';
		fleche2.style.visibility='visible';
	}
	compt++;
}

function showPrev(){
	if(compt==1){
		prev.style.visibility='hidden';
		Titre.style.visibility='visible';
		ContainerTexte1.style.visibility='hidden';
		Texte1.style.visibility='hidden';
		avionSeul.style.visibility='hidden';
	}
	if(compt==2){
		Texte2.style.visibility='hidden';
		Texte1.style.visibility='visible';
	}
	if(compt==3){
		Texte2.style.visibility='visible';
		Texte3.style.visibility='hidden';
		trainee.style.visibility='hidden';
		trainee2.style.visibility='hidden';
	}
	if(compt==4){
		Texte3.style.visibility='visible';
		Texte4.style.visibility='hidden';
		trainee.style.visibility='visible';
		trainee2.style.visibility='visible';
		portance.style.visibility='hidden';
		portance2.style.visibility='hidden';
		page2.style.visibility='hidden';
		flecheNext.style.visibility='visible';
		fleche2.style.visibility='hidden';
	}
	compt--;
}

next.addEventListener('click', showNext);
prev.addEventListener('click', showPrev);
