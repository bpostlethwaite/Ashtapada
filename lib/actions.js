//var ashtapada = require('ashtapada')

module.exports =  {
  move: function (direction) {
    var pos = this._location
    var newpos = takeStep(direction, {x:pos.x, y:pos.y})
    if (inBounds(newpos, this._board.getBounds())) {
      this._location = newpos
      return true
    }
    else {
      console.log(this._self.name + ':', 'direction ' + direction + ' is an invalid move')
      return false
    }
  }
, handCombat: function () {}
}

function inBounds(pos, bounds) {
  var inbounds = pos.x >= 0
              && pos.y >= 0
              && pos.x <= bounds.x
              && pos.y <= bounds.y
  return inbounds
}

function takeStep(direction, location) {
    switch (direction.toUpperCase()) {
      case 'N':
      location.y++
      break;
      case 'E':
      location.x++
      break;
      case 'S':
      location.y--
      break;
      case 'W':
      location.x--
      break;
      default:
      console.log('bad direction')
    }
  return location
}
