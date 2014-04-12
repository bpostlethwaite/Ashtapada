exports.getDistance = getDistance
exports.withinRange = withinRange


function getDistance (pos, tpos) {
  var xd = pos.x - tpos.x
  var yd = pos.y - tpos.y
  return Math.sqrt(xd*xd + yd*yd)
}

function withinRange (target, range) {
  if (!target) return false
  var from = this.getLocation()
  var to = 'getLocation' in target ? target.getLocation() : target
  return getDistance(from, to) <= range
}
