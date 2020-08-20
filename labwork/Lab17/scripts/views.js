const mainMenu = function(){
	const view = document.getElementById('view');
	const html = `<section>
					<button id = 'new-game-button'>New Game</button>
					<button id = 'join-game-button'>Join Game</button> 
				</section>`
	view.innerHTML = html;
	addController('new-game-button', 'join-game-button');
}
const newGameMenu = function(){
	const view = document.getElementById('view');
	const html = `<section>
					Start: <input id='min-value' type=number value=0>
					End: <input id='max-value' type=number value=0>
					<button id = 'start-game-button'>Start</button> 
				</section>`
	view.innerHTML = html;
	addController('start-game-button');
}
const joinGameMenu = function(){
	const view = document.getElementById('view');
	const html = `<section>
					GameID: <input id='room-code' type=text value='GameID'>
					<button id = 'find-game-button'>Join</button> 
				</section>`
	view.innerHTML = html;
	addController('find-game-button');
}
const viewGame = function(){
	const view = document.getElementById('view');
	const html = `<section>
					<h3>Game ID: ${gameID} </h3>
					<p>Min: ${min} Max: ${max}</p>
					<input id='guess-input' type=number>
					<button id = 'submit-guess-button'>Submit</button>
					<ul id='clues-list'></ul>
				</section>`
	view.innerHTML = html;
	addController('submit-guess-button');
	if(gameover) gameOverMenu('You lose!');
}
const gameOverMenu = function(result){
	const view = document.getElementById('view');
	const html = `<section>
					<h3>Game ID: ${gameID} </h3>
					<p>Game Over: ${result}</p>
					<button id = 'reset-game-button'>Replay</button>
					<button id = 'quit-game-button'>Main Menu</button>
				</section>`
	view.innerHTML = html;
	addController('reset-game-button', 'quit-game-button');
}
const viewClue = function(clue, guess){
	clueList = document.getElementById('clues-list');
	clueList.innerHTML += `<li>${guess} is ${clue}</li>`;
}