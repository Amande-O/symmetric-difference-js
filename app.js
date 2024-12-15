const submitBtn = document.querySelector('#submit');
const mainSection = document.querySelector('main');
const btnAdd = document.querySelector('#btn-Add');
const form = document.querySelector('form');
const sectionBtn = document.querySelector('.section__btn');
let setName;

btnAdd.addEventListener('click', addNewSet);
submitBtn.addEventListener('click', showSymDiff);

// shows the symmetric difference
function showSymDiff(e){
	e.preventDefault();
	let resultSymDiff = symDiff();
	showDivResult(resultSymDiff);
}

//shows the result
function showDivResult(resultSymDiff){
	let divResult = document.querySelector('.section__result');
	let pResult = document.querySelector('#result');
	if (pResult == undefined) {
		divResult = document.createElement('section');
		let firstP = document.createElement('p');
		pResult = document.createElement('p');
		divResult.classList.add('section__result');
		pResult.id = "result";
		mainSection.appendChild(divResult);
		divResult.appendChild(firstP);
		divResult.appendChild(pResult);
		firstP.textContent = "Résultat : ";
	}
	pResult.textContent = resultSymDiff;
}

// look for the symmetric difference
function symDiff() {
	let resultTest = ("1,5,9");
	return resultTest
}

// adds a new set
function addNewSet(e){
	e.preventDefault();
	if(!limitInputAddSet()){
		let newLabel = document.createElement('label');
		let newInput = document.createElement('input');
		newInput.setAttribute('placeholder', `Saisir ici l'ensemble ${setName}`);
		newInput.classList.add('input__text');
		let contentLabel = document.createTextNode(`Saisie de l'ensemble ${setName}: `);
		newLabel.appendChild(contentLabel);
		form.insertBefore(newLabel, sectionBtn);
		form.insertBefore(newInput, sectionBtn);
	}
}

// checks the number of sets and adds a name to the set
function limitInputAddSet() {
	const nbInputText = document.querySelectorAll('.input__text').length;
	let messageLimitAddSet = document.querySelector('.message__limit');
	if(nbInputText == 5) {
		if (messageLimitAddSet == null) {
			messageLimitAddSet = document.createElement('p');
			messageLimitAddSet.classList.add('message__limit');
			messageLimitAddSet.textContent = "Ajout supplémentaire impossible. Dans cet exemple, le nombre d'ensemble est limité à 5.";
			form.insertBefore(messageLimitAddSet, sectionBtn);
		}
		return true;
	} else {
		addSetName(nbInputText);
		return false;
	}
}

// adds the name of set
function addSetName(nbInputText) {
	let names = ["C", "D", "E"];
	setName = (names[nbInputText - 2]);
}