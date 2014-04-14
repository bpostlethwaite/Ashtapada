var Thing = require('./thing')
var actionTemplate = require('./actions')
var statusTemplate = require('./status')
var util = require('./util')

module.exports = function (receiver, status) {

  var PersonStatus = {
    _fitness: 10
  , _health: 10
  , _store: []
  , _type: 'Person'
  }

  util.extend(status, PersonStatus)

  // add generic methods to the status template
  // these methods can be shared by everyone, only the state differs
  util.extend(status, statusTemplate)
  // forward these methods onto a Person, but methods reach into status
  util.forward(receiver, [
    'getHealth'
  , 'getLocation'
  , 'joinBoard'
  , 'leaveBoard'
  , 'visibleUnits'
  , 'getType'
  ], status)

    // do the same for Actions
  util.extend(status, actionTemplate)
  util.forward(receiver, ['move', 'attack'], status)

  return receiver
}
