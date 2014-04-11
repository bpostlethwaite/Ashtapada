module.exports = {
  moveUnit: function (unitStatus, newPos, cb) {
    var success = inBounds(newPos, this.getBounds())
    process.nextTick( function () {cb(success)})
  }
, getBounds: function () {
    return this.boardSize

  }
}


function inBounds(pos, bounds) {
  var inbounds = pos.x >= 0
              && pos.y >= 0
              && pos.x <= bounds.x
              && pos.y <= bounds.y
  return inbounds
}
