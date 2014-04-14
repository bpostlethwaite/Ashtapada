var util = require('./util')
var Ashtapada = require('./ashtapada')
var Thing = require('./thing')
var Person = require('./person')


module.exports = {
 _units: []
, getUnit: function (id) {
    return this._units.filter( function (unit) {
             return (unit._id === id)
           })[0]
  }
, newUnit: function(unit, userAttributes, status) {
    var that = this;
    if (!(unit in this.Units)) {
      throw Error('no unit ' + unit + ' in game')
    }
    if (!userAttributes) userAttributes = {}
    if (!status) status = {}
    return newUnitRecurse(unit, userAttributes, status, [])


    function newUnitRecurse(unit, userAttributes, status, Holder) {

      var UnitInit = that.Units[unit]
      if (!Holder.length && UnitInit.requires) {
        // recurse to the bottom of the stack.
        newUnitRecurse(UnitInit.requires, userAttributes, status, Holder)
        // after recursing to bottom
        // Holder will hold the primordial object
        // now build out Holder
        Holder[0] = UnitInit.init(Holder[0], status)
      }
      else {
        // Base Thing, does not need an instantiated object
        Holder[0] = UnitInit.init(that, status, userAttributes)
        that._units.push(status)
      }
      return Holder[0]
    }
  }
, Units: {
  Thing: {init: Thing, requires: false}
, Person: {init: Person, requires: 'Thing'}
, Board: {init: Ashtapada, requires: 'Thing'}
}
}