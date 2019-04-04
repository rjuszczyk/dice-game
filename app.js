/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer, gamePlaying;

initGame();

//get elements
function getEl(element) {
  if (element.charAt(0) === '#' || '.') {
    return document.querySelector(element); // return single Element
  }
  return document.querySelectorAll(element); // return many Elements
}

function setDicesVisibility(isShown) {
  let display = isShown ? 'block' : 'none';
  getEl('#dice-1').style.display = display;
  getEl('#dice-2').style.display = display;
}

function clearScoreUi(isShown) {
  if (isShown) {
    getEl('#score-0').textContent = '0';
    getEl('#score-1').textContent = '0';
  }
}

function clearCurrent(isShown) {
  if (isShown) {
    getEl('#current-0').textContent = '0';
    getEl('#current-1').textContent = '0';
  }
}

function clearPlayerUi(isClear) {
  if (isClear) {
    getEl('#name-0').textContent = 'Player 1';
    getEl('#name-1').textContent = 'Player 2';
  }
}

function clearWinner(isClear) {
  if (isClear) {
    getEl('.player-0-panel').classList.remove('winner');
    getEl('.player-1-panel').classList.remove('winner');
  }
}

function showActivePlayer(isActive) {
  if (isActive) {
    getEl('.player-0-panel').classList.remove('active');
    getEl('.player-1-panel').classList.remove('active');
    getEl('.player-0-panel').classList.add('active');
  }
}

function showDices(dice1, dice2) {
  if (dice1 < 1 || dice1 > 6 || dice2 < 1 || dice2 > 6) {
    throw new Error('dice1 and dice2 arguments have to be between 1 and 6');
  }
  setDicesVisibility(true);

  getEl('#dice-1').src = 'dice-' + dice1 + '.png';
  getEl('#dice-2').src = 'dice-' + dice2 + '.png';
}

function rollDice() {
  getEl('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
      // 1. Random number
      let dice1 = Math.floor(Math.random() * 6) + 1;
      let dice2 = Math.floor(Math.random() * 6) + 1;

      //2. Display the result
      showDices(dice1, dice2);

      //3. Update the round score IF the rolled number was NOT a 1
      if (dice1 !== 1 && dice2 !== 1) {
        //Add score
        roundScore += dice1 + dice2;
        getEl('#current-' + activePlayer).textContent = roundScore;
      } else {
        //Next player
        nextPlayer();
      }
    }
  });
}
rollDice();

function holdDice() {
  getEl('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
      // Add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;

      // Update the UI
      getEl('#score-' + activePlayer).textContent = scores[activePlayer];

      let input = getEl('.final-score').value;
      let winningScore;

      // Undefined, 0, null or "" are COERCED to false
      // Anything else is COERCED to true
      if (input) {
        winningScore = input;
      } else {
        winningScore = 100;
      }

      // Check if player won the game
      if (scores[activePlayer] >= winningScore) {
        getEl('#name-' + activePlayer).textContent = 'Winner!';
        setDicesVisibility(false);
        getEl('.player-' + activePlayer + '-panel').classList.add('winner');
        getEl('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      } else {
        //Next player
        nextPlayer();
      }
    }
  });
}
holdDice();

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  clearCurrent(true);
  getEl('.player-0-panel').classList.toggle('active');
  getEl('.player-1-panel').classList.toggle('active');
  setDicesVisibility(false);
}

// init function, initialize a game!
getEl('.btn-new').addEventListener('click', initGame);

function initGame(obj) {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  setDicesVisibility(false);
  clearScoreUi(true);
  clearCurrent(true);
  clearPlayerUi(true);
  clearWinner(true);
  showActivePlayer(true);
}
