
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
const page5 = document.getElementById('page5');
const page7 = document.getElementById('page7');
const flecheNext = document.getElementById('flecheNext');
const flechePrev = document.getElementById('flechePrev');
const fleche5 = document.getElementById('fleche5');
const fleche7 = document.getElementById('fleche7');
const prev = document.getElementById('prev');
const ref = document.getElementById('ref');

let compt = 0;

function showNext(){
	if(compt==0){
		page5.style.visibility='hidden';
		fleche5.style.visibility='hidden';
		flechePrev.style.visibility='visible';
		ref.style.visibility='visible';
		Texte1.style.visibility='hidden';
		Texte2.style.visibility='hidden';
		Texte3.style.visibility='visible';
	}
	if(compt==1){
		Texte3.style.visibility='hidden';
		Texte4.style.visibility='visible';
		page7.style.visibility='visible';
		flecheNext.style.visibility='hidden';
		fleche7.style.visibility='visible';
	}
	compt++;
}

function showPrev(){
	if(compt==1){
		page5.style.visibility='visible';
		fleche5.style.visibility='visible';
		ref.style.visibility='hidden';
		flechePrev.style.visibility='hidden';
		Texte1.style.visibility='visible';
		Texte2.style.visibility='visible';
		Texte3.style.visibility='hidden';
	}
	if(compt==2){
		Texte3.style.visibility='visible';
		Texte4.style.visibility='hidden';
		page7.style.visibility='hidden';
		flecheNext.style.visibility='visible';
		fleche7.style.visibility='hidden';
	}
	
	compt--;
}

next.addEventListener('click', showNext);
prev.addEventListener('click', showPrev);
