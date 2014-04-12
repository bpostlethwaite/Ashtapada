var Game = require('./lib/game')
var Path = require('pathfinding')

var board_id = Game.newBoard()

var saul = Game.newUnit('Person', {name: 'saul'})
var sally = Game.newUnit('Person', {name: 'sally'})

saul.joinBoard(board_id, {x:4, y:5})
sally.joinBoard(board_id)



sally.moveTo = moveTo
sally.withinRange = withinRange

var target = sally.visibleUnits()[0]

sally.moveTo(target.getLocation())

sally.on('move', function () {
  if (sally.withinRange(target, 1))
    sally.attack(target)
})

saul.on('move', function (status) {
    console.log("saul moved to", saul.getLocation())
})

function moveTo (to) {
  var from = this.getLocation()
  var that = this
  var grid = new Path.Grid(to.x+5, to.y+5);
  var finder = new Path.AStarFinder();
  var path = finder.findPath(from.x, from.y, to.x, to.y, grid);
  var directions = pathToDirection(path)
  this.move(directions.shift())
  this.on('move', function (status) {
    if (status) {
      that.move(directions.shift())
      console.log(that.name + " moved to", that.getLocation())
    } else
      console.log(that.name + " failed to move", that.getLocation())
  })

}

function getDistance (pos, tpos) {
  var xd = pos.x - tpos.x
  var yd = pos.y - tpos.y
  return Math.sqrt(xd*xd + yd*yd)
}

function withinRange (target, range) {
  return getDistance(this.getLocation(), target.getLocation()) <= range
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