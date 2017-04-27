var newGameBtn =  document.getElementById('js-newGame'), //newGame button
	gameWelcome = document.getElementById('js-gameWelcome'),
	gameActive= document.getElementById('js-gameActive'), //active game container
	gameEnd= document.getElementById('js-gameEnd'), 
	h2 = document.getElementById('js-gameCounter'),
	choicePaper = document.getElementById('js-playerChoice-paper'),
	choiceScissors = document.getElementById('js-playerChoice-scissors'),
	choiceRock = document.getElementById('js-playerChoice-rock'),
	playerName = document.getElementById('js-player'),
	playerScore = document.getElementById('js-playerScore'),
	playerChoice = document.getElementById('js-playerChoice'),
	playerResult = document.getElementById('js-playerResult'),
	computerScore = document.getElementById('js-computerScore'),
	computerChoice = document.getElementById('js-computerChoice'),
	computerResult = document.getElementById('js-computerResult'),
	winnerHTML =  document.getElementById('js-winner'),
	player = {
		name: "",
		score: 0 
	},
	computer = {
		name: "komputer",
		score: 0
	},
	gameCounter = 0,
	gameState = 'notStarted',
	tools = ['paper', 'scissors', 'rock'],
	playerPick,
	computerPick,
	roundWinner,
	gameWinner,
	finalScore,
	roundNumber = 0;
	
function hideElement(elem) {

	if (elem.className.search('hidden') == -1) {
		elem.className += ' hidden';
	}

};

function activeElement(elem) {

	if (elem.className.search('hidden') > 0) {
		elem.className = elem.className.replace('hidden', '');
	}

};

function displayGameWindow() {

	switch (gameState)	{
		case 'started': 
			hideElement(gameWelcome);
			hideElement(newGameBtn);
			hideElement(gameEnd);
			activeElement(gameActive);
			break;
		case 'ended':
			hideElement(gameWelcome);
			hideElement(gameActive);
			activeElement(gameEnd);
			newGameBtn.innerHTML = "Zagraj jeszcze raz";
			activeElement(newGameBtn);
			break;
		case 'notStarted':
		default:
			hideElement(gameActive);
			hideElement(gameEnd);
			activeElement(gameWelcome);
	};	

};

function colonString(elem) {

	return elem.innerHTML.substring(0, elem.innerHTML.indexOf(':') +1);

};

function setRoundNb() {
	
	roundNumber = prompt('Do ilu zwycięstw chcesz grać?');	
	if (!roundNumber) {
		gameState="ended";
		displayGameWindow();
	}
	else {
		while (isNaN(roundNumber)) {
			roundNumber = prompt('Podano niepoprawną liczbę. Spróbuj jeszcze raz ');
			if (!roundNumber) {
				gameState="ended";
				displayGameWindow();
			};
		};
	};

};

function newGame() {

	gameState = 'started';
	gameCounter++;
	displayGameWindow();
	h2.innerText = colonString(h2) + " " + gameCounter;
	player.name = prompt('Podaj imię');
	setRoundNb();

	if (player.name === "") {
		playerName.innerText = colonString(playerName) + " " + 1;		
	}
	else {
		playerName.innerText = colonString(playerName) + " " + player.name;
	};

	player.score = computer.score = 0;
	playerScore.innerText = player.score;
	computerScore.innerText = computer.score;
	playerPick = computerPick = "";
	playerChoice.innerHTML = colonString(playerChoice);
	computerChoice.innerHTML = colonString(computerChoice);	
	playerResult.innerHTML = computerResult.innerHTML = "";
	winnerHTML.innerHTML = colonString(winnerHTML);

};

function chooseComputer() {

	computerChoice.innerHTML = colonString(computerChoice);
	computerPick = tools[Math.floor(Math.random()*3)];
	computerChoice.innerHTML += '<i class="fa fa-hand-' + computerPick  + '-o"></i>'; 

};

function choosePlayer(param){

	playerChoice.innerHTML = colonString(playerChoice);
	playerPick = param;
	playerChoice.innerHTML += '<i class="fa fa-hand-' + param + '-o"></i>'; 
	chooseComputer();
	checkRoundWinner(playerPick, computerPick);

};

function checkGameWinner() {

	if (player.score == roundNumber || computer.score == roundNumber) {
		gameState = 'ended';

		if (player.score === roundNumber) {
			gameWinner = player.name;
			finalScore = player.score + ':' + computer.score;
		}
		else {
			gameWinner = computer.name;
			finalScore = computer.score + ':' + player.score;
		};


		winnerHTML.innerHTML += '<h2>Wygrał: ' + gameWinner + '</h2>' + '<h1 class="finalScore">' + finalScore + '</h1>';
		displayGameWindow();
	}

}

function checkRoundWinner(playerPick, computerPick) {

	playerResult.innerHTML = computerResult.innerHTML = "";
	roundWinner = player;

	if (playerPick === computerPick) {
		roundWinner = 'Remis';
		playerResult.innerHTML = computerResult.innerHTML = 'Remis!';
	}
	else if (
		(playerPick === 'paper'  && computerPick === 'scissors') ||
		(playerPick === 'scissors' && computerPick === 'rock') ||
		(playerPick === 'rock' && computerPick === 'paper')
		) {
		roundWinner = computer;
	};

	if (roundWinner == player) {
		playerResult.innerHTML = ' Wygrana!'; 
		player.score++;
		playerScore.innerHTML = player.score;
	}
	else if (roundWinner == computer) {
		computerResult.innerHTML = ' Wygrana!';
		computer.score++;
		computerScore.innerHTML = computer.score;
	};

	checkGameWinner();

}

window.onload = displayGameWindow(gameState);

newGameBtn.addEventListener('click', function() {
	newGame();
});

choicePaper.addEventListener('click', function() {
	choosePlayer('paper');
});

choiceScissors.addEventListener('click', function() {
	choosePlayer('scissors');
});

choiceRock.addEventListener('click', function() {
	choosePlayer('rock');
});
