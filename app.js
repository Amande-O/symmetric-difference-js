const submitBtn = document.querySelector('#submit');
const mainSection = document.querySelector('main');
const btnAdd = document.querySelector('#btn-Add');
const form = document.querySelector('form');
const sectionBtn = document.querySelector('.section__btn');
let setName;
let args = [];

btnAdd.addEventListener('click', addNewSet);
submitBtn.addEventListener('click', showSymDiff);

// shows the symmetric difference
function showSymDiff(e){
	e.preventDefault();
	addAllSetsInArray();
	let resultSymDiff = symDiff(args);
	showDivResult(resultSymDiff);
}

// adds all sets into the variable "args"
function addAllSetsInArray(){
	const allSet = document.querySelectorAll('.input__text');
	args = [];
	allSet.forEach((element) => {
		let valuesInt = element.value.split(",").map(el => parseInt(el, 10));
		args.push(valuesInt);
	})
}

/**
 * shows the result
 * @param {string} resultSymDiff
 */
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

/**
 * finds the symmetric difference
 * @param {Array<number>} args
 * @returns {string}
 */
function symDiff(args) {
	let result = new Set();
	args.forEach((element) => {
	  element = new Set(element);
	  element.forEach((el) => result.has(el) ? result.delete(el) : checkIsNumberAndAdd(result, el));
	})
	return Array.from(result).sort().toString();
}

/**
 * checks if is a number and add the element into the variable "result"
 * @param {Set<number>} result 
 * @param {*} el
 */
function checkIsNumberAndAdd(result, el){
	if (Number.isInteger(el)) {
		result.add(el)
	}
}

// adds a new set
function addNewSet(e){
	e.preventDefault();
	if(!limitInputAddSet()){
		let newLabel = document.createElement('label');
		let newInput = document.createElement('input');
		newInput.setAttribute('type', 'text');
		newInput.classList.add('input__text');
		newInput.setAttribute('placeholder', `Saisir ici l'ensemble ${setName}`);
		let contentLabel = document.createTextNode(`Saisie de l'ensemble ${setName}: `);
		newLabel.appendChild(contentLabel);
		form.insertBefore(newLabel, sectionBtn);
		form.insertBefore(newInput, sectionBtn);
	}
}

/**
 * checks the number of sets and adds a name to the set
 * @returns {boolean}
 */
function limitInputAddSet() {
	const nbInputText = document.querySelectorAll('.input__text').length;
	let messageLimitAddSet = document.querySelector('.message__limit');
	if(nbInputText == 5) {
		if (messageLimitAddSet == null) {
			messageLimitAddSet = document.createElement('p');
			messageLimitAddSet.classList.add('message__limit');
			messageLimitAddSet.textContent = "Ajout supplémentaire impossible. Dans cet exemple, le nombre d'ensembles est limité à 5.";
			form.insertBefore(messageLimitAddSet, sectionBtn);
		}
		return true;
	} else {
		addSetName(nbInputText);
		return false;
	}
}

/**
 * adds the name of set
 * @param {number} nbInputText 
 */
function addSetName(nbInputText) {
	let names = ["C", "D", "E"];
	setName = (names[nbInputText - 2]);
}