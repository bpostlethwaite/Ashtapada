var util = require('./util')
var EventEmitter = require('events').EventEmitter
var hat = require('hat');


function Thing (status, game) {

  var Thing = new EventEmitter();

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

  util.extend(status, BaseStatus)

  if (!('_id' in status))
    status._id = hat()

  return Thing

}


module.exports = Thing