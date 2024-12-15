const submitBtn = document.querySelector('#submit');
const mainSection = document.querySelector('main');

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
		divResult = document.createElement("section");
		let firstP = document.createElement("p");
		pResult = document.createElement("p");
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