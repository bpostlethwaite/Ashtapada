var EventEmitter = require('events').EventEmitter
var actionTemplate = require('./actions')
var statusTemplate = require('./status')
var util = require('./util')

module.exports = function (personalAttributes, status) {

    if (!personalAttributes) personalAttributes = {}

    if (!status) status = {
        _fitness: 10
      , _health: 10
      , _location: {x:0, y:0}
      , _board: null
    }

    var Person = new EventEmitter()
    status._self = Person

    // add generic methods to the status template
    // these methods can be shared by everyone, only the state differs
    util.extend(status, statusTemplate)
    // forward these methods onto a Person, but methods reach into status
    util.forward(Person, ['getHealth'
                         , 'getLocation'
                         , 'joinBoard'
                         , 'leaveBoard'], status)
    // do the same for Actions
    util.extend(status, actionTemplate)
    util.forward(Person, ['move', 'handCombat'], status)

    return util.extend(Person, personalAttributes)
}
