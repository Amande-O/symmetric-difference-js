const submitBtn = document.querySelector('#submit');
const mainSection = document.querySelector('main');
const btnAdd = document.querySelector('#btn-Add');
const btnReset = document.querySelector('#btn-Reset');
const form = document.querySelector('form');
const sectionBtn = document.querySelector('.section__btn');
let allInputText = document.querySelectorAll('.input__text');
let divErrorMess = document.querySelector('.message__error');
let divResult = document.querySelector('.section__result');
let messageLimitAddSet = document.querySelector('.message__limit');
let setName;
let args = [];
let messageInput;
let dataEmpty;
let dataNaN;
let dataLimit;
let errorMessageEmpty;
let errorMessageNaN;
let errorMessageLimit;
const url = location.pathname;

btnAdd.addEventListener('click', addNewSet);
submitBtn.addEventListener('click', showSymDiff);
btnReset.addEventListener('click', resetForm);

allInputText.forEach(element => element.addEventListener('blur', () => {
	checkData(element);
}));

allInputText.forEach(element => element.addEventListener('input', () => {
	checkData(element);
}));

/**
 * resets the form
 */
function resetForm() {
	allInputText = document.querySelectorAll('.input__text');
	allLabel = document.querySelectorAll('label');
	let formErrorMess = document.querySelectorAll('.form__message--error');
	deleteElement(messageLimitAddSet);
	deleteElement(divErrorMess);
	formErrorMess.forEach(element => {
		element.remove();
	});
	allInputText.forEach(element => {
		if (element.id != "setA" && element.id !="setB") {
			element.remove();
			allLabel.forEach(el => {
				if (el.getAttribute('for') === `${element.id}`) {
					el.remove();
				}
			})
		}
		element.value = "";
		element.classList.remove('error');
	})
	if(divResult){
		divResult.remove();
	}
}

/**
 * checks values of elements
 * @param {*} element 
 */
function checkData(element) {
	try {
		messageInput = document.querySelector(`.message__error--${element.id}`);
		checkNumberElements(element);
		checkIfEmpty(element);
		checkIsNaN(element);
		if (!dataEmpty && !dataNaN && !dataLimit) {
			element.classList.remove('error');
			if (messageInput) {
				messageInput.remove();
			}
		} else {
			throw new Error("l'ensemble est vide ou un élement n'est pas un nombre");
		}
	} catch {
		if (dataEmpty || dataNaN || dataLimit) {
			element.classList.add('error');
			if (messageInput === null) {
				let message = document.createElement('span');
				addNewElement(message, [`message__error--${element.id}`, 'form__message--error'], false, form, element);
				insertErrorMessage(message);
			} else {
				insertErrorMessage(messageInput);
			}
		}
	}
}

/**
 * checks the number of elements
 * @param {*} element
 */
function checkNumberElements(element) {
	if (element.value.length > 50) {
		dataLimit = true;
		errorMessageLimit = "Le nombre de caractères est limité à 50";
	} else if (element.value.length === 50) {
		dataLimit = true;
		errorMessageLimit = "Nombre maximum de caractères possible par ensemble atteint (50). Ajout supplémentaire impossible."
	} else {
		dataLimit = false;
	}
}

/**
 * checks if the value is empty
 * @param {*} element 
 */
function checkIfEmpty(element) {
	if (element.value.length === 0) {
		dataEmpty = true;
		errorMessageEmpty = "L'ensemble est vide. Si vous affichez le résultat, il ne sera pas pris en compte.";
	} else {
		dataEmpty = false;
	}
}

/**
 * checks if the value isn't a number
 * @param {*} element 
 */
function checkIsNaN(element) {
	let checkingArray = [];
	let valueConvertToNumber = element.value.split(",").map(el => convertToNumber(el));
	checkingArray.push(valueConvertToNumber);
	checkingArray.forEach(el => {
		el.forEach( value => {
			if (value === undefined) {
				dataNaN = true;
				errorMessageNaN = "Un des élements n'est pas un nombre.";
			} else {
				dataNaN = false;
			}
		})
	})
	checkingArray = [];
}

function insertErrorMessage(span) {
	if (dataLimit) {
		span.textContent = errorMessageLimit;
	} else if (dataEmpty) {
		span.textContent = errorMessageEmpty;
	} else if (dataNaN) {
		span.textContent = errorMessageNaN;
	}
}

/**
 * shows the symmetric difference
 */
function showSymDiff(e){
	try {
		e.preventDefault();
		deleteElement(divErrorMess, divResult, messageLimitAddSet);
		addAllSetsInArray();
		let resultSymDiff = symDiff(args);
		showDivResult(resultSymDiff);
	} catch (error) {
		divErrorMess = document.createElement('p');
		let errMess;
		if (error.message === "division impossible") {
			errMess = "impossible de diviser par 0";
		} else if (error.message === "NaN") {
			errMess = "Un des élements n'est pas un nombre";
		} else if (error.message === "trop de caractères") {
			errMess = "Le nombre de caractères par ensemble est limité à 50.";
		}
		addNewElement(divErrorMess, ['message__error'], errMess, mainSection, false);
	}
}

/**
 * deletes elements
 */
function deleteElement(...args){
	args.forEach(element => { 
		if (element) {
			element.remove();
		}
	})
}

/**
 * adds all sets into the variable "args"
 */
function addAllSetsInArray(){
	const allSet = document.querySelectorAll('.input__text');
	args = [];
	allSet.forEach((element) => {
		if (element.value.length > 50){
			throw new Error("trop de caractères");
		}
		let valuesInt = element.value.split(",").map(el => convertToNumber(el));
		args.push(valuesInt);
	})
}

/**
 * converts to number and if is a fraction, calculs the result.
 * @param {string} el 
 * @returns {float}
 */
function convertToNumber(el){
	if (el.includes("/")) {
		fraction = el.split("/");
		fractResult = fraction[0] / fraction[1];
		if (Number.isFinite(fractResult)) {
			el = fractResult;
		} else {
			throw new Error("division impossible");
		}
	}
	if (!isNaN(el)) {
		return parseFloat(el);
	}
}

/**
 * shows the result
 * @param {string} resultSymDiff
 */
function showDivResult(resultSymDiff){
	let pResult = document.querySelector('#result');
	if (pResult == undefined) {
		divResult = document.createElement('section');
		let firstP = document.createElement('p');
		pResult = document.createElement('p');
		addNewElement(divResult, ['section__result'], false, mainSection, false);
		addNewElement(firstP, false, "Résultat : ", divResult, false);
		addNewElement(pResult, false, false, divResult, false);
		pResult.id = "result";
	}
	pResult.textContent = resultSymDiff;
	location.assign(`${url}#result`);
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
	return Array.from(result).toString();
}

/**
 * checks if is a number and add the element into the variable "result"
 * @param {Set<number>} result 
 * @param {*} el
 */
function checkIsNumberAndAdd(result, el){
	if (!isNaN(el)) {
		result.add(el);
	} else if (el === undefined){
		throw new Error("NaN");
	}
}

/**
 * adds a new set
 */
function addNewSet(e){
	e.preventDefault();
	if(!limitInputAddSet()){
		let newLabel = document.createElement('label');
		let newInput = document.createElement('input');
		newLabel.setAttribute('for', `set${setName}`);
		addNewElement(newLabel, false, `Saisie de l'ensemble ${setName}: `, form, sectionBtn);
		newInput.setAttribute('type', 'text');
		addNewElement(newInput, ['input__text','new'], false, form, sectionBtn);
		newInput.setAttribute('id', `set${setName}`);
		newInput.setAttribute('placeholder', `Saisir ici l'ensemble ${setName}`);
		newInput.addEventListener('input', () => {
			checkData(newInput);
		})
		newInput.addEventListener('blur', () => {
			checkData(newInput);
		})
		location.assign(`${url}#btn-Add`);
	}
}

/**
 * checks the number of sets and adds a name to the set
 * @returns {boolean}
 */
function limitInputAddSet() {
	try {
		const nbInputText = document.querySelectorAll('.input__text').length;
		if (nbInputText < 5) {
			addSetName(nbInputText);
			return false;
		} else {
			throw new Error("Impossible d'ajouter plus de 5 ensembles");
		}
	} catch {
		if (messageLimitAddSet === null || messageLimitAddSet.parentNode === null) {
			messageLimitAddSet = document.createElement('p');
			let textAddSet = "Ajout supplémentaire impossible. Dans cet exemple, le nombre d'ensembles est limité à 5.";
			addNewElement(messageLimitAddSet, ['message__limit'], textAddSet, form, sectionBtn);
		}
		return true;
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

/**
 * after to have create a new element, use this function for adding classes, text et adding to the DOM
 * @param {HTMLElement} element the element created
 * @param {Array<string> | false} className a array with name of classes | or false if you don't want to add a class
 * @param {string | false} text the text to add with textContent | false if no text
 * @param {HTMLElement} parent parentNode for insertBefore() method or appenchild() method
 * @param {HTMLElement} referenceNode referenceNode | false si you use "appendchild"
 */
function addNewElement(element, className, text, parent, referenceNode) {
	element.setAttribute('maxlength', '50');
	if (className != false) {
		className.forEach(el => {element.classList.add(el)});
	}
	if (text != false) {
		element.textContent = text;
	}
	(referenceNode === false) ? parent.appendChild(element) : parent.insertBefore(element, referenceNode);
}
