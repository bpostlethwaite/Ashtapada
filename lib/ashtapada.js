var boardTemplate = require('./board')
var util = require('./util')

module.exports = function () {

  var specs = {
    boardSize: {x: 10, y:10}
  }

  var ashtapada = {}


  util.extend(specs, boardTemplate)

    util.forward(ashtapada, ['getBounds', 'moveUnit'], specs)

  return ashtapada

}
