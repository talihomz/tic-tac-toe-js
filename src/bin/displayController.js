const cells = document.querySelectorAll('div[data-box]');
const playerNames = document.querySelectorAll('.edit[data-player]');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

let gameInstance;

module.exports = {

  initialise: function (game) {

    // get an instance of the game
    gameInstance = game;

    // handle start button click
    startButton.addEventListener('click', () => {

      // change Ui
      startButton.classList.add('hidden');
      resetButton.classList.remove('hidden');

      // disable edit on player name
      playerNames.forEach( nameElement => {
        nameElement.classList.remove('edit');
      });

      // call start
      this.onStart();
    });

    // handle start button click
    resetButton.addEventListener('click', () => {

      let confirmation = confirm("Are you sure you want to reset the game?");
      if (confirmation === false)
        return;

      this.reset();
    });

    // handle cell click
    cells.forEach((cell) => {

      cell.addEventListener('click', () => {

        // only during gameplay
        if(gameInstance.gameMode === 0)
          this.onSlotClicked(cell.getAttribute("data-box"));
      });
    });

    // handle edit player name click
    playerNames.forEach(playerName => {

      playerName.addEventListener('click', () => {

        if (gameInstance.gameMode === 0)
          return;

        this.onChangePlayerName(playerName.getAttribute('data-player'));
      });
    });

    // start with a reset state
    this.reset();
  },
  onStart: function () {
    gameInstance.start();
  },
  onSlotClicked: function (cellNumber) {
    gameInstance.playSlot(cellNumber);
  },
  onChangePlayerName: function (playerId) {
    let newName = prompt('Enter your new name.', `Player ${playerId}`);
    if (newName !== null)
      gameInstance.setPlayerName(playerId, newName);
  },
  render: function (board) {
    // check board
    if (board.length !== 9)
      throw "Invalid length of board detected";

    // check correct values for cells
    board.forEach((cell, index) => {
      if (cell < 0 || cell > 2)
        throw (`Cell ${index + 1} has an invalid value`);

      // render cell
      let mark;
      switch (cell) {
        case 1:
          mark = 'X'
          break;
        case 2:
          mark = 'O';
          break;
        default:
          mark = '';
      }
      cells[index].innerHTML = mark;

      // handle blank cells
      if (cell === 0)
        cells[index].classList.remove('moved');
      else
        cells[index].classList.add('moved');


    });
  },
  renderWin: function(combination, player) {

    // display the winning combination
    combination.forEach( cell => {
      document.querySelector(`[data-box="${cell + 1}"]`).classList.add('win');
    });

    // show user a winning message
    setTimeout(() => {
      alert(`${player} won the game!`);
      gameInstance.reset();
    }, 250);

  },
  reset: function() {
    
    // reset names
    [1,2].forEach( index => {
      playerNames[index - 1].classList.remove('active');
      playerNames[index - 1].classList.add('edit');
    });

    // reset cells
    cells.forEach( cell => {
      cell.classList.remove('win');
    });

    // reset buttons
    startButton.classList.remove('hidden');
    resetButton.classList.add('hidden');

  },
  showPlayer: function (player) {
    let playerName = document.querySelector(`h2[data-player="${player.id}"]`);
    playerName.innerHTML = player.name;
  },
  switchActivePlayer: function(activePlayer) {
    playerNames[activePlayer - 1].classList.add('active');
    playerNames[2 - activePlayer].classList.remove('active');

    // change board's hover
    cells.forEach( cell => {
      cell.classList.add( activePlayer === 1 ? 'x' : 'o' );
      cell.classList.remove( activePlayer === 1 ? 'o' : 'x' );
    });
  }
};