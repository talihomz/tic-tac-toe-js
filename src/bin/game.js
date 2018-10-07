const display = require('./displayController');
const gameBoard = require('../lib/board');
const Player = require('../lib/player');
const players = {};
let currentPlayer = 1;

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
  reset: function() {
    
    // reset board
    gameBoard.reset();
    display.render(gameBoard.data);

    this.gameMode = 1;
    currentPlayer = 1;    
    display.resetPlayerNames();
  },
  playSlot: function(slot) {
    gameBoard.markSlot(slot, currentPlayer);
    display.render(gameBoard.data);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    display.switchActivePlayer(currentPlayer);    
  },
  start: function() {
    this.gameMode = 0;
    display.switchActivePlayer(currentPlayer);
  },
  setPlayerName: function(playerId, playerName){
    players[playerId].name = playerName;
    display.showPlayer(players[playerId]);
  }
};