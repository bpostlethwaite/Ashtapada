var util = require('./util')
var EventEmitter = require('events').EventEmitter


function Thing (status) {

    var Thing = new EventEmitter();

    delete Thing['domain']

    // base status
    var BaseStatus = {
        _fitness: Infinity
      , _health: Infinity
      , _location: {x:null, y:null}
      , _board: null
      , _actionQueue: []
    }

    util.extend(status, BaseStatus)

    return Thing

}


module.exports = Thing