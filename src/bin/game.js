const display = require('./displayController');
const gameBoard = require('../lib/board');
const Player = require('../lib/player');
const players = {};
let currentPlayer = 1;
let winningCombinations = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// check for a winning combination
// only happens when all are equal to the same value, and none are blank
const checkWin = _ => winningCombinations.findIndex(combi => gameBoard.data[combi[0]] === gameBoard.data[combi[1]] &&
                                                         gameBoard.data[combi[1]] === gameBoard.data[combi[2]] &&
                                                         gameBoard.data[combi[0]] !== 0);

module.exports = {
  gameMode: 0,
  run: function () {

    // start display
    display.initialise(this);

    // initialise players
    players[1] = Player(1, 'Player 1');
    players[2] = Player(2, 'Player 2');

    // render players
    display.showPlayer(players[1]);
    display.showPlayer(players[2]);

    // start with a reset
    this.reset();
  },
  reset: function () {

    // reset board
    gameBoard.reset();
    display.render(gameBoard.data);

    this.gameMode = 1;
    currentPlayer = 1;
    display.reset();
  },
  playSlot: function (slot) {
    gameBoard.markSlot(slot, currentPlayer);
    display.render(gameBoard.data);

    // check for a win
    let combination = checkWin();

    if (combination > -1) {
      display.renderWin(winningCombinations[combination], players[currentPlayer].name);
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      display.switchActivePlayer(currentPlayer);
    }    
  },
  start: function () {
    this.gameMode = 0;
    display.switchActivePlayer(currentPlayer);
  },
  setPlayerName: function (playerId, playerName) {
    players[playerId].name = playerName;
    display.showPlayer(players[playerId]);
  }
};