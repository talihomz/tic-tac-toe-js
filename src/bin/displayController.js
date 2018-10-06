module.exports = {

  initialise: function() {

    // handle start button click
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {

      this.onStart();
    });
    
    // handle start button click
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {

      this.onReset();
    });

    // handle cell click
    const cells = document.querySelectorAll('div[data-box]');
    cells.forEach( (cell) => {
      
      cell.addEventListener('click', () => {
        this.onMove(cell.getAttribute("data-box"));
      });      
    })
  },
  onStart: function() {

    console.log('Start button clicked');
  },
  onReset: function() {

    console.log('Reset button clicked')
  },
  onMove: function(cellNumber) {

    console.log(`Click on cell ${cellNumber}`);
  }
};