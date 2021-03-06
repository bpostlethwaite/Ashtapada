var boardTemplate = require('./board')
var util = require('./util')
var hat = require('hat')

module.exports = function (receiver, status, boardAttributes) {

  if (!boardAttributes) boardAttributes = {}

  var board = {
    _units: []
  , _boardSize: {x: 10, y:10}
  }

  util.extendOnly(status, board)
  util.extend(status, boardTemplate)

  return receiver

}
