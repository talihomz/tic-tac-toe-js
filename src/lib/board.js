module.exports = {
  data: [],
  markSlot: function(slot, value) {
    if(this.data[slot - 1] !== 0)
      throw 'Slot already marked!';

    this.data[slot - 1] = value;
  },
  reset: function() {
    this.data = [0,0,0,0,0,0,0,0,0]
  }
};