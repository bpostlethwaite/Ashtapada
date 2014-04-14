var boardTemplate = require('./board')
var util = require('./util')
var hat = require('hat')

module.exports = function (receiver, status, boardAttributes) {

  if (!status) status = {}
  var board = {
    _units: []
  , _boardSize: {x: 10, y:10}
  }

  util.extend(board, boardAttributes)

  util.extend(status, board)

  util.extend(status, boardTemplate)

  return receiver

}
