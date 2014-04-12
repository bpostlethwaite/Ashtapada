var Actions = {}

Actions.move = activityQueue(Move)
Actions.attack = activityQueue(attack)

module.exports = Actions

// note this refers to the underlying status
// this._self to the user usable object
function Move (direction) {
  if (!direction) return
  var status = this
  var self = status._self
  var pos = status._location
  var game = status._game
  var boardId = status.getBoard()
  var board = game.getBoard(boardId)
  var newpos = takeStep(direction, {x:pos.x, y:pos.y})
  board.moveUnit(status, newpos, function (success) {
    if (success)
      status._location = newpos
    self.emit('move', success)
  })
}

function attack (target) {
  var game = this._game
  var boardId = this.getBoard()
  var unit = this._self
  var board = game.getBoard(boardId)

  if ('getLocation' in target)
    target = target.getLocation()

  var targetStatus = board.getUnitFromLocation(target)[0]

  var damage = 1
  targetStatus.damage(1)
  unit.emit('hit', damage)
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
      console.log('bad direction, must be n, e, s, w')
    }
  return location
}


function activityQueue (actionfunc, costmodifier) {
  if (!costmodifier) costmodifier = 1
  return function() {
    var status = this;
    var queue = status._actionQueue
    var args = [].slice.apply(arguments);
    var cost = 5000 / status._fitness * costmodifier

    queue.push(function () {
      setTimeout( function () {
        actionfunc.apply(status, args)
        queue.shift() // take myself off the list
        if (queue.length) {
          queue[0]() // fire next item on list
        }
      }, cost)
    })

    if (queue.length === 1) {
      queue[0]()
    }
  }
}
