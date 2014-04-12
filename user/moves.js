var Path = require('pathfinding')

exports.moveTo = moveTo
exports.moveToAttack = moveToAttack

function moveTo (to) {
  var that = this
  var directions = getDirections(this.getLocation(), to)
  this.move(directions.shift())
  this.on('move', function (status) {
    if (status) {
      that.move(directions.shift())
      console.log(that.name + " moved to", that.getLocation())
    } else
      console.log(that.name + " failed to move", that.getLocation())
  })
}

/**
 * @adds 'inRange'
 */
function moveToAttack (target, range) {
  var that = this
  var directions = getDirections(this.getLocation(), target.getLocation())
  if (range === undefined) range = 1

  this.move(directions.shift())
  this.on('move', function (status) {
    if (that.withinRange(target, range)) {
      return that.emit('inRange')
    }
    if (status) {
      that.move(directions.shift())
      return console.log(that.name + " moved to", that.getLocation())
    } else {
      return console.log(that.name + " failed to move", that.getLocation())
    }
  })
}

function getDirections(from, to) {
  var grid = new Path.Grid(to.x+5, to.y+5);
  var finder = new Path.AStarFinder();
  var path = finder.findPath(from.x, from.y, to.x, to.y, grid);
  return pathToDirection(path)
}

function pathToDirection (path) {
  var current = path.shift()
  return path.map( function (p) {
           var x = p[0] - current[0]
           var y = p[1] - current[1]
           current = p
           if (y === 0)
             return x > 0 ? 'e' : 'w'
           else
             return y > 0 ? 'n' : 's'
         })
}