var util = require('./util')
var Ashtapada = require('./ashtapada')
var Thing = require('./thing')
var Person = require('./person')


module.exports = {
  _boards: []
, _units: []

, newBoard: function () {
    var board = Ashtapada()
    this._boards.push(board)
    return board
  }

, newUnit: function(unit, userAttributes, status, Holder) {

    if (!(unit in this.Units)) {
      throw Error('no unit ' + unit + ' in game')
    }

    if (!userAttributes) userAttributes = {}
    if (!status) status = {}
    if (!Holder) Holder = []

    var UnitInit = this.Units[unit]
    if (!Holder.length && UnitInit.requires) {
      // recurse to the bottom of the stack.
      this.newUnit(UnitInit.requires, userAttributes, status, Holder)
      // after recursing to bottom
      // Holder will hold the primordial object
      // now build out Holder
      Holder[0] = UnitInit.init(Holder[0], status, userAttributes)
    }
    else {
      // Base Thing, does not need an instantiated object
      Holder[0] = UnitInit.init(status)
      this._units.push(status)
    }
    // link back from hidden to status to connected person
    status._self = Holder[0]
    return Holder[0]
  }
, Units: {
  Thing: {init: Thing, requires: false}
, Person: {init: Person, requires: 'Thing'}
  }
}