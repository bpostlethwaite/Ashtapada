var util = require('../lib/util')
var UserMoves = require('./moves')
var UserDistance = require('./distance')
var UserAttack = require('./attack')

/*
 * Eventually make this something you can
 * turn on and off
 */
module.exports = function (unit) {

    util.extendOnly(unit, UserMoves)
    util.extendOnly(unit, UserDistance)
    util.extendOnly(unit, UserAttack)

    unit.attackRole = function () {

        var self = this

        var target = self.visibleUnits()[0]

        self.moveToAttack(target, 1)

        self.on('inRange', function () {
            console.log('unit in Range')
            self.attackWhileInRange(target, 1)
        })

        self.on('hit', function (damage) {
            console.log('unit landed blow for', damage, 'damage')
        })

        self.on('target-destroyed', function (target) {
            //      unit.store(target.getLoot())
        })
    }
}
