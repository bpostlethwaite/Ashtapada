var boardTemplate = require('./board')
var util = require('./util')
var hat = require('hat')

module.exports = function (status) {

  if (!status) status = {}
    var board = {
        _id: hat()
      , _units: []
      , _boardSize: {x: 10, y:10}
  }

  util.extend(board, status)

  util.extend(board, boardTemplate)

  util.extend(board, boardTemplate)

  return board

}
