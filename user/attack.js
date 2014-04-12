exports.attackWhileInRange = attackWhileInRange

/**
 * @add 'target-destroyed'
 */
function attackWhileInRange (target, range) {
  var that = this
  that.attack(target)
  this.on('hit', function () {
    if (that.withinRange(target.getLocation(), range)) {
      if (isAlive(target)) {
        that.attack(target)
      } else {that.emit('target-destroyed')}
    }
  })
  this.on('miss', function () {
    if (that.withinRange(target.getLocation(), range)) {
      if (isAlive(target)) {
        that.attack(target)
      } else {that.emit('target-destroyed')}
    }
  })
}

function isAlive(target) {
  if ('getType' in target)
    return target.getType().indexOf('terminated') === -1
  return false
}