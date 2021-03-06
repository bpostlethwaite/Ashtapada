var util = require('./util')
var EventEmitter = require('events').EventEmitter
var hat = require('hat');

function Thing (game, status, attributes) {
  var Thing = new EventEmitter()

  delete Thing['domain']

  // base status
  var BaseStatus = {
    _game: game
  , _fitness: Infinity
  , _health: Infinity
  , _location: {x:null, y:null}
  , _board: null
  , _actionQueue: []
  }

  util.extend(status, BaseStatus, Template)
  util.forward(Thing, status)
  util.extendOnly(Thing, attributes)

  if (!('_id' in status))
    status._id = hat()

  status._self = Thing

  return Thing

}

var Template = {
    getId: function () {
        return this._id
    }
}

module.exports = Thing