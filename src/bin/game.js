const display = require('./displayController');
const gameBoard = require('../lib/board');
const Player = require('../lib/player');
const players = {};

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
  },
  start: function() {
    this.gameMode = 0;
  },
  setPlayerName: function(playerId, playerName){
    players[playerId].name = playerName;
    display.showPlayer(players[playerId]);
  }
};