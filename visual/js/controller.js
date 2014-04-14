var EventEmitter = require('events').EventEmitter

module.exports = function (View) {

  var self = new EventEmitter()

  self.init = function (gridSize) {
    console.log('initializing ...', gridSize)
    this.gridSize = gridSize
    var numCols = this.gridSize[0],
        numRows = this.gridSize[1];

    View.init({
      numCols: numCols,
      numRows: numRows
    });
    View.generateGrid( function () {
      self.emit('ready')
    });

    this.$buttons = $('.control_button');

  }

  self.addUnit = function (id, color, gridX, gridY) {
    View.newUnit(id, color, gridX, gridY);
  }

  self.moveUnit = function (unitId, gridX, gridY, cost) {
    console.log("moveUnit", arguments)
    View.moveUnit(unitId, gridX, gridY, cost)
  }

  var remotes = ['init', 'addUnit', 'moveUnit']

  remotes.forEach( function (prop) {
    self.on(prop, function () {
      var args = [].slice.call(arguments)
      console.log('controller', prop, args)
      self[prop].apply(self, args)
    })
  })

  return self
}
