var util = require('./util')
module.exports = {
  moveUnit: function (unit, newPos, cb) {
    var self = this._self
    var success = this.isClearCell(newPos)
    process.nextTick( function () {
      cb(success)
      if (success) {
        self.emit('moveUnit', unit._id, newPos.x, newPos.y)
      }
    })
  }
, isClearCell: function (pos) {
    var withinBounds = inBounds(pos, this._boardSize)
    var noUnits = this._units.filter(byLocation(pos)).length === 0
    return withinBounds && noUnits
  }
, addUnit: function (unit, location) {
    var ncells = this._boardSize.x * this._boardSize.y
    var self = this._self
    if (!location) location = {x:0, y:0}
    var count = 0
    var xincr = count
    while (!this.isClearCell(location)) {
      xincr ? ++location.x : ++location.y;
      xincr = count % 2
      if (count >= ncells) {
        location = null
        break;
      }
    }
    if (location) {
      unit._location = location
      this._units.push(unit)
      process.nextTick( function () {
        self.emit('addUnit', unit._id, '#0d0', location.x, location.y); } )
    }


    return this._self
  }
, removeUnit: function (unit) {
    var idx = this.units.indexOf(unit)
    var success = false
    if (idx > -1) {
      this._units.splice(idx, 1)
      unit._location = {x:null, y:null}
      success = true
    }
    process.onNextTick( function () {
      unit.emit('left-board', success)
    })
  }
, visibleUnits: function (unit) {
    return this._units
           .filter(function (u) {return u !== unit})
           .map(externalUnit)
  }
, getUnitFromLocation: function (location) {
    return this._units.filter(byLocation(location))
  }
}

function inBounds(pos, bounds) {
  var inbounds = pos.x >= 0
              && pos.y >= 0
              && pos.x <= bounds.x
              && pos.y <= bounds.y
  return inbounds
}

function byLocation(location) {
  return function (unit) {
    return unit._location.x === location.x
        && unit._location.y === location.y
  }
}
// make a new object that forwards to the unit
// not the underlying status
function externalUnit(unit) {
  var exUnit = {}
  util.forward(exUnit, ['getType', 'getLocation'], unit)
  return exUnit
}